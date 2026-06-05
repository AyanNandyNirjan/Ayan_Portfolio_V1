import mongoose from "mongoose";
import { connectDB } from "../lib/db";
import ContactMessage from "../models/contactMessage.model";

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function createContactMessage(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return jsonResponse(
        {
          success: false,
          message: "All fields are required.",
        },
        400
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return jsonResponse(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        400
      );
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
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
        message: "Server error while sending message.",
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
        message: "Server error while fetching messages.",
      },
      500
    );
  }
}

export async function getSingleContactMessage(messageId: string) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
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
        message: "Server error while fetching message.",
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

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid message ID.",
        },
        400
      );
    }

    const body = await request.json();
    const { status } = body;

    if (!["unread", "read", "archived"].includes(status)) {
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
      { new: true }
    );

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
        message: "Server error while updating message.",
      },
      500
    );
  }
}

export async function deleteContactMessage(messageId: string) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid message ID.",
        },
        400
      );
    }

    const deletedMessage = await ContactMessage.findByIdAndDelete(messageId);

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
        message: "Server error while deleting message.",
      },
      500
    );
  }
}