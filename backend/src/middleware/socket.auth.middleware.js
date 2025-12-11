import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // Try multiple ways to get the token for cross-domain compatibility
    let token = null;

    // Method 1: Extract from http-only cookies
    if (socket.handshake.headers.cookie) {
      token = socket.handshake.headers.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];
    }

    // Method 2: Check authorization header
    if (!token && socket.handshake.headers.authorization) {
      token = socket.handshake.headers.authorization.replace("Bearer ", "");
    }

    // Method 3: Check auth object (for custom token passing)
    if (!token && socket.handshake.auth?.token) {
      token = socket.handshake.auth.token;
    }

    if (!token) {
      // For cross-domain requests, Socket.io auth might fail initially
      // This is not a critical error - REST API calls with proper auth will still work
      console.log("Socket connection: No auth token found (cross-domain request expected)");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    // verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    // find the user fromdb
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    // attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`);

    next();
  } catch (error) {
    console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
