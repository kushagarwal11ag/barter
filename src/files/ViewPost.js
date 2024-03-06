import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Loader from "./Loader";
import usePost from "@/context/posts/usePost";
import useUser from "@/context/users/useUser";

import postService from "@/appwrite/post";

import Edit from "@/components/icons/Edit";
import Delete from "@/components/icons/Delete";

const ViewPost = ({ id }) => {
	const { currentPost, deletePost } = usePost();
	const { user } = useUser();
	const router = useRouter();
	const [imageURL, setImageURL] = useState("");

	const postData = {
		pName: currentPost?.pName || "",
		pCategory: currentPost?.pCategory || "",
		imageId: currentPost?.imageId || null,
		tName: currentPost?.tName || "",
		tId: currentPost?.tId || "",
	};
	useEffect(() => {
		if (postData.imageId)
			setImageURL(postService.getFile(postData.imageId).href);
	}, [postData]);

	const handleDelete = async () => {
		try {
			await postService.deletePost(id);
			await postService.deleteFile(postData.imageId);
			deletePost(id);
			router.push("/home");
		} catch (error) {
			console.log("error while deleting post");
			throw error;
		}
	};

	if (!currentPost) return <Loader />;

	return (
		<section className="flex flex-col items-center justify-center gap-8 m-2 p-3 md:flex-row md:max-w-screen-xl">
			<div className="w-full border-2 rounded-xl border-black">
				<img
					src={imageURL}
					alt={`${postData.pName} of type ${postData.pCategory} by ${postData.tName}`}
					className="m-auto rounded-xl object-cover object-center"
				/>
			</div>

			<div className="p-4 w-full flex flex-col gap-2 shadow-lg rounded-lg">
				{user?.$id === postData.tId && (
					<div className="ml-auto flex gap-2">
						<Edit
							className=" w-8 h-8 cursor-pointer"
							onClick={() => {
								router.push(`/post/${id}/edit`);
							}}
						/>
						<Delete className="w-8 h-8 cursor-pointer" onClick={handleDelete} />
					</div>
				)}
				<p className="uppercase font-bold text-sm">
					{postData.pCategory}
				</p>
				<p className="uppercase text-lg">{postData.pName}</p>
				<p className="italic">by {postData.tName}</p>
			</div>
		</section>
	);
};

export default ViewPost;
