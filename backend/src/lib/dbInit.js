import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ENV } from "./env.js";
import User from "../models/User.js";
import Message from "../models/Message.js";

export const initializeDatabase = async () => {
  try {
    const { MONGO_URI } = ENV;
    if (!MONGO_URI) throw new Error("MONGO_URI is not set");

    // Connect to MongoDB
    await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB initialized successfully");

    // Clear existing data (optional - remove in production)
    // await User.deleteMany({});
    // await Message.deleteMany({});
    // console.log("Cleared existing data");

    // Seed sample users (optional)
    const existingUsers = await User.countDocuments();
    if (existingUsers === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("password123", salt);

      const sampleUsers = [
        {
          fullName: "Alice Johnson",
          email: "alice@example.com",
          password: hashedPassword,
          profilePic: "https://via.placeholder.com/150?text=Alice",
        },
        {
          fullName: "Bob Smith",
          email: "bob@example.com",
          password: hashedPassword,
          profilePic: "https://via.placeholder.com/150?text=Bob",
        },
        {
          fullName: "Charlie Brown",
          email: "charlie@example.com",
          password: hashedPassword,
          profilePic: "https://via.placeholder.com/150?text=Charlie",
        },
      ];

      await User.insertMany(sampleUsers);
      console.log("Sample users created");
    }

    // Verify collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Available collections:", collections.map((c) => c.name));

    return mongoose.connection;
  } catch (error) {
    console.error("Database initialization error:", error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Database disconnected");
  } catch (error) {
    console.error("Error disconnecting from database:", error);
  }
};
