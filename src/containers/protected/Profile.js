"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { Popover, Rate, Dropdown, Empty, Button } from "antd";

import defaultProfile from "../../../public/defaultProfile.svg";
import calendar from "../../../public/icons/calendar.svg";
import menu from "../../../public/icons/menu.svg";
import phone from "../../../public/icons/phone.svg";
import mail from "../../../public/icons/mail.svg";
import Delete from "@/components/icons/Delete.js";

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

	const contactContent = (
		<div>
			{credentials?.phone && (
				<div className="flex gap-2">
					<Image
						src={phone}
						alt="Phone icon"
						width={15}
						height={15}
					/>
					<p>{credentials.phone}</p>
				</div>
			)}
			{credentials?.email && (
				<div className="flex gap-2">
					<Image
						src={mail}
						alt="E-mail icon"
						width={15}
						height={15}
					/>
					<p>{credentials.email}</p>
				</div>
			)}
		</div>
	);

	const followersContent = (
		<div className="overflow-auto max-h-20 w-48">
			{credentials?.followers?.map((follower) => (
				<Link
					href={`/profile/${follower.follower._id}`}
					key={follower.follower._id}
					className="p-2 flex gap-2 hover:text-[#101827]"
				>
					<Image
						src={follower.follower?.avatar || defaultProfile}
						alt="User Avatar"
						className="w-10 h-10 rounded-full border-2 border-black"
						objectFit="cover"
					/>
					<div className="capitalize self-center">
						{follower.follower.name}
					</div>
				</Link>
			))}
		</div>
	);

	const followingContent = (
		<div className="overflow-auto max-h-20 w-48">
			{credentials?.following?.map((following) => (
				<Link
					href={`/profile/${following.following._id}`}
					key={following.following._id}
					className="p-2 flex gap-2 hover:text-[#101827]"
				>
					<Image
						src={following.following?.avatar || defaultProfile}
						alt="User Avatar"
						className="w-10 h-10 rounded-full border-2 border-black"
						objectFit="cover"
					/>
					<div className="capitalize self-center">
						{following.following.name}
					</div>
				</Link>
			))}
		</div>
	);

	const items =
		credentials?._id === currentUser?._id
			? [
					{
						key: "1",
						label: <Link href="edit">Edit</Link>,
					},
					{
						key: "2",
						label: (
							<div
								onClick={async () => {
									await axios.delete("/api/v1/users/");
									router.push("/login");
								}}
							>
								Delete
							</div>
						),
						danger: true,
					},
			  ]
			: [
					{
						key: "1",
						label: <Link href="/">Block</Link>,
						danger: true,
					},
			  ];

	return (
		<>
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
				<section className="mt-20 md:ml-72 md:mt-0 p-2 flex">
					<div>
						{credentials?.name && (
							<div className="capitalize text-2xl font-semibold">
								{credentials.name}
							</div>
						)}
						{credentials?.rating > 0 && (
							<Rate
								disabled
								defaultValue={credentials.rating}
								className="custom-rating"
							/>
						)}
						{credentials?.bio && (
							<div className="text-sm">{credentials.bio}</div>
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
					</div>
					<Dropdown
						menu={{
							items,
						}}
						placement="bottomRight"
						className="ml-auto h-fit"
					>
						<Image
							src={menu}
							alt="Menu icon"
							width={24}
							height={24}
							className="cursor-pointer"
						/>
					</Dropdown>
				</section>
				<section className="mt-4 p-4">
					<div className="flex gap-2">
						{(credentials?.email || credentials?.phone) && (
							<Popover
								content={contactContent}
								title="Contact Details"
								trigger="hover"
								arrow={false}
								placement="bottomLeft"
								overlayClassName="custom-popover popover2"
								className="py-1 px-2 bg-[#D3D9E9] rounded cursor-pointer"
							>
								Contact
							</Popover>
						)}
						{credentials?._id !== currentUser?._id && (
							<button
								className="py-1 px-2 bg-[#101827] text-white w-fit rounded"
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
								{credentials.isFollow ? "Unfollow" : "Follow"}
							</button>
						)}
					</div>
					<section className="flex gap-4">
						{credentials?.followers?.length > 0 && (
							<Popover
								content={followersContent}
								title="People who are following you"
								trigger="hover"
								arrow={false}
								placement="bottomLeft"
								overlayClassName="custom-popover"
							>
								<div className="mt-2 cursor-pointer">
									<span className="font-semibold">
										{credentials.followers.length}
									</span>{" "}
									followers
								</div>
							</Popover>
						)}
						{credentials?.following?.length > 0 && (
							<Popover
								content={followingContent}
								title="People you are following"
								trigger="hover"
								arrow={false}
								placement="bottomRight"
								overlayClassName="custom-popover"
							>
								<div className="mt-2 cursor-pointer">
									<span className="font-semibold">
										{credentials.following.length}
									</span>{" "}
									following
								</div>
							</Popover>
						)}
					</section>
					<hr className="my-2 h-px border-0 bg-black" />
					{products?.productCount > 0 ? (
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
						))
					) : (
						<Empty description={<p>No products to display</p>}>
							{/* <Button>Create Now</Button> */}
						</Empty>
					)}
					<hr className="my-2 h-px border-0 bg-black" />
					{credentials?.feedbacks?.length > 0 ? (
						<>
							{credentials.feedbacks.length} feedbacks
							{credentials.feedbacks.map((feedback) => (
								<section
									key={feedback._id}
									className="relative"
								>
									<section className="p-2 mt-6 flex gap-2 overflow-x-auto border border-black rounded cursor-default">
										<Delete
											className="absolute right-2 -top-4 z-50 p-1 bg-white w-7 h-7 cursor-pointer"
											onClick={async () => {
												await axios.delete(
													`/api/v1/feedback/${feedback._id}`
												);
											}}
										/>
										<div className="flex flex-col min-w-32">
											<Image
												src={
													feedback.feedbackBy
														.avatar ||
													defaultProfile
												}
												alt="User Avatar"
												className="w-20 h-20 self-center rounded-full border-2 border-black"
												objectFit="cover"
											/>
											<p className="font-semibold text-center capitalize">
												{feedback.feedbackBy.name}
											</p>
										</div>
										<div className="max-h-20 overflow-y-auto self-center">
											<Rate
												disabled
												defaultValue={
													feedback.rating || 1
												}
												className="custom-rating"
											/>
											<p className="text-sm">
												{feedback.content}
											</p>
										</div>
									</section>
								</section>
							))}
						</>
					) : (
						<Empty description={<p>No feedbacks to display</p>} />
					)}
				</section>
			</section>
		</>
	);
};

export default Profile;
