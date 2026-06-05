import type { Model } from "mongoose";
import { getMongoose } from "../lib/db";

export type UserType = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export async function getUserModel() {
  const mongoose = await getMongoose();

  if (mongoose.models.User) {
    return mongoose.models.User as Model<UserType>;
  }

  const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [100, "Name cannot exceed 100 characters"],
      },

      email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        unique: true,
        maxlength: [255, "Email cannot exceed 255 characters"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
      },

      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
      },

      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

  userSchema.index({ email: 1 }, { unique: true });
  userSchema.index({ role: 1 });
  userSchema.index({ createdAt: -1 });

  return mongoose.model<UserType>("User", userSchema);
}