"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import {
	Popover,
	Modal,
	Rate,
	Form,
	Input,
	Dropdown,
	Empty,
	Button,
} from "antd";

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

const FeedbackModal = ({
	type = "add",
	isModalOpen,
	setIsModalOpen,
	initialFeedback,
	profileId,
}) => {
	const [form] = Form.useForm();
	const [confirmLoading, setConfirmLoading] = useState(false);

	const handleFeedbackAdd = async (values) => {
		setConfirmLoading(true);
		try {
			await axios.post(
				`/api/v1/feedback/user/${profileId}`,
				{ rating: values.rating, content: values.review },
				{
					withCredentials: true,
				}
			);
			setConfirmLoading(false);
			setIsModalOpen(false);
		} catch (error) {
			setIsModalOpen(false);
			handleAxiosError(error);
		}
	};
	const handleEditFeedback = async (values) => {
		setConfirmLoading(true);
		try {
			await axios.patch(
				`/api/v1/feedback/${initialFeedback._id}`,
				{ rating: values.rating, content: values.review },
				{
					withCredentials: true,
				}
			);
			setConfirmLoading(false);
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

	const handleAxiosError = (error) => {
		const errorMessage =
			error.response?.data?.message || "Something went wrong. Try again";
		console.log(errorMessage);
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
					<Button
						onClick={handleFeedbackModalCancel}
						style={{
							backgroundColor: "#ef4444",
							color: "#fff",
							borderColor: "#fff",
						}}
						onMouseEnter={(e) =>
							(e.target.style.backgroundColor = "#b91c1c")
						}
						onMouseLeave={(e) =>
							(e.target.style.backgroundColor = "#ef4444")
						}
					>
						Cancel
					</Button>
					<Button
						htmlType="submit"
						style={{
							backgroundColor: "#3b82f6",
							color: "#fff",
							borderColor: "#fff",
						}}
						onMouseEnter={(e) =>
							(e.target.style.backgroundColor = "#1e40af")
						}
						onMouseLeave={(e) =>
							(e.target.style.backgroundColor = "#3b82f6")
						}
						loading={confirmLoading}
					>
						Submit
					</Button>
				</div>
			</Form>
		</Modal>
	);
};

const Feedbacks = ({ credentials, currentUser, profileId }) => {
	const [feedbacks, setFeedbacks] = useState(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	useEffect(() => {
		const fetchFeedbacks = async () => {
			try {
				const feedback = await axios.get(
					`/api/v1/feedback/user/${profileId}`
				);
				setFeedbacks(feedback?.data?.data);
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
	const handleAxiosError = (error) => {
		const errorMessage =
			error.response?.data?.message || "Something went wrong. Try again";
		console.log(errorMessage);
	};

	return (
		<>
			{credentials !== currentUser && (
				<div className="flex">
					<button
						type="button"
						className="ml-auto px-2 border-black border rounded"
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
				<>
					<span className="font-semibold text-lg">Reviews</span>
					{feedbacks.map((feedback) => (
						<section key={feedback._id} className="relative">
							<section className="p-2 mt-6 flex flex-col sm:flex-row gap-2 overflow-x-auto border border-black rounded cursor-default">
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
												handleFeedbackDelete(
													feedback._id
												);
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
				</>
			) : (
				<Empty description={<p>No reviews to display</p>} />
			)}
		</>
	);
};

const Profile = ({ profileId }) => {
	const router = useRouter();
	const [credentials, setCredentials] = useState(null);
	const [products, setProducts] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);

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
			} catch (error) {
				handleAxiosError(error);
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
	const handleAccountFollow = async () => {
		try {
			credentials?.isFollow
				? await axios.post(`/api/v1/follow/${credentials._id}`, {
						withCredentials: true,
				  })
				: await axios.delete(`/api/v1/follow/${credentials._id}`, {
						withCredentials: true,
				  });
		} catch (error) {
			handleAxiosError(error);
		}
	};

	const handleAxiosError = (error) => {
		const errorMessage =
			error.response?.data?.message || "Something went wrong. Try again";
		console.log(errorMessage);
	};

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
									src="/icons/calendar.svg"
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
							src="/icons/menu.svg"
							alt="Menu icon"
							width={24}
							height={24}
							className="cursor-pointer"
						/>
					</Dropdown>
				</section>
				<section className="py-2 px-4">
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
								onClick={handleAccountFollow}
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
						<>
							<span className="font-semibold text-lg">
								Products
							</span>
							<section className="max-w-7xl py-4 grid gap-8 grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
								{products.products?.map((product) => (
									<Link
										key={product._id}
										href={`/product/${product._id}`}
										className="relative max-w-xs shadow-md duration-500 hover:scale-105 hover:shadow-xl overflow-hidden h-80"
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
						</>
					) : (
						<Empty
							description={<p>No products to display</p>}
							className="my-5"
						>
							{credentials?._id === currentUser?._id && (
								<Link
									href="/product/add"
									className="p-2 bg-[#101827] text-white rounded"
								>
									Create Now
								</Link>
							)}
						</Empty>
					)}
					<hr className="my-2 h-px border-0 bg-black" />
					{credentials?._id && currentUser?._id && (
						<Feedbacks
							credentials={credentials._id}
							currentUser={currentUser._id}
							profileId={profileId}
						/>
					)}
				</section>
			</section>
		</>
	);
};

export default Profile;
