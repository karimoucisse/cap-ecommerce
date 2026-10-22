import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export const userSchema = new Schema<IUser>(
  {
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
