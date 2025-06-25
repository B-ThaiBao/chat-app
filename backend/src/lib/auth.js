import jwt from "jsonwebtoken";

export const generateToken = (id, res) => {
	try {
		const token = jwt.sign({ id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		res.cookie("jwt", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			httpOnly: true, // prevents XSS attacks
			sameSite: "strict", // prevents CSRF attacks
			secure: process.env.NODE_ENV !== "development",
		});
		return token;
	} catch (error) {
		console.log(error);
	}
}
