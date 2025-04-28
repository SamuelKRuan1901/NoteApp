// lib/db.js
import mongoose from 'mongoose';

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return mongoose.connection;

  if (!process.env.MONGO_DB) {
    throw new Error('Please define the MONGO_URI environment variable');
  }

  return mongoose.connect(process.env.MONGO_DB);
}
