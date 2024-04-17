"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Dropdown } from "antd";

import logoImg from "../../../public/logo.svg";
import menuImg from "../../../public/icons/mobileMenu.svg";
import closeIcon from "../../../public/icons/closeIcon.svg";
import defaultProfile from "../../../public/defaultProfile.svg";

const Navbar = () => {
	const [userAvatar, setUserAvatar] = useState(defaultProfile);
	const [showMobileNav, setShowMobileNav] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const toggleMobileNav = () => {
		setShowMobileNav(!showMobileNav);
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const user = await axios.get("/api/v1/users/user", {
					withCredentials: true,
				});
				if (user?.data?.data) {
					setIsLoggedIn(true);
					const userDetails = user.data.data;
					setUserAvatar(userDetails?.avatar?.url || defaultProfile);
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
				<Link href="/product/add" className="p-2">
					Add Product
				</Link>
			),
		},
		{
			key: "2",
			label: (
				<Link className="p-2" href="/profile">
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
							src={logoImg}
							alt="logo"
							width={48}
							height={48}
							className="w-10 md:w-12"
						/>
					</Link>
					<div className="navbar_right">
						<ul className="gap-4 items-center hidden md:flex">
							{isLoggedIn ? (
								<>
									<li className="hover:text-indigo-400">
										<Link href="/explore">Explore</Link>
									</li>
								</>
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
											src={userAvatar}
											alt="user profile image"
											className="w-10 h-10 rounded-full object-cover"
											width={44}
											height={44}
										/>
									</Dropdown>
								</li>
							)}
						</ul>
						<Image
							src={menuImg}
							alt="mobile navigation"
							className="w-7 h-7 flex md:hidden cursor-pointer"
							width={28}
							height={28}
							onClick={toggleMobileNav}
						/>
					</div>
				</div>
				{showMobileNav && (
					<div className="mobile_nav bg-white text-black fixed top-0 bottom-0 left-0 z-[101] w-full md:w-72 transition-transform duration-300 ease-in-out transform translate-x-0">
						<div className="mobile_nav_header flex justify-between items-center px-5 py-3 border-b border-gray-200">
							<h3 className="text-lg font-semibold">Menu</h3>
							<Image
								src={closeIcon}
								alt="close icon"
								className="w-6 h-6 cursor-pointer"
								onClick={toggleMobileNav}
							/>
						</div>
						<div className="mobile_nav_links px-5 py-3 ">
							<ul className="flex flex-col gap-8 items-center ">
								{isLoggedIn ? (
									<>
										<li>
											<Link
												href="/"
												onClick={toggleMobileNav}
											>
												Home
											</Link>
										</li>
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
