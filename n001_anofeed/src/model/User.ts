import mongoose, { Schema, Document } from "mongoose";

// code 0001 ----------
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVarified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

// code 0002 --------------
const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,

    // code 0003 ---------------
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter valid Email"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  verifyCode: {
    type: String,
    required: [true, "Verify Code is required"],
  },

  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code Expiry is required"],
  },

  isVarified: {
    type: Boolean,
    default: false,
    },
  
   isAcceptingMessage: {
    type: Boolean,
    default: true,
    },
   
    messages: {
    type: [MessageSchema],
  },
});


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;
