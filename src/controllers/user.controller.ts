import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "../lib/db";
import User from "../models/user.model";

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

export async function createUserByAdmin(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const name = cleanString(body.name);
    const email = cleanString(body.email).toLowerCase();
    const password = cleanString(body.password);
    const role = cleanString(body.role) || "user";
    const isActive =
      body.isActive !== undefined ? Boolean(body.isActive) : true;

    if (!name || !email || !password) {
      return jsonResponse(
        {
          success: false,
          message: "Name, email and password are required.",
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

    if (password.length < 6) {
      return jsonResponse(
        {
          success: false,
          message: "Password must be at least 6 characters.",
        },
        400
      );
    }

    if (!["admin", "user"].includes(role)) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid role value.",
        },
        400
      );
    }

    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      return jsonResponse(
        {
          success: false,
          message: "A user already exists with this email.",
        },
        409
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isActive,
    });

    const safeUser = await User.findById(newUser._id)
      .select("-password")
      .lean();

    return jsonResponse(
      {
        success: true,
        message:
          role === "admin"
            ? "Admin created successfully."
            : "User created successfully.",
        data: safeUser,
      },
      201
    );
  } catch (error) {
    console.error("Create user error:", error);

    return jsonResponse(
      {
        success: false,
        message: "User could not be created. Please try again.",
      },
      500
    );
  }
}

export async function getAllUsers() {
  try {
    await connectDB();

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    return jsonResponse({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Users could not be loaded. Please try again.",
      },
      500
    );
  }
}

export async function getSingleUser(userId: string) {
  try {
    await connectDB();

    if (!isValidObjectId(userId)) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid user ID.",
        },
        400
      );
    }

    const user = await User.findById(userId).select("-password").lean();

    if (!user) {
      return jsonResponse(
        {
          success: false,
          message: "User not found.",
        },
        404
      );
    }

    return jsonResponse({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get user error:", error);

    return jsonResponse(
      {
        success: false,
        message: "User could not be loaded. Please try again.",
      },
      500
    );
  }
}

export async function updateUser(userId: string, request: Request) {
  try {
    await connectDB();

    if (!isValidObjectId(userId)) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid user ID.",
        },
        400
      );
    }

    const body = await request.json();

    const updateData: {
      name?: string;
      email?: string;
      role?: "admin" | "user";
      isActive?: boolean;
      password?: string;
    } = {};

    if (body.name !== undefined) {
      const name = cleanString(body.name);

      if (!name) {
        return jsonResponse(
          {
            success: false,
            message: "Name cannot be empty.",
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

      updateData.name = name;
    }

    if (body.email !== undefined) {
      const email = cleanString(body.email).toLowerCase();

      if (!isValidEmail(email)) {
        return jsonResponse(
          {
            success: false,
            message: "Please provide a valid email address.",
          },
          400
        );
      }

      const existingUser = await User.findOne({
        email,
        _id: { $ne: userId },
      }).lean();

      if (existingUser) {
        return jsonResponse(
          {
            success: false,
            message: "Another user already exists with this email.",
          },
          409
        );
      }

      updateData.email = email;
    }

    if (body.role !== undefined) {
      const role = cleanString(body.role);

      if (!["admin", "user"].includes(role)) {
        return jsonResponse(
          {
            success: false,
            message: "Invalid role value.",
          },
          400
        );
      }

      updateData.role = role as "admin" | "user";
    }

    if (body.isActive !== undefined) {
      updateData.isActive = Boolean(body.isActive);
    }

    if (body.password !== undefined) {
      const password = cleanString(body.password);

      if (password) {
        if (password.length < 6) {
          return jsonResponse(
            {
              success: false,
              message: "Password must be at least 6 characters.",
            },
            400
          );
        }

        updateData.password = await bcrypt.hash(password, 12);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    })
      .select("-password")
      .lean();

    if (!updatedUser) {
      return jsonResponse(
        {
          success: false,
          message: "User not found.",
        },
        404
      );
    }

    return jsonResponse({
      success: true,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);

    return jsonResponse(
      {
        success: false,
        message: "User could not be updated. Please try again.",
      },
      500
    );
  }
}

export async function deleteUser(userId: string, currentAdminId: string) {
  try {
    await connectDB();

    if (!isValidObjectId(userId)) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid user ID.",
        },
        400
      );
    }

    if (userId === currentAdminId) {
      return jsonResponse(
        {
          success: false,
          message: "You cannot delete your own admin account.",
        },
        400
      );
    }

    const deletedUser = await User.findByIdAndDelete(userId).lean();

    if (!deletedUser) {
      return jsonResponse(
        {
          success: false,
          message: "User not found.",
        },
        404
      );
    }

    return jsonResponse({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    return jsonResponse(
      {
        success: false,
        message: "User could not be deleted. Please try again.",
      },
      500
    );
  }
}