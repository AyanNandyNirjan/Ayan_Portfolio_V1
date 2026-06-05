const MONGODB_URL = process.env.MONGODB_URL;
const DB_NAME = "ayan_portfolio_db";

if (!MONGODB_URL) {
  throw new Error("Please define MONGODB_URL in your .env file");
}

type MongooseInstance = typeof import("mongoose")["default"];

type CachedMongoose = {
  conn: MongooseInstance | null;
  promise: Promise<MongooseInstance> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: CachedMongoose | undefined;
}

const cached: CachedMongoose = globalThis.mongooseCache || {
  conn: null,
  promise: null,
};

if (!globalThis.mongooseCache) {
  globalThis.mongooseCache = cached;
}

let mongooseRuntime: MongooseInstance | null = null;

export async function getMongoose() {
  if (mongooseRuntime) {
    return mongooseRuntime;
  }

  const runtimeImport = new Function(
    "packageName",
    "return import(packageName)"
  ) as (packageName: string) => Promise<typeof import("mongoose")>;

  const mongooseModule = await runtimeImport("mongoose");

  mongooseRuntime = mongooseModule.default;
  return mongooseRuntime;
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  const mongoose = await getMongoose();

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL as string, {
      dbName: DB_NAME,
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}