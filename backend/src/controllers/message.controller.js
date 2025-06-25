import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { getSocketIdByUserId, io } from "../lib/socket.js";

export const getUsers = async (req, res) => {
	try {
		const userId = req.user._id;
		const users = await User.find({ _id: { $ne: userId } }).select("-password");
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: otherId } = req.params;
		const userId = req.user._id;

		const messages = await Message.find({
			$or: [
				{ senderId: userId, recieverId: otherId },
				{ senderId: otherId, recieverId: userId },
			],
		});
		res.status(200).json(messages);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const sendMessage = async (req, res) => {
	try {
		const { text, image } = req.body;
		const { id: recieverId } = req.params;
		const senderId = req.user._id;

		let imageUrl;
		if (image) {
			const upimg = await cloudinary.uploader.upload(image);
			imageUrl = upimg.secure_url;
		}
		const newMessage = new Message({ senderId, recieverId, text, image: imageUrl });
		await newMessage.save();

		// TODO: Socket.io
		const receiverSocketId = getSocketIdByUserId(recieverId);
		if (recieverId) {
			io.to(receiverSocketId).emit("new_message", newMessage);
		}
		res.status(201).json(newMessage);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
};
