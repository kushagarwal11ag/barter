"use client";
import React, {useEffect, useState} from "react";
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
		setImageUrl(postService.getFilePreview(imageId).href);
	}, [])
	const [imageUrl, setImageUrl] = useState("")
	return (
		<>
			<section className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
				<Link href="#">
					<div className="bg-white shadow-xl rounded-lg overflow-hidden">
						{/* <div className="bg-cover bg-center h-56 p-4 bg-[url(/images/posts/watch.jpg)]">
							<div className="flex justify-end">
								<span>
									{liked ? (
										<img
											src="/images/fill-heart.png"
											alt=""
											className="h-7 w-7"
										/>
									) : (
										<img
											src="/images/heart.png"
											alt=""
											className="h-7 w-7"
										/>
									)}
								</span>
							</div>
						</div> */}
						<img src={imageUrl} alt="Watch image" />
						<div className="p-4">
							<p className="text-gray-700">{productCategory}</p>
							<span className="uppercase tracking-wide text-sm font-bold text-gray-700">
								{productName}
							</span>
						</div>

						<div className="p-2 border-t border-gray-300 bg-gray-100">
							<div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
								trader
							</div>
							<div className="flex items-center pt-2">
								<div className="bg-cover bg-center w-10 h-10 rounded-full mr-3 bg-[url(/images/defaultProfile.svg)]"></div>
								<div>
									<p className="font-bold text-gray-900">
										{traderName}
									</p>
									<p className="text-sm text-gray-700">
										{traderPhone}
									</p>
								</div>
							</div>
						</div>
					</div>
				</Link>
			</section>
		</>
	);
};

export default Post;
