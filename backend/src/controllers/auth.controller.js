import { generateToken } from "../lib/auth.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		if (!name || !email || !password) {
			return res.status(400).json({ error: "All fields are required" });
		}
		if (password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters" });
		}

		// Check if email already exists
		const user = await User.findOne({ email });
		if (user) return res.status(400).json({ error: "Email already exists" });

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({ name: name, email: email, password: hashedPassword });

		if (newUser) {
			// Generate JWT token
			generateToken(newUser, res);
			await newUser.save();

			res.status(201).json({
				message: "User created successfully",
				user: {
					id: newUser._id,
					name: newUser.name,
					email: newUser.email,
					avatar: newUser.avatar,
				},
			});
		} else {
			return res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res.status(400).json({ error: "All fields are required" });
		}
		if (password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters" });
		}

		// Check if it exists in database
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ error: "Invalid credentials" });

		// Check if password is correct
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
		generateToken(user, res);
		res.status(200).json({
			message: "User logged in successfully",
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				avatar: user.avatar,
			},
		})
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
}

export const logout = (_, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "User logged out successfully" });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
}

export const checkAuth = (req, res) => {
	try {
		res.status(200).json({ message: "User is authenticated", user: req.user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
}
