"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import postService from "@/appwrite/post";
import userService from "@/appwrite/user";

const Post = ({
	id,
	// liked = false,
	imageId = "",
	productCategory = "",
	productName = "",
	traderName = "",
	traderProfileImageId = "",
}) => {
	const [imageUrl, setImageUrl] = useState("");
	const [profileUrl, setProfileUrl] = useState("/images/defaultProfile.svg");
	useEffect(() => {
		if (!imageUrl) setImageUrl(postService.getFile(imageId).href);
		if ((profileUrl === "/images/defaultProfile.svg") && traderProfileImageId)
			setProfileUrl(userService.getFile(traderProfileImageId).href);
		else if (!traderProfileImageId)
			setProfileUrl("/images/defaultProfile.svg");
	}, []);

	return (
		<>
			<section className="max-w-xs bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl overflow-hidden">
				<Link href={`post/${id}`}>
					<div className="h-40 overflow-hidden">
						<img
							src={imageUrl}
							alt={`${productName} of type ${productCategory} by ${traderName}`}
							className="h-full w-full object-cover"
							loading="auto"
						/>
					</div>
					<div className="p-4">
						<p className="text-gray-700">{productCategory}</p>
						<p className="uppercase tracking-wide text-sm font-bold text-gray-700">
							{productName}
						</p>
					</div>

					<section className="p-2 border-t border-gray-300 bg-gray-100">
						<div className="flex items-center pt-2">
							<img
								src={profileUrl}
								alt={`Image of trader ${traderName}`}
								className="object-cover object-center w-10 h-10 rounded-full mr-3"
							/>
							<div>
								<p className="font-bold text-gray-900">
									{traderName}
								</p>
								<p className="text-sm font-bold text-gray-700 tracking-wide">
									Trader
								</p>
							</div>
						</div>
					</section>
				</Link>
			</section>
		</>
	);
};

export default Post;
