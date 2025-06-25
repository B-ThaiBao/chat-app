import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const updateAvatar = async (req, res) => {
	try {
		const { avatar } = req.body;
		const id = req.user._id;

		if (!avatar) return res.status(400).json({ error: "Avatar is required" });

		const upres = await cloudinary.uploader.upload(avatar);
		const upuser = await User.findByIdAndUpdate(id, { avatar: upres.secure_url }, { new: true });

		res.status(200).json({ message: "Avatar updated successfully", user: upuser });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
}
