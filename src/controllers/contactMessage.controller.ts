import mongoose from "mongoose";
import { connectDB } from "../lib/db";
import ContactMessage from "../models/contactMessage.model";

function jsonResponse(data: unknown, status = 200) {
  return Response.json(data, { status });
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function createContactMessage(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const name = cleanString(body.name);
    const email = cleanString(body.email).toLowerCase();
    const subject = cleanString(body.subject);
    const message = cleanString(body.message);

    if (!name || !email || !subject || !message) {
      return jsonResponse(
        {
          success: false,
          message: "All fields are required.",
        },
        400
      );
    }

    if (name.length < 2) {
      return jsonResponse(
        {
          success: false,
          message: "Name must be at least 2 characters.",
        },
        400
      );
    }

    if (!isValidEmail(email)) {
      return jsonResponse(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        400
      );
    }

    if (subject.length < 2) {
      return jsonResponse(
        {
          success: false,
          message: "Subject must be at least 2 characters.",
        },
        400
      );
    }

    if (message.length < 5) {
      return jsonResponse(
        {
          success: false,
          message: "Message must be at least 5 characters.",
        },
        400
      );
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
      status: "unread",
    });

    return jsonResponse(
      {
        success: true,
        message: "Message sent successfully.",
        data: newMessage,
      },
      201
    );
  } catch (error) {
    console.error("Create contact message error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Message could not be sent. Please try again.",
      },
      500
    );
  }
}

export async function getAllContactMessages() {
  try {
    await connectDB();

    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .lean();

    return jsonResponse({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Get contact messages error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Messages could not be loaded. Please try again.",
      },
      500
    );
  }
}

export async function getSingleContactMessage(messageId: string) {
  try {
    await connectDB();

    if (!isValidObjectId(messageId)) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid message ID.",
        },
        400
      );
    }

    const message = await ContactMessage.findById(messageId).lean();

    if (!message) {
      return jsonResponse(
        {
          success: false,
          message: "Message not found.",
        },
        404
      );
    }

    return jsonResponse({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error("Get single contact message error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Message could not be loaded. Please try again.",
      },
      500
    );
  }
}

export async function updateContactMessageStatus(
  messageId: string,
  request: Request
) {
  try {
    await connectDB();

    if (!isValidObjectId(messageId)) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid message ID.",
        },
        400
      );
    }

    const body = await request.json();
    const status = cleanString(body.status);

    const allowedStatuses = ["unread", "read", "archived"];

    if (!allowedStatuses.includes(status)) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid status value.",
        },
        400
      );
    }

    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      messageId,
      { status },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!updatedMessage) {
      return jsonResponse(
        {
          success: false,
          message: "Message not found.",
        },
        404
      );
    }

    return jsonResponse({
      success: true,
      message: "Message status updated successfully.",
      data: updatedMessage,
    });
  } catch (error) {
    console.error("Update contact message error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Message status could not be updated. Please try again.",
      },
      500
    );
  }
}

export async function deleteContactMessage(messageId: string) {
  try {
    await connectDB();

    if (!isValidObjectId(messageId)) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid message ID.",
        },
        400
      );
    }

    const deletedMessage = await ContactMessage.findByIdAndDelete(
      messageId
    ).lean();

    if (!deletedMessage) {
      return jsonResponse(
        {
          success: false,
          message: "Message not found.",
        },
        404
      );
    }

    return jsonResponse({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.error("Delete contact message error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Message could not be deleted. Please try again.",
      },
      500
    );
  }
}