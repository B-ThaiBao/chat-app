import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

import { useAuthStore } from "./store/useAuthStore.js";

import NavBar from "./components/Navbar.jsx";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";

function App() {
	const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
	const { theme } = useThemeStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth && !authUser) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<Loader className="size-10 animate-spin" />
			</div>
		);
	}

	return (
		<div data-theme={theme}>
			<Toaster />
			<NavBar />

			<Routes>
				<Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
				<Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
				<Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
			</Routes>
		</div>
	);
}

export default App
