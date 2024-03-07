"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import authService from "@/appwrite/auth";
import userService from "@/appwrite/user";
import postService from "@/appwrite/post";
import useAuth from "@/context/auth/useAuth";
import useUser from "@/context/users/useUser";

import { PostProvider } from "@/context/posts/PostContext";

const ProtectedLayout = ({ children }) => {
	const router = useRouter();
	const { authStatus } = useAuth();
	const { user, setUser } = useUser();
	const [posts, setPosts] = useState([]);
	const [currentPost, setCurrentPost] = useState(null);

	const addPost = (post) => {
		setPosts([post, ...posts]);
	};

	const getCurrentPost = (postId) => {
		if (!currentPost || currentPost?.$id !== postId) {
			const post = posts.find((p) => p.$id === postId);
			if (post) {
				setCurrentPost(post);
			}
		}
	};

	const editPost = (postId, updatedPost) => {
		setPosts(
			posts.map((p) => (p.$id === postId ? { ...p, ...updatedPost } : p))
		);
	};

	const updatePosts = (newData) => {
		if (newData.tName) {
			setPosts((prevPosts) =>
				prevPosts.map((post) =>
					post.tId === user.$id
						? { ...post, tName: newData.tName }
						: post
				)
			);
		}
		if (newData.newProfileImageId) {
			setPosts((prevPosts) =>
				prevPosts.map((post) =>
					post.tId === user.$id
						? {
								...post,
								tProfileImageId: newData.newProfileImageId,
						  }
						: post
				)
			);
		}
	};

	const deletePost = (postId) => {
		setPosts(posts.filter((p) => p.$id !== postId));
	};

	useEffect(() => {
		let isMountedUser = true;
		let isMountedPost = true;

		if (!authStatus) {
			router.replace("/login");
			return;
		}

		const checkAuthAndFetchUser = async () => {
			try {
				if (!isMountedUser) return;
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
				throw new Error("Failed to fetch user data");
			}
		};

		const fetchPostsIfUserExists = async () => {
			if (!user.$id && authStatus) await checkAuthAndFetchUser();
			if (user.$id && isMountedPost && authStatus && !posts.length) {
				try {
					const postList = await postService.getPosts();
					setPosts(postList.documents);
				} catch (error) {
					throw new Error("Failed to fetch posts");
				}
			}
		};

		fetchPostsIfUserExists();

		return () => {
			isMountedUser && (isMountedUser = false);
			isMountedPost && (isMountedPost = false);
		};
	}, [authStatus, router, user.$id]);

	return authStatus ? (
		<PostProvider
			value={{
				posts,
				currentPost,
				addPost,
				getCurrentPost,
				editPost,
				updatePosts,
				deletePost,
			}}
		>
			{children}
		</PostProvider>
	) : null;
};

export default ProtectedLayout;
