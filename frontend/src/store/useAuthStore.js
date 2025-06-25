import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

import { io } from "socket.io-client";

const SERVER_URI = import.meta.env.MODE === "development" ? "http://localhost:5002/api" : "/api";

export const useAuthStore = create((set, get) => ({
	authUser: null,
	isCheckingAuth: true,
	isSigningUp: false,
	isUpdatingProfile: false,
	onlineUsers: [],
	socket: null,

	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("/auth/check-auth");
			set({ authUser: res.data.user });

			get().connectSocket();
		} catch (error) {
			console.log(`Error checking auth: ${error}`);
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	signUp: async (data) => {
		set({ isSigningUp: true });
		try {
			const res = await axiosInstance.post("/auth/signup", data);
			set({ authUser: res.data.user });
			toast.success("Sign up successful");

			get().connectSocket();
		} catch (error) {
			console.log(`Error signing up: ${error}`);
			const message = error.response.data.message ? error.response.data.message : "Sign up failed";
			toast.error(message);
		} finally {
			set({ isSigningUp: false });
		}
	},

	login: async (data) => {
		try {
			const res = await axiosInstance.post("/auth/login", data);
			set({ authUser: res.data.user });
			toast.success("Login successful");

			get().connectSocket();
		} catch (error) {
			console.log(`Error logging in: ${error}`);
			const message = error.response.data.message ? error.response.data.message : "Login failed";
			toast.error(message);
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
			set({ authUser: null });
			toast.success("Logout successful");

			get().disconnectSocket();
		} catch (error) {
			const message = error.response.data.message ? error.response.data.message : "Logout failed";
			toast.error(message);
		}
	},

	updateProfile: async (data) => {
		set({ isUpdatingProfile: true });
		try {
			const res = await axiosInstance.put("/avatar/update-avatar", data);
			set({ authUser: res.data.user });
			toast.success("Profile updated successfully");
		} catch (error) {
			const message = error.response.data.message ? error.response.data.message : "Update profile failed";
			toast.error(message);
		} finally {
			set({ isUpdatingProfile: false });
		}
	},

	connectSocket: () => {
		const { authUser } = get();
		if (!authUser || get().socket?.connected) return;

		const socket = io(SERVER_URI, { query: { userId: authUser._id } });
		set({ socket });
		socket.on("onlineUsers", (data) => {
			set({ onlineUsers: data });
		});
	},
	disconnectSocket: () => {
		if (get().socket?.connected) {
			get().socket.disconnect();
		}
	},
}));
