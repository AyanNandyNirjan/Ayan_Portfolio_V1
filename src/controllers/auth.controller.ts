import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "../lib/db";
import User from "../models/user.model";
import { requireAdmin } from "../middleware/auth.middleware";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in your .env file");
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function generateToken(user: {
  _id: unknown;
  email: string;
  role: "admin" | "user";
}) {
  return jwt.sign(
    {
      id: String(user._id),
      email: user.email,
      role: user.role,
    },
    JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
}

export async function registerAdmin(request: Request) {
  try {
    await connectDB();

    const adminCount = await User.countDocuments({ role: "admin" });

    /**
     * First admin can register without token.
     * After first admin exists, only logged-in admin can create another admin.
     */
    if (adminCount > 0) {
      requireAdmin(request);
    }

    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return jsonResponse(
        {
          success: false,
          message: "Name, email and password are required.",
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

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return jsonResponse(
        {
          success: false,
          message: "Admin already exists with this email.",
        },
        409
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    const token = generateToken({
      _id: admin._id,
      email: admin.email,
      role: admin.role,
    });

    return jsonResponse(
      {
        success: true,
        message: "Admin registered successfully.",
        token,
        data: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      },
      201
    );
  } catch (error) {
    if (error instanceof Response) return error;

    console.error("Register admin error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Server error while registering admin.",
      },
      500
    );
  }
}

export async function loginAdmin(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return jsonResponse(
        {
          success: false,
          message: "Email and password are required.",
        },
        400
      );
    }

    const admin = await User.findOne({ email, role: "admin" }).select(
      "+password"
    );

    if (!admin) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid admin credentials.",
        },
        401
      );
    }

    if (!admin.isActive) {
      return jsonResponse(
        {
          success: false,
          message: "This admin account is disabled.",
        },
        403
      );
    }

    const isPasswordMatched = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatched) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid admin credentials.",
        },
        401
      );
    }

    const token = generateToken({
      _id: admin._id,
      email: admin.email,
      role: admin.role,
    });

    return jsonResponse({
      success: true,
      message: "Admin logged in successfully.",
      token,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login admin error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Server error while logging in admin.",
      },
      500
    );
  }
}

export async function getMe(request: Request) {
  try {
    await connectDB();

    const authUser = requireAdmin(request);

    const user = await User.findById(authUser.id).select("-password").lean();

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
    if (error instanceof Response) return error;

    console.error("Get me error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Server error while fetching profile.",
      },
      500
    );
  }
}