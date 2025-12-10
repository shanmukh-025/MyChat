import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "5mb" })); // req.body
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Server is running", timestamp: new Date().toISOString() });
});

// API documentation endpoint
app.get("/api/docs", (req, res) => {
  res.status(200).json({
    message: "MyChat API",
    version: "1.0.0",
    endpoints: {
      auth: {
        signup: "POST /api/auth/signup",
        login: "POST /api/auth/login",
        logout: "POST /api/auth/logout",
        checkAuth: "GET /api/auth/check",
        getProfile: "GET /api/auth/profile",
        updateProfile: "PUT /api/auth/update-profile",
        updateUserProfile: "PUT /api/auth/profile",
        deleteAccount: "DELETE /api/auth/account",
        getAllUsers: "GET /api/auth/users",
        searchUsers: "GET /api/auth/users/search?query=",
      },
      messages: {
        getAllContacts: "GET /api/messages/contacts",
        getChatPartners: "GET /api/messages/chats",
        getMessages: "GET /api/messages/:id",
        sendMessage: "POST /api/messages/send/:id",
        editMessage: "PUT /api/messages/:messageId",
        deleteMessage: "DELETE /api/messages/:messageId",
        searchMessages: "GET /api/messages/search?query=",
        getConversationStats: "GET /api/messages/stats",
      },
    },
  });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  console.log("API Documentation at: http://localhost:" + PORT + "/api/docs");
  connectDB();
});
