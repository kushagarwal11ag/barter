"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import postService from "@/appwrite/post";

const Post = ({
	// liked = false,
	imageId,
	productCategory = "undefined",
	productName = "null",
	traderName = "null",
	traderPhone = "null",
}) => {
	useEffect(() => {
		setImageUrl(postService.getFile(imageId).href);
	}, []);
	const [imageUrl, setImageUrl] = useState("");
	return (
		<>
			<section className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl overflow-hidden">
				<Link href="#">
					<div className="h-40 overflow-hidden">
						<img
							src={imageUrl}
							alt="Watch image"
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
						<p className="text-xs uppercase font-bold text-gray-600 tracking-wide">
							trader
						</p>
						<div className="flex items-center pt-2">
							<img
								src="/images/defaultProfile.svg"
								className="bg-cover bg-center w-10 h-10 rounded-full mr-3"
							/>
							<div>
								<p className="font-bold text-gray-900">
									{traderName}
								</p>
								<p className="text-sm text-gray-700">
									{traderPhone}
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
