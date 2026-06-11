import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
 await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        message: "Not Authenticated",
        success: false,
      },
      { status: 401 },
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);
 

  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!user ) {
      return Response.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 401 },
      );
    }

     if ( user.length == 0) {
      return Response.json(
        {
          message: "No Message Available",
          success: false,
        },
        { status: 401 },
      );
    }

    return Response.json(
      {
        messages: user[0].messages,
        success: true,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error fetching messages", err);
    return Response.json(
      {
        message: "Error fetching messages",
        success: false,
      },
      { status: 500 },
    );
  }
}
