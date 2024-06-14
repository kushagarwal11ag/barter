"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Dropdown, Badge, Popover, Empty } from "antd";
import TimeAgoWrapper from "../fractions/TimeAgoWrapper";

import defaultProfile from "../../../public/defaultProfile.svg";
import Delete from "@/components/icons/Delete.js";

const handleAxiosError = (error) => {
	const errorMessage =
		error.response?.data?.message || "Something went wrong. Try again";
	console.log(errorMessage);
};

const NotificationItem = ({ notification }) => {
	const handleReadToggle = useCallback(async () => {
		try {
			await axios.patch(`/api/v1/notification/${notification._id}`, {
				withCredentials: true,
			});
		} catch (error) {
			handleAxiosError(error);
		}
	}, []);

	const handleDelete = useCallback(async () => {
		try {
			await axios.delete(`/api/v1/notification/${notification._id}`, {
				withCredentials: true,
			});
		} catch (error) {
			handleAxiosError(error);
		}
	}, []);

	const getLinkHref = () => {
		switch (notification.notificationType) {
			case "follow":
				return `/profile/${notification.followedByUser?._id}`;
			case "feedback":
				return `/profile/${notification.user}`;
			default:
				return "#";
		}
	};

	const getAvatarSrc = () => {
		switch (notification.notificationType) {
			case "follow":
				return notification.followedByUser?.avatar || defaultProfile;
			case "feedback":
				return notification.feedbackByUser?.avatar || defaultProfile;
			default:
				return defaultProfile;
		}
	};

	return (
		<section className="flex gap-2 border-b">
			<Link href={getLinkHref()} className="self-center">
				<div className="relative w-12 h-12">
					<Image
						src={getAvatarSrc()}
						alt="User Avatar"
						className="rounded-full border-2 border-black object-cover"
						layout="fill"
						objectFit="cover"
					/>
				</div>
			</Link>
			<section className="p-2 flex flex-col w-full">
				<div className="flex gap-2">
					<div className="flex flex-col gap-2">
						<div
							className={`${
								notification.isRead
									? "font-normal"
									: "font-bold"
							}`}
						>
							{notification.content}
						</div>
						<button
							className="text-xs w-fit"
							onClick={handleReadToggle}
						>
							{notification.isRead ? (
								<div className="flex items-center">
									<Image
										src="/icons/check.svg"
										alt="Icon to mark notification as unread"
										width={20}
										height={20}
									/>
									Mark as unread
								</div>
							) : (
								<div className="flex gap-1">
									<Image
										src="/icons/doubleCheck.svg"
										alt="Icon to mark notification as read"
										width={15}
										height={15}
									/>
									Mark as read
								</div>
							)}
						</button>
					</div>
					<Delete
						className="cursor-pointer w-5 h-5 ml-auto"
						onClick={handleDelete}
					/>
				</div>
				<TimeAgoWrapper
					date={new Date(notification.createdAt)}
					className="mt-1 self-end text-xs"
				/>
			</section>
		</section>
	);
};

const Notifications = () => {
	const [notifications, setNotifications] = useState(null);

	useEffect(() => {
		const fetchNotifications = async () => {
			const getNotification = await axios.get("/api/v1/notification/", {
				withCredentials: true,
			});
			setNotifications(getNotification?.data?.data);
		};
		fetchNotifications();
	}, []);

	const hasUnreadNotifications = notifications?.some(
		(notification) => !notification.isRead
	);

	const content = (
		<div className="h-fit max-h-60 overflow-y-auto">
			{notifications?.length > 0 ? notifications.map((notification) => (
				<NotificationItem
					notification={notification}
					key={notification._id}
				/>
			)) : <Empty description={<p>You&apos;re all caught up.</p>} />}
		</div>
	);

	return (
		<Badge dot={hasUnreadNotifications} size="small">
			<Popover
				content={content}
				title="Notifications"
				trigger="click"
				arrow={false}
			>
				<Image
					src="/icons/notification.svg"
					alt="notification icon"
					width={25}
					height={25}
				/>
			</Popover>
		</Badge>
	);
};

const Navbar = () => {
	const [userDetails, setUserDetails] = useState(defaultProfile);
	const [showMobileNav, setShowMobileNav] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const toggleMobileNav = () => {
		setShowMobileNav(!showMobileNav);
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const user = await axios.get("/api/v1/users/", {
					withCredentials: true,
				});
				if (user?.data?.data) {
					setIsLoggedIn(true);
					const userDetails = user.data.data;
					setUserDetails(userDetails);
				}
			} catch (error) {
				console.log(error);
				setIsLoggedIn(false);
			}
		};

		fetchUser();
	}, []);

	const handleLogout = async () => {
		try {
			await axios.post("/api/v1/users/logout");
			setIsLoggedIn(false);
		} catch (error) {
			console.error(error.message);
		}
	};

	const items = [
		{
			key: "1",
			label: (
				<Link href="/transaction" className="p-2">
					View Transactions
				</Link>
			),
		},
		{
			key: "2",
			label: (
				<Link className="p-2" href={`/profile/${userDetails?._id}`}>
					Profile
				</Link>
			),
		},
		{
			key: "3",
			label: (
				<Link className="p-2" href="/contact">
					Contact Us
				</Link>
			),
		},
		{
			key: "4",
			label: (
				<Link className="p-2" href="/login" onClick={handleLogout}>
					Logout
				</Link>
			),
		},
	];

	return (
		<>
			<div className="navbar_container bg-gray-800 text-white">
				<div className="navbar_div max-w-7xl mx-auto flex justify-between px-5 md:px-12 py-2 items-center">
					<Link className="navbar_left" href="/">
						<Image
							src="/logo.svg"
							alt="logo"
							width={48}
							height={48}
						/>
					</Link>
					<div className="navbar_right">
						<ul className="gap-6 items-center hidden sm:flex">
							{isLoggedIn ? (
								<div className="flex gap-3 items-center">
									<li className="mt-2 border-b-2 border-gray-800 hover:border-indigo-500 cursor-pointer">
										<Notifications />
									</li>
									<li className="py-2 border-b-2 border-gray-800 hover:border-indigo-500">
										<Link href="/explore">Explore</Link>
									</li>
								</div>
							) : (
								<>
									<Link
										href="/login"
										className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-700 cursor-pointer"
									>
										Login
									</Link>
									<Link
										className="px-4 py-2 rounded-lg hover:bg-gray-700"
										href="/signup"
									>
										Signup
									</Link>
								</>
							)}
							{isLoggedIn && (
								<li className="relative">
									<Dropdown
										placement="bottom"
										menu={{
											items,
										}}
									>
										<Image
											src={
												userDetails?.avatar?.url ||
												defaultProfile
											}
											alt="User Avatar"
											className="w-10 h-10 rounded-full object-cover"
											width={44}
											height={44}
										/>
									</Dropdown>
								</li>
							)}
						</ul>
						<Image
							src="/icons/mobileMenu.svg"
							alt="Mobile Navigation icon"
							className="w-7 h-7 flex sm:hidden cursor-pointer"
							width={28}
							height={28}
							onClick={toggleMobileNav}
						/>
					</div>
				</div>
				{showMobileNav && (
					<div className="bg-white text-black fixed top-0 bottom-0 left-0 z-[101] w-full sm:w-72 transition-transform duration-300 ease-in-out transform translate-x-0">
						<div className="flex justify-between items-center px-5 py-3 border-b border-gray-200">
							<h3 className="text-lg font-semibold">Menu</h3>
							<Image
								src="/icons/closeIcon.svg"
								alt="Navigation close icon"
								className="w-6 h-6 cursor-pointer"
								width={10}
								height={10}
								onClick={toggleMobileNav}
							/>
						</div>
						<div className="mobile_nav_links px-5 py-3 ">
							<ul className="flex flex-col gap-8 items-center">
								{isLoggedIn ? (
									<>
										<li>
											<Link
												href="/explore"
												onClick={toggleMobileNav}
											>
												Explore
											</Link>
										</li>
										<li>
											<Link
												href="/transaction"
												onClick={toggleMobileNav}
											>
												View Transactions
											</Link>
										</li>
										<li>
											<Link
												href={`/profile/${userDetails?._id}`}
												onClick={toggleMobileNav}
											>
												Profile
											</Link>
										</li>
										<li>
											<Link
												href="/contact"
												onClick={toggleMobileNav}
											>
												Contact Us
											</Link>
										</li>
										<li>
											<Link
												href="/login"
												onClick={handleLogout}
											>
												Logout
											</Link>
										</li>
									</>
								) : (
									<>
										<li>
											<Link
												href="/login"
												onClick={toggleMobileNav}
											>
												Login
											</Link>
										</li>
										<Link
											href="/signup"
											onClick={toggleMobileNav}
										>
											<button className="bg-gray-900 text-white px-5 py-2 rounded-lg">
												Signup
											</button>
										</Link>
									</>
								)}
							</ul>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Navbar;
