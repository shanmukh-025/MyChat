import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:3000" 
  : import.meta.env.VITE_API_URL;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      // Skip auth check if no token in production (cross-domain scenario)
      const token = localStorage.getItem("jwt-token");
      if (!token && import.meta.env.MODE !== "development") {
        set({ authUser: null, isCheckingAuth: false });
        return;
      }
      
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
      localStorage.removeItem("jwt-token"); // Clear invalid token
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      
      // Store token for cross-domain auth
      if (res.data.token) {
        localStorage.setItem("jwt-token", res.data.token);
      }

      toast.success("Account created successfully!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      
      // Store token for cross-domain auth
      if (res.data.token) {
        localStorage.setItem("jwt-token", res.data.token);
      }

      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("jwt-token"); // Clear token on logout
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response.data.message);
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    // Get token for cross-domain Socket.io auth
    const token = localStorage.getItem("jwt-token");

    const socket = io(BASE_URL, {
      withCredentials: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      auth: {
        userId: authUser._id,
        token: token, // Pass token for cross-domain auth
      },
    });

    // Handle Socket.io events
    socket.on("connect", () => {
      console.log("✅ Socket.io connected successfully");
    });
    
    socket.on("connect_error", (error) => {
      console.log("❌ Socket connection error:", error.message);
      // Don't show error toast - REST API will still work
    });

    socket.on("error", (error) => {
      console.log("❌ Socket error:", error);
      // Don't show error toast - REST API will still work
    });

    socket.connect();

    set({ socket });

    // listen for online users event
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
