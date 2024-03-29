"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import toast, { Toaster } from "react-hot-toast";

import authService from "@/appwrite/auth";
import userService from "@/appwrite/user";
import useAuth from "@/context/auth/useAuth";
import useUser from "@/context/users/useUser";

import "@/components/Auth.css";

const Login = () => {
	const router = useRouter();
	const { setAuthStatus } = useAuth();
	const { user, setUser } = useUser();

	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const [formStatus, setFormStatus] = useState("");

	useEffect(() => {
		setCredentials({
			email: "",
			password: "",
		});
	}, [formStatus]);

	const onChange = (event) => {
		setCredentials({
			...credentials,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await toast.promise(authService.login(credentials), {
				loading: "Authenticating...",
				success: "Successfully Authenticated",
				error: "Authentication Error",
			});

			setCredentials({
				email: "",
				password: "",
			});

			const userData = await toast.promise(authService.getCurrentUser(), {
				loading: "Fetching user data",
				success: "Rerouting",
				error: "Error fetching user data",
			});

			const profileId = await userService.getUser(userData.$id);
			let profileUrl = null;
			if (profileId.profileImageId) {
				profileUrl = userService.getFile(profileId.profileImageId).href;
			}

			setUser({
				$id: userData.$id || "",
				profileImageId: profileId.profileImageId || null,
				profileUrl: profileUrl || "/images/defaultProfile.svg",
				userName: userData.name || "",
				userEmail: userData.email || "",
			});

			setFormStatus("");
			setAuthStatus(true);
			router.push("/home");
		} catch (error) {
			setFormStatus(error.message);
		}
	};

	return (
		<>
			<Toaster />
			<div className="relative min-h-screen flex ">
				<div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
					<div
						className="sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto items-center justify-start p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
						style={{
							backgroundImage: "url(/images/auth.jpg)",
						}}
					>
						<div className="absolute bg-gradient-to-b from-blue-900 to-gray-900 opacity-75 inset-0 z-0"></div>
						<div className="absolute border-l-[25rem] border-l-transparent border-t-[60rem] border-t-white border-solid min-h-screen right-0 w-16"></div>

						<div className="flex absolute top-5 text-center text-gray-100 focus:outline-none">
							<img
								src="logo.png"
								alt="Swap Ease logo"
								className="h-8 w-auto"
							/>
						</div>

						<img
							src="/images/3d.png"
							className="h-96 absolute right-5 mr-5"
							alt="Main image"
						/>

						<ul className="circles">
							<li className="circle circle-1"></li>
							<li className="circle circle-2"></li>
							<li className="circle circle-3"></li>
							<li className="circle circle-4"></li>
							<li className="circle circle-5"></li>
							<li className="circle circle-6"></li>
							<li className="circle circle-7"></li>
							<li className="circle circle-8"></li>
							<li className="circle circle-9"></li>
							<li className="circle circle-10"></li>
						</ul>
					</div>
					<div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full  xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white ">
						<div className="max-w-md w-full space-y-8">
							<div className="text-center">
								<h2 className="mt-6 text-3xl font-bold text-gray-900">
									Welcome Back!
								</h2>
								<p className="mt-2 text-sm text-gray-500">
									Please sign in your account
								</p>
							</div>

							<form
								className="mt-8 space-y-6"
								onSubmit={handleSubmit}
							>
								{formStatus && (
									<p className="text-[#b42318] border-[#b42318]">
										{formStatus}
									</p>
								)}
								<div className="relative">
									<label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
										Email
									</label>
									<input
										className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
										type="email"
										name="email"
										value={credentials.email}
										onChange={onChange}
										required
										aria-describedby="email"
										placeholder="Enter email"
									/>
								</div>

								<div className="mt-8 content-center relative">
									<label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
										Password
									</label>
									<input
										className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
										type="password"
										name="password"
										value={credentials.password}
										onChange={onChange}
										required
										placeholder="Enter your password"
									/>
								</div>

								<div>
									<button
										className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
										type="submit"
									>
										Sign in
									</button>
								</div>

								<p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
									<span>Don&apos;t have an account? </span>
									<Link
										href="/signup"
										className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
									>
										Sign up
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
