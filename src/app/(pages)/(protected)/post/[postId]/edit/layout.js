"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/context/auth/useAuth";
import useUser from "@/context/users/useUser";
import usePost from "@/context/posts/usePost";

const ProtectedLayout = ({ params, children }) => {
	const router = useRouter();
	const { authStatus } = useAuth();
	const { user } = useUser();
	const { posts } = usePost();
	const { postId } = params;
	const post = posts.find((post) => post.$id === postId);

	useEffect(() => {
		let isMounted = true;
		if (!authStatus) {
			router.replace("/login");
			return;
		}
		const checkPostEditPermission = async () => {
			try {
				if (!isMounted) return;
				if (post.tId !== user.$id) {
					router.replace(`/post/${postId}`);
				}
			} catch (error) {
				throw new Error("Failed to check post edit permission");
			}
		};
		if (user.$id) checkPostEditPermission();
		return () => {
			isMounted = false;
		};
	}, [router, user.$id]);
	return <>{children}</>;
};

export default ProtectedLayout;
