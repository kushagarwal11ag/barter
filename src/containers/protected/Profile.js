"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import defaultProfile from "../../../public/defaultProfile.svg";
import uploadFile from "../../../public/uploadFile.svg";

const Profile = ({ profileId }) => {
	const [credentials, setCredentials] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			const fetchedUser = await axios.get(`/api/v1/users/${profileId}`, {
				withCredentials: true,
			});
			const user = await axios.get("/api/v1/users/", {
				withCredentials: true,
			});

			const userDetails = fetchedUser?.data?.data;
			const currentUserDetails = user?.data?.data;
			setCredentials(userDetails);
			setCurrentUser(currentUserDetails);
			console.log(currentUserDetails);
		};
		fetchUser();
	}, []);

	return (
		<>
			<section className="flex items-center justify-center container max-w-screen-lg mx-auto pb-12 md:pb-0">
				<section className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-3">
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
							{credentials?._id === currentUser?._id && (
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
										}}
									>
										Delete
									</button>
								</>
							)}
							{credentials?._id !== currentUser?._id && (
								<button
									className="p-2 rounded bg-[#101827] text-white w-fit"
									onClick={async () => {
										await axios.post(
											`/api/v1/follow/${credentials?._id}`
										);
									}}
								>
									Follow
								</button>
							)}
						</section>
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
					</section>
				</section>
			</section>
		</>
	);
};

export default Profile;
