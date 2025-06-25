import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173"],
	}
});

const onlineUsers = {}; // { userId: socket.id }

export function getSocketIdByUserId(userId) {
	return onlineUsers[userId];
}

io.on("connection", (socket) => {
	console.log(`User connected ${socket.id}`);

	// Get user id from query
	const userId = socket.handshake.query.userId;
	if (userId) onlineUsers[userId] = socket.id;

	// Broadcast online users
	io.emit("onlineUsers", Object.keys(onlineUsers));

	socket.on("disconnect", () => {
		console.log(`User disconnected ${socket.id}`);

		// Remove user from onlineUsers
		delete onlineUsers[userId];
		io.emit("onlineUsers", Object.keys(onlineUsers));
	});
});

export { io, server, app };
