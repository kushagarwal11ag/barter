"use client";
import React from "react";

import Navbar from "@/files/Navbar";
import Post from "@/files/Post";

import usePost from "@/context/posts/usePost";

const HomePage = () => {
	const { posts } = usePost();

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
