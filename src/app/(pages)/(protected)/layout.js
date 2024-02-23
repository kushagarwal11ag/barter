"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/context/auth/useAuth";

import { PostProvider } from "@/context/posts/PostContext";

const ProtectedLayout = ({ children }) => {
	const router = useRouter();
	const { authStatus } = useAuth();

	useEffect(() => {
		if (!authStatus) {
			router.replace("/login");
		}
	}, [authStatus, router]);
	return authStatus ? <PostProvider>{children}</PostProvider> : null;
};

export default ProtectedLayout;