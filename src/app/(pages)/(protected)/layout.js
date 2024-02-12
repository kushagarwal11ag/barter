"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import authService from "@/appwrite/auth";
import useAuth from "@/context/auth/useAuth";
import useUser from "@/context/users/useUser";

import { PostProvider } from "@/context/posts/PostContext";
import { UserProvider } from "@/context/users/UserContext";

const ProtectedLayout = ({ children }) => {
	const router = useRouter();
	const { authStatus } = useAuth();
	const { editUser } = useUser();

	useEffect(() => {
		if (!authStatus) {
			router.replace("/login");
		} else {
			const fetchUser = async () => {
				try {
					let user = await authService.getCurrentUser();
					const updatedUser = {
						userName: user.name || "",
						userEmail: user.email || "",
						userPhone: user.phone || "",
					};
					editUser(updatedUser);
				} catch (error) {
					console.log(error);
				}
			};
			fetchUser();
		}
	}, [authStatus, router]);
	return authStatus ? (
		<UserProvider>
			<PostProvider>{children}</PostProvider>
		</UserProvider>
	) : null;
};

export default ProtectedLayout;
