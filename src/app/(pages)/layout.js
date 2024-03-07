"use client";
import React, { useEffect, useState } from "react";

import authService from "@/appwrite/auth";
import userService from "@/appwrite/user";
import { AuthProvider } from "@/context/auth/AuthContext";
import { UserProvider } from "@/context/users/UserContext";

import Loader from "@/files/Loader";

const ProtectedLayout = ({ children }) => {
	const [authStatus, setAuthStatus] = useState(false);
	const [user, setUser] = useState({
		$id: "",
		profileImageId: null,
		profileUrl: "/images/defaultProfile.svg",
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
					const profileId = await userService.getUser(userData.$id);
					let profileUrl = null;
					if (profileId.profileImageId) {
						profileUrl = userService.getFile(
							profileId.profileImageId
						).href;
					}
					setUser({
						$id: userData.$id || "",
						profileImageId: profileId.profileImageId || null,
						profileUrl: profileUrl || "/images/defaultProfile.svg",
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
