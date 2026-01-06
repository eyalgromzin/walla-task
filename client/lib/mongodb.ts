import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

    const opts = {
      bufferCommands: false,
      dbName: 'walla_db',
      ...clientOptions,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI!, opts as any)
      .then(async (mongooseInstance) => {
        // Verify connection by pinging the database
        if (!mongoose.connection.db) {
          throw new Error('Database connection is not established.');
        }
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

declare global {
  var mongo: { conn: any; promise: any };
}
