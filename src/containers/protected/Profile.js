"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { Popover, Modal, Rate, Form, Input, Dropdown, Tabs, Empty } from "antd";

import defaultProfile from "../../../public/defaultProfile.svg";
import Edit from "@/components/icons/Edit.js";
import Delete from "@/components/icons/Delete.js";

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

const handleAxiosError = (error) => {
	const errorMessage =
		error.response?.data?.message || "Something went wrong. Try again";
	console.log(errorMessage);
};

const ProductTabs = ({ credentials, currentUser, products }) => {
	const [wishlist, setWishlist] = useState(null);

	useEffect(() => {
		const fetchWishlist = async () => {
			const wishlistProducts = await axios.get("/api/v1/wishlist/", {
				withCredentials: true,
			});
			setWishlist(wishlistProducts?.data?.data);
		};
		fetchWishlist();
	}, []);

	const myProducts = (
		<>
			{products?.length > 0 ? (
				<section className="max-w-7xl py-4 px-2 grid gap-8 grid-flow-col auto-cols-[70%] min-[450px]:auto-cols-[50%] sm:auto-cols-[30%] overflow-x-auto snap-proximity snap-x">
					{products.map((product) => (
						<Link
							key={product._id}
							href={`/product/${product._id}`}
							className="relative max-w-xs shadow-md duration-500 hover:scale-105 hover:shadow-xl overflow-hidden h-80 snap-center"
						>
							<div
								className="absolute inset-0 bg-cover bg-center z-0 rounded-xl border-black border"
								style={{
									backgroundImage: `url(${product.image})`,
								}}
							></div>
							<section className="p-4 opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 bg-[#000000d9] text-white flex flex-col justify-end rounded-xl">
								<p className="uppercase tracking-wide text-lg font-bold">
									{product.title}
								</p>
								<p className="capitalize text-sm">
									{product.category}
								</p>
							</section>
						</Link>
					))}
				</section>
			) : (
				<Empty
					description={<p>No products added yet</p>}
					className="my-5"
				>
					<Link
						href="/product/add"
						className="p-2 bg-[#101827] text-white rounded"
					>
						Create now
					</Link>
				</Empty>
			)}
		</>
	);

	const wishlistProducts = (
		<>
			{wishlist?.length ? (
				<section className="max-w-7xl py-4 px-2 grid gap-8 grid-flow-col auto-cols-[70%] min-[450px]:auto-cols-[50%] sm:auto-cols-[30%] overflow-x-auto snap-proximity snap-x">
					{wishlist.map((product) => (
						<Link
							key={product._id}
							href={`/product/${product._id}`}
							className="relative max-w-xs shadow-md duration-500 hover:scale-105 hover:shadow-xl overflow-hidden h-80 snap-center"
						>
							<div
								className="absolute inset-0 bg-cover bg-center z-0 rounded-xl border-black border"
								style={{
									backgroundImage: `url(${product.image})`,
								}}
							></div>
							<div
								className="absolute top-0 right-2 z-20 w-10 h-10 bg-cover bg-no-repeat"
								style={{
									backgroundImage: "url(/icons/heart.svg)",
								}}
							></div>
							<section className="p-4 opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 bg-[#000000d9] text-white flex flex-col justify-end rounded-xl">
								<p className="uppercase tracking-wide text-lg font-bold">
									{product.title}
								</p>
								<p className="capitalize text-sm">
									{product.category}
								</p>
								<div className="mt-2 flex items-center gap-2">
									<Image
										src={
											product.owner.avatar ||
											defaultProfile
										}
										width={100}
										height={100}
										alt={`Image of trader ${product.owner.name}`}
										className="object-cover object-center w-10 h-10 rounded-full"
									/>
									<div className="font-bold capitalize">
										{product.owner.name}
									</div>
								</div>
							</section>
						</Link>
					))}
				</section>
			) : (
				<Empty
					description={<p>No products added to wishlist</p>}
					className="my-5"
				>
					<Link
						href="/explore"
						className="p-2 bg-[#101827] text-white rounded"
					>
						Explore Products
					</Link>
				</Empty>
			)}
		</>
	);

	const items = [
		{
			key: "1",
			label: "My Products",
			children: myProducts,
		},
		{
			key: "2",
			label: "Wishlist",
			children: wishlistProducts,
		},
	];

	return credentials === currentUser ? (
		<Tabs defaultActiveKey="1" items={items} />
	) : (
		myProducts
	);
};

const FeedbackModal = ({
	type = "add",
	isModalOpen,
	setIsModalOpen,
	initialFeedback,
	profileId,
}) => {
	const [form] = Form.useForm();

	const handleFeedbackAdd = async (values) => {
		try {
			await axios.post(
				`/api/v1/feedback/user/${profileId}`,
				{ rating: values.rating, content: values.review },
				{
					withCredentials: true,
				}
			);
			setIsModalOpen(false);
		} catch (error) {
			setIsModalOpen(false);
			handleAxiosError(error);
		}
	};
	const handleEditFeedback = async (values) => {
		try {
			await axios.patch(
				`/api/v1/feedback/${initialFeedback._id}`,
				{ rating: values.rating, content: values.review },
				{
					withCredentials: true,
				}
			);
			setIsModalOpen(false);
		} catch (error) {
			setIsModalOpen(false);
			handleAxiosError(error);
		}
	};
	const handleFeedbackModalCancel = () => {
		form.resetFields();
		setIsModalOpen(false);
	};

	const formInitialValues =
		type === "edit"
			? {
					rating: initialFeedback.rating,
					review: initialFeedback.content,
			  }
			: {};

	return (
		<Modal
			title={type === "add" ? "Add Review" : "Edit Review"}
			open={isModalOpen}
			onCancel={handleFeedbackModalCancel}
			footer={null}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={formInitialValues}
				onFinish={
					type === "add" ? handleFeedbackAdd : handleEditFeedback
				}
			>
				<Form.Item
					name="rating"
					label="Rating"
					rules={[
						{ required: true, message: "Please provide a rating!" },
					]}
				>
					<Rate />
				</Form.Item>
				<Form.Item
					name="review"
					label="Review"
					rules={[
						{
							required: true,
							message: "Please provide your review",
						},
						{
							min: 10,
							message:
								"Review must be at least 10 characters long",
						},
						{
							max: 300,
							message: "Review cannot exceed 300 characters",
						},
					]}
				>
					<Input.TextArea
						placeholder="Enter your review"
						autoSize={{
							minRows: 4,
							maxRows: 6,
						}}
						showCount
						maxLength={300}
					/>
				</Form.Item>
				<div className="flex justify-end space-x-4">
					<button
						onClick={handleFeedbackModalCancel}
						className="px-4 text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white rounded"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="px-4 text-[#101827] border-2 border-[#101827] hover:bg-[#101827] hover:text-white rounded"
					>
						Submit
					</button>
				</div>
			</Form>
		</Modal>
	);
};

const FeedbackTabs = ({ credentials, currentUser, profileId }) => {
	const [feedbacks, setFeedbacks] = useState(null);
	const [myFeedbacks, setMyFeedbacks] = useState(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	useEffect(() => {
		const fetchFeedbacks = async () => {
			try {
				const feedbackList = await axios.get(
					`/api/v1/feedback/user/${profileId}`,
					{ withCredentials: true }
				);
				const myFeedbackList = await axios.get("/api/v1/feedback/my", {
					withCredentials: true,
				});
				setFeedbacks(feedbackList?.data?.data);
				setMyFeedbacks(myFeedbackList?.data?.data);
			} catch (error) {
				handleAxiosError(error);
			}
		};
		fetchFeedbacks();
	}, []);

	const showAddModal = () => {
		setIsAddModalOpen(true);
	};
	const showEditModal = () => {
		setIsEditModalOpen(true);
	};
	const handleFeedbackDelete = async (feedbackId) => {
		try {
			await axios.delete(`/api/v1/feedback/${feedbackId}`, {
				withCredentials: true,
			});
		} catch (error) {
			handleAxiosError(error);
		}
	};

	const userFeedbackList = (
		<>
			{credentials !== currentUser && (
				<div className="flex">
					<button
						type="button"
						className="ml-auto mb-6 px-2 border-black border rounded"
						onClick={showAddModal}
					>
						Leave a review
					</button>
					<FeedbackModal
						type="add"
						isModalOpen={isAddModalOpen}
						setIsModalOpen={setIsAddModalOpen}
						profileId={profileId}
					/>
				</div>
			)}
			{feedbacks?.length > 0 ? (
				<div className="flex flex-col gap-6">
					{feedbacks.map((feedback) => (
						<section key={feedback._id} className="relative">
							<section className="p-2 flex flex-col sm:flex-row gap-2 overflow-x-auto border border-black rounded cursor-default">
								<div className="absolute right-2 -top-4 z-50 p-1 bg-white w-fit h-fit flex gap-2">
									{feedback.feedbackBy._id ===
										currentUser && (
										<>
											<Edit
												className="h-5 w-5 cursor-pointer"
												onClick={showEditModal}
											/>
											<FeedbackModal
												type="edit"
												isModalOpen={isEditModalOpen}
												setIsModalOpen={
													setIsEditModalOpen
												}
												profileId={profileId}
												initialFeedback={{
													_id: feedback._id,
													rating: feedback.rating,
													content: feedback.content,
												}}
											/>
										</>
									)}
									{(credentials === currentUser ||
										feedback.feedbackBy._id ===
											currentUser) && (
										<Delete
											className="h-5 w-5 cursor-pointer"
											onClick={() => {
												Modal.confirm({
													title: "Delete feedback",
													content:
														"Are you sure you want to delete this feedback?",
													okButtonProps: {
														className:
															"text-black border-slate-300",
													},
													onOk: () =>
														handleFeedbackDelete(
															feedback._id
														),
												});
											}}
										/>
									)}
								</div>
								<Link
									href={`/profile/${feedback.feedbackBy._id}`}
									className="flex flex-col min-w-32 my-auto"
								>
									<Image
										src={
											feedback.feedbackBy.avatar ||
											defaultProfile
										}
										alt="User Avatar"
										className="w-14 h-14 sm:w-20 sm:h-20 self-center rounded-full border-2 border-black object-cover"
										width={100}
										height={100}
									/>
									<p className="font-semibold text-center capitalize">
										{feedback.feedbackBy.name}
									</p>
								</Link>
								<div className="overflow-y-auto flex flex-col self-center">
									<Rate
										disabled
										defaultValue={feedback.rating || 1}
										className="custom-rating self-center sm:self-start"
									/>
									<p className="text-sm">
										{feedback.content}
									</p>
								</div>
							</section>
						</section>
					))}
				</div>
			) : (
				<Empty description={<p>No reviews to display</p>} />
			)}
		</>
	);

	const myFeedbackList = (
		<>
			{myFeedbacks?.length > 0 ? (
				<div className="flex flex-col gap-6">
					{myFeedbacks.map((feedback) => (
						<section key={feedback._id} className="relative">
							<section className="p-2 flex flex-col sm:flex-row gap-2 overflow-x-auto border border-black rounded cursor-default">
								<div className="absolute right-2 -top-4 z-50 p-1 bg-white w-fit h-fit flex gap-2">
									<Edit
										className="h-5 w-5 cursor-pointer"
										onClick={showEditModal}
									/>
									<FeedbackModal
										type="edit"
										isModalOpen={isEditModalOpen}
										setIsModalOpen={setIsEditModalOpen}
										profileId={profileId}
										initialFeedback={{
											_id: feedback._id,
											rating: feedback.rating,
											content: feedback.content,
										}}
									/>
									<Delete
										className="h-5 w-5 cursor-pointer"
										onClick={() => {
											handleFeedbackDelete(feedback._id);
										}}
									/>
								</div>
								<Link
									href={`/profile/${feedback.feedbackFor._id}`}
									className="flex flex-col min-w-32 my-auto"
								>
									<Image
										src={
											feedback.feedbackFor.avatar ||
											defaultProfile
										}
										alt="User Avatar"
										className="w-14 h-14 sm:w-20 sm:h-20 self-center rounded-full border-2 border-black object-cover"
										width={100}
										height={100}
									/>
									<p className="font-semibold text-center capitalize">
										{feedback.feedbackFor.name}
									</p>
								</Link>
								<div className="overflow-y-auto flex flex-col self-center">
									<Rate
										disabled
										defaultValue={feedback.rating || 1}
										className="custom-rating self-center sm:self-start"
									/>
									<p className="text-sm">
										{feedback.content}
									</p>
								</div>
							</section>
						</section>
					))}
				</div>
			) : (
				<Empty description={<p>No reviews to display</p>} />
			)}
		</>
	);

	const items = [
		{
			key: "1",
			label: "Received Reviews",
			children: userFeedbackList,
		},
		{
			key: "2",
			label: "My Reviews",
			children: myFeedbackList,
		},
	];

	return credentials === currentUser ? (
		<Tabs defaultActiveKey="1" items={items} />
	) : (
		userFeedbackList
	);
};

const Profile = ({ profileId }) => {
	const router = useRouter();
	const [credentials, setCredentials] = useState(null);
	const [products, setProducts] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const fetchedUser = await axios.get(
					`/api/v1/users/${profileId}`,
					{
						withCredentials: true,
					}
				);
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
				const blockedUsers = await axios.get("/api/v1/block/", {
					withCredentials: true,
				});

				const fetchedUserDetails = fetchedUser?.data?.data;
				const productDetails = products?.data?.data;
				const currentUserDetails = currentUser?.data?.data;
				const feedbackDetails = feedback?.data?.data;
				const blockedUserDetails = blockedUsers?.data?.data;
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
					blockedUsers: blockedUserDetails,
				});
				setProducts(productDetails);
				setCurrentUser(currentUserDetails);
			} catch (error) {
				handleAxiosError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, []);

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
						src="/icons/phone.svg"
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
						src="/icons/mail.svg"
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
					className="p-2 flex gap-2 hover:text-[#101827] border-b border-[#101827]"
				>
					<Image
						src={follower.follower?.avatar || defaultProfile}
						alt="User Avatar"
						className="w-10 h-10 rounded-full border-2 border-black object-cover"
						width={100}
						height={100}
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
					className="p-2 flex gap-2 hover:text-[#101827] border-b border-[#101827]"
				>
					<Image
						src={following.following?.avatar || defaultProfile}
						alt="User Avatar"
						className="w-10 h-10 rounded-full border-2 border-black object-cover"
						width={100}
						height={100}
					/>
					<div className="capitalize self-center">
						{following.following.name}
					</div>
				</Link>
			))}
		</div>
	);

	const blockedUsersContent = (
		<div className="overflow-auto max-h-20 w-48">
			{credentials?.blockedUsers?.length > 0 ? (
				credentials.blockedUsers.map((block) => (
					<div
						key={block._id}
						className="p-2 flex gap-2 hover:text-[#101827] border-b border-[#101827]"
					>
						<Image
							src={block.avatar || defaultProfile}
							alt="User Avatar"
							className="w-10 h-10 rounded-full border-2 border-black object-cover"
							width={100}
							height={100}
						/>
						<div className="flex flex-col">
							<div className="capitalize self-center">
								{block.name}
							</div>
							<button
								className="px-1 w-fit text-xs bg-[#101827] text-white hover:bg-[#101827d9] rounded"
								onClick={() => {
									handleUserUnblock(block._id);
								}}
							>
								Unblock
							</button>
						</div>
					</div>
				))
			) : (
				<Empty
					description={false}
					className="flex justify-center items-center"
					imageStyle={{ height: 60, width: 60 }}
				/>
			)}
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
							<button
								type="button"
								onClick={() => {
									Modal.confirm({
										title: "Delete account",
										content:
											"Once you delete your account, there is no going back. Please be certain.",
										okButtonProps: {
											className:
												"text-black border-slate-300",
										},
										onOk: handleAccountDelete,
									});
								}}
							>
								Delete
							</button>
						),
						danger: true,
					},
			  ]
			: [
					{
						key: "1",
						label: (
							<button
								type="button"
								onClick={() => {
									Modal.confirm({
										title: "Block account",
										okButtonProps: {
											className:
												"text-black border-slate-300",
										},
										onOk: handleAccountBlock,
									});
								}}
							>
								Block
							</button>
						),
						danger: true,
					},
			  ];

	const handleAccountDelete = async () => {
		try {
			await axios.delete("/api/v1/users/", { withCredentials: true });
			router.push("/login");
		} catch (error) {
			handleAxiosError(error);
		}
	};
	const handleAccountBlock = async () => {
		try {
			await axios.patch(`/api/v1/block/${profileId}`, {
				withCredentials: true,
			});
			router.push("/explore");
		} catch (error) {
			handleAxiosError(error);
		}
	};
	const handleUserUnblock = async (userId) => {
		try {
			await axios.delete(`/api/v1/block/${userId}`, {
				withCredentials: true,
			});
		} catch (error) {
			handleAxiosError(error);
		}
	};
	const handleAccountFollow = async () => {
		try {
			credentials?.isFollow
				? await axios.delete(`/api/v1/follow/${credentials._id}`, {
						withCredentials: true,
				  })
				: await axios.post(`/api/v1/follow/${credentials._id}`, {
						withCredentials: true,
				  });
		} catch (error) {
			handleAxiosError(error);
		}
	};

	if (loading) {
		return (
			<section className="container max-w-screen-lg mx-auto pb-12 md:pb-0">
				<section className="relative w-full h-32 bg-neutral-300 animate-pulse">
					<div className="absolute bottom-0 left-1/2 md:left-40 transform -translate-x-1/2 translate-y-1/2 w-40 h-40">
						<Image
							src={defaultProfile}
							alt="User Avatar"
							className="rounded-full border-4 border-black"
							layout="fill"
							objectFit="cover"
						/>
					</div>
				</section>
				<section className="mt-20 md:ml-72 md:mt-0 p-2 flex flex-col gap-2">
					<div className="bg-neutral-400/50 w-2/5 h-4 animate-pulse rounded-md"></div>
					<div className="bg-neutral-400/50 w-1/5 h-4 animate-pulse rounded-md"></div>
					<div className="bg-neutral-400/50 w-full h-12 animate-pulse rounded-md"></div>
					<div className="bg-neutral-400/50 w-1/5 h-4 animate-pulse rounded-md"></div>
				</section>
				<section className="py-2 px-4">
					<div className="flex gap-2">
						<div className="bg-neutral-400/50 w-1/5 h-4 animate-pulse rounded-md"></div>
						<div className="bg-neutral-400/50 w-1/5 h-4 animate-pulse rounded-md"></div>
					</div>
					<hr className="my-4 h-px border-0 bg-black" />
					<div className="bg-neutral-400/50 w-1/5 h-4 animate-pulse rounded-md"></div>
					<section className="max-w-7xl py-4 px-2 grid gap-8 grid-flow-col auto-cols-[70%] min-[450px]:auto-cols-[50%] sm:auto-cols-[30%] overflow-x-auto">
						{Array.from({ length: 3 }).map((_, index) => (
							<div
								key={index}
								className="max-w-xs h-80 bg-neutral-400/50 animate-pulse rounded-xl border-black border"
							></div>
						))}
					</section>
					<hr className="my-4 h-px border-0 bg-black" />
					<div className="bg-neutral-400/50 w-1/5 h-4 animate-pulse rounded-md"></div>
					<section className="mt-6 p-2 flex flex-col sm:flex-row gap-6 relative border border-black rounded">
						<div className="absolute right-2 -top-4 z-50 p-1 bg-white w-fit h-fit flex gap-2">
							<div className="bg-neutral-400/50 w-5 h-5 animate-pulse rounded-md"></div>
							<div className="bg-neutral-400/50 w-5 h-5 animate-pulse rounded-md"></div>
						</div>
						<div className="flex flex-col gap-2 min-w-32 my-auto">
							<Image
								src={defaultProfile}
								alt="User Avatar"
								className="w-14 h-14 sm:w-20 sm:h-20 self-center rounded-full border-2 border-black"
								width={100}
								height={100}
							/>
							<div className="self-center bg-neutral-400/50 w-2/5 sm:w-full h-4 animate-pulse rounded-md"></div>
						</div>
						<div className="flex flex-col gap-2 w-full my-auto">
							<div className="self-center sm:self-start bg-neutral-400/50 w-1/5 h-4 animate-pulse rounded-md"></div>
							<div className="bg-neutral-400/50 w-full h-12 animate-pulse rounded-md"></div>
						</div>
					</section>
				</section>
			</section>
		);
	}

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
							<div className="mt-1 text-xs flex gap-2">
								<Image
									src="/icons/calendar.svg"
									alt="Calendar icon"
									width={12}
									height={12}
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
							src="/icons/menu.svg"
							alt="Menu icon"
							width={24}
							height={24}
							className="cursor-pointer"
						/>
					</Dropdown>
				</section>
				<section className="py-2 px-4">
					{credentials?._id !== currentUser?._id &&
						(credentials?.email || credentials?.phone) && (
							<div className="flex gap-2">
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

								<button
									className="py-1 px-2 bg-[#101827] text-white w-fit rounded"
									onClick={handleAccountFollow}
								>
									{credentials.isFollow
										? "Unfollow"
										: "Follow"}
								</button>
							</div>
						)}
					<section className="flex gap-2">
						{credentials?.followers?.length > 0 && (
							<Popover
								content={followersContent}
								title="People who follow you"
								trigger="hover"
								arrow={false}
								placement="bottomLeft"
								overlayClassName="custom-popover"
							>
								<div className="cursor-pointer">
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
								title="People you follow"
								trigger="hover"
								arrow={false}
								placement="bottomLeft"
								overlayClassName="custom-popover"
							>
								<div className="cursor-pointer">
									<span className="font-semibold">
										{credentials.following.length}
									</span>{" "}
									following
								</div>
							</Popover>
						)}
						{credentials?._id === currentUser?._id && (
							<Popover
								content={blockedUsersContent}
								title="People you have blocked"
								trigger="hover"
								arrow={false}
								placement="bottomLeft"
								overlayClassName="custom-popover"
							>
								<div className="cursor-pointer text">
									<span className="font-semibold">
										{credentials?.blockedUsers?.length}
									</span>{" "}
									blocked
								</div>
							</Popover>
						)}
					</section>
					<hr className="my-2 h-px border-0 bg-black" />
					<div className="font-semibold text-lg">Products</div>
					<ProductTabs
						credentials={credentials?._id}
						currentUser={currentUser?._id}
						products={products}
					/>
					<hr className="my-2 h-px border-0 bg-black" />
					<div className="font-semibold text-lg">Reviews</div>
					<FeedbackTabs
						credentials={credentials?._id}
						currentUser={currentUser?._id}
						profileId={profileId}
					/>
				</section>
			</section>
		</>
	);
};

export default Profile;
