import jwt from "jsonwebtoken";

export type AuthUser = {
  id: string;
  email: string;
  role: "admin" | "user";
};

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in your .env file");
}

function jsonError(message: string, status: number) {
  throw new Response(
    JSON.stringify({
      success: false,
      message,
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export function verifyJwtFromRequest(request: Request): AuthUser {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    jsonError("Unauthorized. No token provided.", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    return jwt.verify(token, JWT_SECRET as string) as AuthUser;
  } catch {
    jsonError("Unauthorized. Invalid token.", 401);
  }
}

export function requireAdmin(request: Request): AuthUser {
  const user = verifyJwtFromRequest(request);

  if (user.role !== "admin") {
    jsonError("Forbidden. Admin access only.", 403);
  }

  return user;
}