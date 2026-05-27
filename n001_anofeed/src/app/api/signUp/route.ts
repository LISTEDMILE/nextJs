import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import { SendVerificationEmail } from "@/helper/sendVerificatioinEmail";

// code (0010)------------------
export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        { success: false, message: "Username already exists" },
        { status: 400 },
      );
    }

    const existingUserByEmail = await UserModel.findOne({ username });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVarified) {
        return Response.json(
          {
            success: false,
            message: "User already exists.",
          },
          { status: 400 },
        );
        }
        
      else {
          const hashedPassword = await bcrypt.hash(password, 10);
          existingUserByEmail.password = hashedPassword;
          existingUserByEmail.verifyCode = verifyCode;
          existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 360000);
          await existingUserByEmail.save();
        }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      // 1 hr
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVarified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }

    // send verification..
    const emailResponse = await SendVerificationEmail(
      email,
      username,
      verifyCode,
    );

    // resend ke response me aate h ye success and .message....
    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 500 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "User Registered Successfully. Please Verify  your Email",
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Error Registering User", err);
    return Response.json(
      {
        success: false,
        message: "Error Registering User",
      },
      {
        status: 500,
      },
    );
  }
}
