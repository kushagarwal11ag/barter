"use client";
import React, { useEffect } from "react";

import Navbar from "@/files/Navbar";
import Post from "@/files/Post";

import usePost from "@/context/posts/usePost";
import useUser from "@/context/users/useUser";
import postService from "@/appwrite/post";

const HomePage = () => {
	const { posts, addInitialPosts, addPost } = usePost();
	const { user } = useUser();
	console.log("home: user:: ", user)
	useEffect(() => {
		postService.getPosts().then((posts) => {
			if (posts) {
				addInitialPosts(posts.documents);
			}
		});
	}, []);

	return (
		<>
			<Navbar />
			<main className="m-8 grid gap-8 grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
				{posts.map((post) => {
					return (
						<Post
							key={post.$id}
							id={post.$id}
							// liked={post.liked}
							imageId={post.imageId}
							productName={post.pName}
							productCategory={post.pCategory}
							traderName={post.tName}
						/>
					);
				})}
			</main>
		</>
	);
};

export default HomePage;
