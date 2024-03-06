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
	const { posts, currentPost, getCurrentPost } = usePost();
	const { postId } = params;

	useEffect(() => {
		let isMounted = true;
		if (!authStatus) {
			router.replace("/login");
			return;
		}
		const viewPost = () => {
			try {
				if (!isMounted) return;
				if (!currentPost || currentPost?.$id !== postId)
					getCurrentPost(postId);
			} catch (error) {
				router.replace("/home");
				throw new Error("Failed to display post");
			}
		};
		if (user.$id && posts) viewPost();
		return () => {
			isMounted = false;
		};
	}, [router, currentPost, user.$id, postId, posts]);
	return <>{children}</>;
};

export default ProtectedLayout;
