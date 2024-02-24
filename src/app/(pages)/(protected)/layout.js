"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import authService from "@/appwrite/auth";
import userService from "@/appwrite/user";
import useAuth from "@/context/auth/useAuth";
import useUser from "@/context/users/useUser";

import { PostProvider } from "@/context/posts/PostContext";

const ProtectedLayout = ({ children }) => {
	const router = useRouter();
	const { authStatus } = useAuth();
	const { user, setUser } = useUser();

	useEffect(() => {
		const checkAuthAndFetchUser = async () => {
			if (!authStatus) {
				router.replace("/login");
			} else {
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
						profileUrl: profileUrl || "/defaultProfile.svg",
						userName: userData.name || "",
						userEmail: userData.email || "",
					});
				} catch (error) {
					console.error("Failed to fetch user data:", error);
				}
			}
		};

		checkAuthAndFetchUser();
	}, [authStatus, router]);
	return authStatus ? <PostProvider>{children}</PostProvider> : null;
};

export default ProtectedLayout;
