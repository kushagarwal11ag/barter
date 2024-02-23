"use client";
import React, { useEffect, useState } from "react";

import authService from "@/appwrite/auth";
import { AuthProvider } from "@/context/auth/AuthContext";
import { UserProvider } from "@/context/users/UserContext";

import Loader from "@/files/Loader";

const ProtectedLayout = ({ children }) => {
	const [authStatus, setAuthStatus] = useState(false);
	const [user, setUser] = useState({
		$id: "",
		// profileImageId: null,
		userName: "",
		userEmail: "",
	});
	const [loader, setLoader] = useState(true);

	useEffect(() => {
		const checkAuthAndFetchUser = async () => {
			const isLoggedIn = await authService.isLoggedIn();
			setAuthStatus(isLoggedIn);
			if (isLoggedIn) {
				try {
					const userData = await authService.getCurrentUser();
					setUser({
						$id: userData.$id || "",
						// profileImageId: null,
						userName: userData.name || "",
						userEmail: userData.email || "",
					});
				} catch (error) {
					console.error("Failed to fetch user data:", error);
				}
			}
			setLoader(false);
		};

		checkAuthAndFetchUser();
	}, []);

	return (
		<AuthProvider value={{ authStatus, setAuthStatus }}>
			{!loader ? (
				<>
					<UserProvider value={{ user, setUser }}>
						{children}
					</UserProvider>
				</>
			) : (
				<Loader />
			)}
		</AuthProvider>
	);
};

export default ProtectedLayout;
