import { Link } from "react-router-dom";
import { useState } from "react";
import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";

import toast from "react-hot-toast";

export default function SignUpPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const { signUp, isSigningUp } = useAuthStore();

	const validateForm = () => {
		if (!data.name.trim()) return toast.error("Name is required");
		if (!data.email.trim()) return toast.error("Email is required");
		if (!/\S+@\S+\.\S+/.test(data.email)) return toast.error("Invalid email format");
		if (!data.password.trim()) return toast.error("Password is required");
		if (data.password.length < 6) return toast.error("Password must be at least 6 characters long");
		return true;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const isValid = validateForm();
		if (isValid) {
			signUp(data);
		}
	};
	return (
		<div className="min-h-screen grid lg:grid-cols-2">
			{ /* Left side */}
			<div className="flex flex-col justify-center items-center p-6 sm:p-12">
				<div className="w-full max-w-md space-y-8">
					{ /* Logo */ }
					<div className="text-center mb-8">
						<div className="flex flex-col items-center gap-2 group">
							<div
								className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
								group-hover:bg-primary/20 transition-colors"
							>
								<MessageSquare className="size-6 text-primary" />
							</div>
							<h1 className="text-2xl font-bold mt-2">Create Account</h1>
							<p className="text-base-content/60">Get started with your free account</p>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						{ /* Name */ }
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">Name</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
									<User className="size-5 text-base-content/40" />
								</div>
								<input
									type="text"
									className={`input input-bordered w-full pl-10`}
									placeholder="Example: Thai Bao"
									value={data.name}
									onChange={(e) => setData({ ...data, name: e.target.value })}
								/>
							</div>
						</div>

						{/* Email */}
						<div className="form-control">
							{ /* Name */ }
							<label className="label">
								<span className="label-text font-medium">Email</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
									<Mail className="size-5 text-base-content/40" />
								</div>
								<input
									type="text"
									className={`input input-bordered w-full pl-10`}
									placeholder="Example: thaibao@example.com"
									value={data.email}
									onChange={(e) => setData({ ...data, email: e.target.value })}
								/>
							</div>
						</div>

						{/* Password */}
						<div className="form-control">
							{ /* Name */ }
							<label className="label">
								<span className="label-text font-medium">Password</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
									<Lock className="size-5 text-base-content/40" />
								</div>
								<input
									type={showPassword ? "text" : "password"}
									className={`input input-bordered w-full pl-10`}
									placeholder="Example: ••••••••"
									value={data.password}
									onChange={(e) => setData({ ...data, password: e.target.value })}
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <EyeOff className="size-5 text-base-content/40" /> : <Eye className="size-5 text-base-content/40" />}
								</button>
							</div>
						</div>

						{/* Sign Up Button */}
						<button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
							{isSigningUp ? (
								<>
									<Loader2 className="size-5 animate-spin" />
									Loading...
								</>
							) : (
									"Create Account"
								)}
						</button>
					</form>

					{/* Text */}
					<div className="text-center">
						<p className="text-base-content/60">
							Already have an account?{" "}
							<Link to="/login" className="link link-primary">
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div>

			<AuthImagePattern
				title="Join our community"
				subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
			/>
		</div>
	);
}
