import type { Model } from "mongoose";
import { getMongoose } from "../lib/db";

export type ContactMessageType = {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "archived";
  createdAt?: Date;
  updatedAt?: Date;
};

export async function getContactMessageModel() {
  const mongoose = await getMongoose();

  if (mongoose.models.ContactMessage) {
    return mongoose.models.ContactMessage as Model<ContactMessageType>;
  }

  const contactMessageSchema = new mongoose.Schema(
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
        maxlength: [255, "Email cannot exceed 255 characters"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
      },

      subject: {
        type: String,
        required: [true, "Subject is required"],
        trim: true,
        minlength: [2, "Subject must be at least 2 characters"],
        maxlength: [200, "Subject cannot exceed 200 characters"],
      },

      message: {
        type: String,
        required: [true, "Message is required"],
        trim: true,
        minlength: [5, "Message must be at least 5 characters"],
        maxlength: [1000, "Message cannot exceed 1000 characters"],
      },

      status: {
        type: String,
        enum: ["unread", "read", "archived"],
        default: "unread",
      },
    },
    {
      timestamps: true,
    }
  );

  contactMessageSchema.index({ createdAt: -1 });
  contactMessageSchema.index({ status: 1 });

  return mongoose.model<ContactMessageType>(
    "ContactMessage",
    contactMessageSchema
  );
}