"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

import defaultProfile from "../../../public/defaultProfile.svg";
import uploadFile from "../../../public/uploadFile.svg";

const Profile = ({ profileId }) => {
	const router = useRouter();
	const [credentials, setCredentials] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			const fetchedUser = await axios.get(`/api/v1/users/${profileId}`, {
				withCredentials: true,
			});
			const currentUser = await axios.get("/api/v1/users/", {
				withCredentials: true,
			});
			const followers = await axios.get(`/api/v1/follow/${profileId}`);
			const following = await axios.get(
				`/api/v1/follow/following/${profileId}`
			);
			const feedback = await axios.get(
				`/api/v1/feedback/user/${profileId}`
			);

			setCredentials({
				...fetchedUser?.data?.data,
				followers: followers?.data?.data,
				following: following?.data?.data,
				feedbacks: feedback?.data?.data,
			});
			setCurrentUser(currentUser?.data?.data);
			console.log(feedback?.data?.data);
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
			{/* <section className="flex items-center justify-center container max-w-screen-lg mx-auto pb-12 md:pb-0">
				<section className="bg-white rounded p-4 px-4 md:p-8 mb-6 grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-3">
					<section className="text-gray-600 flex flex-col items-center">
						<Image
							name="avatar"
							src={credentials?.avatar || defaultProfile}
							alt="User Profile Image"
							width={200}
							height={200}
							className="w-52 h-52 m-7 rounded-full object-cover object-contain"
						/>
						<Image
							name="banner"
							src={credentials?.banner || uploadFile}
							alt="User Banner - Background Image"
							width={200}
							height={200}
							className="w-52 h-52 m-7 rounded-full object-cover object-contain"
						/>
					</section>

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
						<p>Joined {timeSpan(credentials?.createdAt)}</p>
						<p>{credentials?.followers.length} followers</p>
						<p>{credentials?.following.length} following</p>
						<section className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
							<div className="md:col-span-3">
								<label className="text-sm text-gray-600 font-bold">
									Rating
								</label>
								<p>{credentials?.rating}</p>
							</div>

							<div className="md:col-span-3">
								<label className="text-sm text-gray-600 font-bold">
									Name
								</label>
								<p>{credentials?.name}</p>
							</div>

							{credentials?.email && (
								<div className="md:col-span-2">
									<label className="text-sm text-gray-600 font-bold">
										Email
									</label>
									<p>{credentials.email}</p>
								</div>
							)}

							{credentials?.bio && (
								<div className="md:col-span-5">
									<label className="text-sm text-gray-600 font-bold">
										Bio
									</label>
									<p>{credentials.bio}</p>
								</div>
							)}

							{credentials?.phone && (
								<div className="md:col-span-2">
									<label className="text-sm text-gray-600 font-bold">
										Phone
									</label>
									<p>{credentials.phone}</p>
								</div>
							)}

							<div className="md:col-span-3">
								<label className="text-sm text-gray-600 font-bold">
									Address
								</label>
								<p>Address</p>
							</div>
						</section>

						<p className="mt-2 text-xl">
							{credentials?.product?.length} products
						</p>
						<section className="m-auto max-w-7xl p-8 grid gap-8 grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
							{credentials?.product?.length &&
								credentials.product.map((product) => (
									<Link
										key={product._id}
										href={`/product/${product._id}`}
										className="max-w-xs bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl overflow-hidden"
									>
										<div className="h-40 overflow-hidden">
											<Image
												src={product.image.url}
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
								))}
						</section>
						<section>
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
				</section>
			</section> */}
			<section>
				<section className="relative w-full h-32" style={bannerStyle}>
					<div className="absolute bottom-0 left-1/2 md:left-40 transform -translate-x-1/2 translate-y-1/2 w-40 h-40">
						<Image
							src={credentials?.avatar || defaultProfile}
							alt="User Avatar"
							className="rounded-full border-4 border-white"
							layout="fill"
							objectFit="cover"
						/>
					</div>
				</section>
				<section>Hello</section>
			</section>
		</>
	);
};

export default Profile;
