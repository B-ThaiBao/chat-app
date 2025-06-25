import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import { connectMongo } from "./lib/database.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import avatarRoutes from "./routes/avatar.route.js"

import { app, server } from "./lib/socket.js"

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/avatar", avatarRoutes);

dotenv.config()
const PORT = process.env.PORT;
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectMongo();
})
