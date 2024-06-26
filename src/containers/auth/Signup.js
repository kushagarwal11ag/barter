"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

import "@/components/Auth.css";

const Signup = () => {
	const router = useRouter();

	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		cPassword: "",
	});
	const [formStatus, setFormStatus] = useState("");

	useEffect(() => {
		setCredentials({
			name: "",
			email: "",
			password: "",
			cPassword: "",
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
		if (credentials.password !== credentials.cPassword) {
			setFormStatus("Passwords must match!");
			return;
		}
		const toastId = toast.loading("Authenticating...");
		try {
			const response = await axios.post("/api/v1/users/register", {
				name: credentials.name,
				email: credentials.email,
				password: credentials.password,
			});

			toast.success(response?.data?.message, {
				id: toastId,
			});

			setCredentials({
				name: "",
				email: "",
				password: "",
				cPassword: "",
			});
			setFormStatus("");
			router.push("/login");
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Something went wrong";
			setFormStatus(errorMessage);
			toast.error("Error", {
				id: toastId,
			});
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
							backgroundImage: "url(/auth.jpg)",
						}}
					>
						<div className="absolute bg-gradient-to-b from-blue-900 to-gray-900 opacity-75 inset-0 z-0"></div>
						<div className="absolute border-l-[25rem] border-l-transparent border-t-[60rem] border-t-white border-solid min-h-screen right-0 w-16"></div>

						<Image
							src="/3d.png"
							width={400}
							height={400}
							className="h-96 absolute right-5 mr-5"
							alt="Image showcasing barter"
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
									Welcome to SwapEase
								</h2>
								<p className="mt-2 text-sm text-gray-500">
									Please create your account
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
										Name
									</label>
									<input
										className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
										type="text"
										name="name"
										value={credentials.name}
										onChange={onChange}
										required
										aria-describedby="name"
										placeholder="Enter your name"
										maxLength={20}
									/>
								</div>

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

								<div className="mt-8 content-center relative">
									<label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
										Confirm Password
									</label>
									<input
										className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
										type="password"
										name="cPassword"
										value={credentials.cPassword}
										onChange={onChange}
										required
										placeholder="Confirm your password"
									/>
								</div>

								<div>
									<button
										className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
										type="submit"
									>
										Join now
									</button>
								</div>

								<p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
									<span>Already have an account?</span>
									<Link
										href="/login"
										className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
									>
										Login
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

export default Signup;
