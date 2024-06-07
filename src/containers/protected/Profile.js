"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

import defaultProfile from "../../../public/defaultProfile.svg";
import calendar from "../../../public/icons/calendar.svg";

const Profile = ({ profileId }) => {
	const router = useRouter();
	const [credentials, setCredentials] = useState(null);
	const [products, setProducts] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			const fetchedUser = await axios.get(`/api/v1/users/${profileId}`, {
				withCredentials: true,
			});
			const products = await axios.get(
				`/api/v1/products/user/${profileId}`,
				{
					withCredentials: true,
				}
			);
			const currentUser = await axios.get("/api/v1/users/", {
				withCredentials: true,
			});
			const feedback = await axios.get(
				`/api/v1/feedback/user/${profileId}`
			);

			const fetchedUserDetails = fetchedUser?.data?.data;
			const productDetails = products?.data?.data;
			const currentUserDetails = currentUser?.data?.data;
			const feedbackDetails = feedback?.data?.data;
			let followerDetails;
			let followingDetails;

			if (currentUserDetails._id === fetchedUserDetails._id) {
				const followers = await axios.get(
					`/api/v1/follow/${profileId}`
				);
				const following = await axios.get(
					`/api/v1/follow/following/${profileId}`
				);
				followerDetails = followers?.data?.data;
				followingDetails = following?.data?.data;
			}

			setCredentials({
				...fetchedUserDetails,
				followers: followerDetails,
				following: followingDetails,
				feedbacks: feedbackDetails,
			});
			setProducts(productDetails);
			setCurrentUser(currentUserDetails);
			console.log(feedbackDetails);
			console.log("followers", followerDetails);
			console.log("following", followingDetails);
			console.log("products", productDetails);
		};
		fetchUser();
	}, []);

	const timeSpan = (joinDate) => {
		const date = new Date(joinDate);
		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		const year = date.getFullYear();
		const month = monthNames[date.getMonth()];

		return `${month} ${year}`;
	};

	const bannerStyle = credentials?.banner
		? {
				backgroundImage: `url(${credentials.banner})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundPosition: "center",
		  }
		: { backgroundColor: "#468189" };

	return (
		<>
			{/* <section className="bg-white rounded p-4 px-4 md:p-8 mb-6 grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-3">
					<section className="md:col-span-2">
						<section className="flex gap-2">
							{credentials?._id === currentUser?._id ? (
								<>
									<Link
										href="edit"
										className="p-2 rounded bg-green-700 text-white w-fit"
									>
										Edit
									</Link>
									<button
										className="p-2 rounded bg-red-700 text-white w-fit"
										onClick={async () => {
											await axios.delete(
												"/api/v1/users/"
											);
											router.push("/login");
										}}
									>
										Delete
									</button>
								</>
							) : (
								<>
									<button
										className="p-2 rounded bg-[#101827] text-white w-fit"
										onClick={async () => {
											credentials.isFollow
												? await axios.delete(
														`/api/v1/follow/${credentials._id}`
												  )
												: await axios.post(
														`/api/v1/follow/${credentials._id}`
												  );
										}}
									>
										{credentials.isFollow
											? "Unfollow"
											: "Follow"}
									</button>
									<button
										className="p-2 rounded bg-[#101827] text-white w-fit"
										onClick={async () => {
											await axios.patch(
												`/api/v1/block/${credentials._id}`
											);
										}}
									>
										Block
									</button>
								</>
							)}
						</section>
							{credentials?.feedbacks?.length &&
								credentials.feedbacks.map((feedback) => (
									<section
										className="p-2 border-2"
										key={feedback._id}
									>
										<button
											className="p-1 rounded bg-red-600 text-white"
											onClick={async () => {
												await axios.delete(
													`/api/v1/feedback/${feedback._id}`
												);
											}}
										>
											Delete
										</button>
										<div>Rating: {feedback.rating}</div>
										<div>Content: {feedback.content}</div>
										<div>
											Owner Name:{" "}
											{feedback.feedbackBy.name}
										</div>
									</section>
								))}
						</section>
				</section>
			</section> */}
			<section className="container max-w-screen-lg mx-auto pb-12 md:pb-0">
				<section className="relative w-full h-32" style={bannerStyle}>
					<div className="absolute bottom-0 left-1/2 md:left-40 transform -translate-x-1/2 translate-y-1/2 w-40 h-40">
						<Image
							src={credentials?.avatar || defaultProfile}
							alt="User Avatar"
							className="rounded-full border-4 border-black"
							layout="fill"
							objectFit="cover"
						/>
					</div>
				</section>
				<section className="mt-20 md:ml-72 md:mt-0 p-2">
					{credentials?.name && (
						<div className="capitalize text-2xl font-semibold">
							{credentials.name}
						</div>
					)}

					{credentials?.rating && (
						<div className="mt-1 flex items-center">
							<svg
								className={`w-4 h-4 ${
									credentials.rating >= 1
										? "text-yellow-600"
										: "text-gray-400"
								}`}
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className={`w-4 h-4 ${
									credentials.rating >= 2
										? "text-yellow-600"
										: "text-gray-400"
								} ms-1`}
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className={`w-4 h-4 ${
									credentials.rating >= 3
										? "text-yellow-600"
										: "text-gray-400"
								} ms-1`}
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className={`w-4 h-4 ${
									credentials.rating >= 4
										? "text-yellow-600"
										: "text-gray-400"
								} ms-1`}
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
							<svg
								className={`w-4 h-4 ${
									credentials.rating >= 5
										? "text-yellow-600"
										: "text-gray-400"
								} ms-1`}
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 20"
							>
								<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
							</svg>
						</div>
					)}

					{credentials?.createdAt && (
						<div className="mt-1 text-sm flex gap-2">
							<Image
								src={calendar}
								alt="Calendar icon"
								width={15}
								height={15}
							/>
							Joined {timeSpan(credentials.createdAt)}
						</div>
					)}
				</section>
				<section className="p-4">
					<section className="flex gap-4">
						{credentials?.email && <div>{credentials.email}</div>}
						{credentials?.phone && (
							<div>+1 {credentials.phone}</div>
						)}
					</section>
					<section className="flex gap-4">
						{credentials?.followers && (
							<div>
								<span className="font-semibold">
									{credentials.followers.length}
								</span>{" "}
								followers
							</div>
						)}
						{credentials?.following && (
							<div>
								<span className="font-semibold">
									{credentials.following.length}
								</span>{" "}
								following
							</div>
						)}
					</section>
					<hr className="my-2 h-px border-0 bg-black" />
					{products?.productCount &&
						products.products.map((product) => (
							<div key={product._id}>
								<div>{products.productCount} products</div>
								<Link
									href={`/product/${product._id}`}
									className="max-w-xs bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl overflow-hidden"
								>
									<div className="h-40 overflow-hidden">
										<Image
											src={product.image}
											width={100}
											height={100}
											alt={`${product.title} of type ${product.category} by ${credentials.name}`}
											className="h-full w-full object-contain"
										/>
									</div>
									<div className="p-4">
										<p className="text-gray-700 capitalize">
											{product.category}
										</p>
										<p className="uppercase tracking-wide text-sm font-bold text-gray-700">
											{product.title}
										</p>
									</div>
								</Link>
							</div>
						))}
				</section>
			</section>
		</>
	);
};

export default Profile;
