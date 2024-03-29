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
		const checkPostEditPermission = async () => {
			try {
				if (!isMounted) return;
				if (!currentPost || currentPost?.$id !== postId)
					getCurrentPost(postId);
				if (currentPost.tId !== user.$id) {
					router.replace(`/post/${postId}`);
					return;
				}
			} catch (error) {
				throw new Error("Failed to check post edit permission");
			}
		};
		if (user.$id && posts) checkPostEditPermission();
		return () => {
			isMounted = false;
		};
	}, [router, user.$id, currentPost, posts, postId]);
	return <>{children}</>;
};

export default ProtectedLayout;
