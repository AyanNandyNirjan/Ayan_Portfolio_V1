export type AuthUser = {
  id: string;
  email: string;
  role: "admin" | "user";
};

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in your .env file");
}

function jsonError(message: string, status: number): never {
  throw Response.json(
    {
      success: false,
      message,
    },
    { status }
  );
}

async function getJwt() {
  const runtimeImport = new Function(
    "packageName",
    "return import(packageName)"
  ) as (packageName: string) => Promise<typeof import("jsonwebtoken")>;

  const jwtModule = await runtimeImport("jsonwebtoken");
  return jwtModule.default;
}

export async function verifyJwtFromRequest(
  request: Request
): Promise<AuthUser> {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    jsonError("Unauthorized. No token provided.", 401);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    jsonError("Unauthorized. No token provided.", 401);
  }

  try {
    const jwt = await getJwt();

    const decoded = jwt.verify(token, JWT_SECRET as string) as AuthUser;

    if (!decoded?.id || !decoded?.email || !decoded?.role) {
      jsonError("Unauthorized. Invalid token.", 401);
    }

    return decoded;
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    jsonError("Unauthorized. Invalid token.", 401);
  }
}

export async function requireAdmin(request: Request): Promise<AuthUser> {
  const user = await verifyJwtFromRequest(request);

  if (user.role !== "admin") {
    jsonError("Forbidden. Admin access only.", 403);
  }

  return user;
}