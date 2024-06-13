"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import defaultProfile from "../../../public/defaultProfile.svg";
import uploadFile from "../../../public/uploadFile.svg";

let toastId;
const defaultCredentials = {
	name: "",
	email: "",
	toChangePassword: false,
	oldPassword: "",
	newPassword: "",
	confirmNewPassword: "",
	bio: "",
	phone: "",
	displayEmail: true,
	displayPhone: true,
};

const UserProfile = ({ imageUrl, handleFileChange }) => {
	const bannerStyle = imageUrl?.banner
		? `bg-cover bg-center`
		: "bg-[#468189]";
	const bannerImage = imageUrl?.banner ? `url(${imageUrl.banner})` : "";
	const avatarImage = imageUrl?.avatar || defaultProfile;

	return (
		<section className="relative w-full h-32">
			<div
				className={`absolute inset-0 ${bannerStyle}`}
				style={{ backgroundImage: bannerImage }}
			>
				<div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
					<label className="text-white cursor-pointer">
						Upload Background
						<input
							type="file"
							name="banner"
							accept="image/png, image/jpg, image/jpeg, image/svg"
							className="hidden"
							onChange={handleFileChange}
						/>
					</label>
				</div>
			</div>

			<div className="absolute bottom-0 left-1/2 md:left-40 transform -translate-x-1/2 translate-y-1/2 w-40 h-40 z-20">
				<div className="relative w-full h-full">
					<Image
						src={avatarImage}
						alt="User Avatar"
						className="rounded-full border-4 border-black"
						layout="fill"
						objectFit="cover"
					/>
					<div className="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full">
						<label className="text-white cursor-pointer">
							Upload Avatar
							<input
								type="file"
								name="avatar"
								accept="image/png, image/jpg, image/jpeg, image/svg"
								className="hidden"
								onChange={handleFileChange}
							/>
						</label>
					</div>
				</div>
			</div>
		</section>
	);
};

const EditProfile = () => {
	const router = useRouter();

	const [credentials, setCredentials] = useState(defaultCredentials);
	const [formStatus, setFormStatus] = useState("");
	const [userFile, setUserFile] = useState({
		avatar: null,
		banner: null,
	});
	const [imageUrl, setImageUrl] = useState({
		avatar: defaultProfile,
		banner: uploadFile,
	});

	useEffect(() => {
		const fetchUser = async () => {
			const fetchedUser = await axios.get("/api/v1/users/", {
				withCredentials: true,
			});

			const userDetails = fetchedUser?.data?.data;
			setCredentials({
				...credentials,
				name: userDetails?.name,
				email: userDetails?.email,
				bio: userDetails?.bio,
				phone: userDetails?.phone,
				displayEmail: userDetails?.displayEmail,
				displayPhone: userDetails?.displayPhone,
			});

			setImageUrl((prev) => ({
				...prev,
				avatar: userDetails?.avatar?.url || defaultProfile,
				banner: userDetails?.banner?.url || uploadFile,
			}));
		};
		fetchUser();
	}, []);

	const onChange = (event) => {
		setCredentials({
			...credentials,
			[event.target.name]: event.target.value,
		});
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setUserFile((prev) => ({
			...prev,
			[event.target.name]: file,
		}));
		setImageUrl((prev) => ({
			...prev,
			[event.target.name]: URL.createObjectURL(file),
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		toastId = toast.loading("Updating");
		try {
			const info = await updatePersonalInfo();
			if (!info) return;
			const pwd = await changePassword();
			if (!pwd) return;
			const updateFile = await updateFiles();
			if (!updateFile) return;

			toast.success("Profile updated successfully", {
				id: toastId,
			});

			setCredentials(defaultCredentials);
			setFormStatus("");
			router.push("/explore");
		} catch (error) {
			handleAxiosError(error);
		}
	};

	const updatePersonalInfo = async () => {
		const { name, bio, phone, displayEmail, displayPhone } = credentials;
		try {
			await axios.put(
				"/api/v1/users/",
				{ name, bio, phone, displayEmail, displayPhone },
				{ withCredentials: true }
			);
			return true;
		} catch (error) {
			handleAxiosError(error);
			return false;
		}
	};

	const changePassword = async () => {
		const { oldPassword, newPassword, confirmNewPassword } = credentials;
		if (credentials.toChangePassword && oldPassword && newPassword) {
			if (!confirmNewPassword || newPassword !== confirmNewPassword) {
				setFormStatus("New password mismatch");
				toast.error("Error", {
					id: toastId,
				});
				return false;
			}
			try {
				await axios.patch(
					"/api/v1/users/password",
					{ oldPassword, newPassword },
					{ withCredentials: true }
				);
				return true;
			} catch (error) {
				handleAxiosError(error);
				return false;
			}
		} else if (
			credentials.toChangePassword &&
			(oldPassword || newPassword || confirmNewPassword)
		) {
			setFormStatus("Must fill all password details to update");
			toast.error("Error", {
				id: toastId,
			});
			return false;
		}
		return true;
	};

	const updateFiles = async () => {
		try {
			if (userFile.avatar || userFile.banner) {
				const formData = new FormData();
				if (userFile.avatar) {
					formData.append("avatar", userFile.avatar);
				}
				if (userFile.banner) {
					formData.append("banner", userFile.banner);
				}
				await axios.patch("/api/v1/users/", formData, {
					withCredentials: true,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
			}
			return true;
		} catch (error) {
			handleAxiosError(error);
			return false;
		}
	};

	const handleAxiosError = (error) => {
		const errorMessage =
			error.response?.data?.message || "Something went wrong. Try again";
		setFormStatus(errorMessage);
		toast.error("Error", {
			id: toastId,
		});
	};

	const cancelForm = () => {
		setCredentials(defaultCredentials);
		setImageUrl({
			avatar: defaultProfile,
			banner: uploadFile,
		});
		router.push("/explore");
	};

	return (
		<>
			<Toaster />
			<section className="container max-w-screen-lg mx-auto pb-12 md:pb-0">
				<form onSubmit={handleSubmit}>
					<UserProfile
						imageUrl={imageUrl}
						handleFileChange={handleFileChange}
					/>

					<section className="mt-20 p-2">
						{formStatus && (
							<p className="text-red-500">{formStatus}</p>
						)}
						<section className="grid gap-4 gap-y-2 text-sm grid-cols-1 sm:grid-cols-5">
							<div className="sm:col-span-2">
								<label className="text-sm text-gray-600 font-bold">
									Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									name="name"
									className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
									value={credentials.name}
									onChange={onChange}
									placeholder="Name"
									minLength={3}
									maxLength={20}
									required
								/>
							</div>

							<div className="sm:col-span-2">
								<label className="text-sm text-gray-600 font-bold">
									Email
								</label>
								<p className="w-full mt-2 px-3 py-2 text-black bg-[darkgrey] outline-none border-2 border-[darkgrey] shadow-sm rounded-lg">
									{credentials.email || "example@mail.com"}
								</p>
							</div>

							<div className="sm:col-span-1">
								<label className="text-sm text-gray-600 font-bold">
									Phone{" "}
									<span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									name="phone"
									className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
									value={credentials.phone}
									onChange={onChange}
									placeholder="Enter phone number"
									maxLength={10}
									required
								/>
							</div>

							<div className="sm:col-span-5">
								<label className="text-sm text-gray-600 font-bold">
									Bio <span className="text-red-500">*</span>
								</label>
								<textarea
									name="bio"
									className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
									placeholder="Enter bio"
									rows={2}
									value={credentials.bio}
									onChange={onChange}
									minLength={10}
									maxLength={300}
									required
								/>
							</div>

							<div className="sm:col-span-5 flex gap-2 w-fit h-fit">
								<label className="relative flex cursor-pointer p-1 rounded-md">
									<input
										type="checkbox"
										name="toChangePassword"
										checked={credentials.toChangePassword}
										onChange={() => {
											setCredentials((prev) => ({
												...prev,
												toChangePassword:
													!credentials.toChangePassword,
											}));
										}}
										className="peer cursor-pointer appearance-none relative h-5 w-5 bg-white border border-gray-600 transition-all checked:border-indigo-600 checked:bg-white rounded-md"
									/>
									<div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-indigo-600 opacity-0 transition-opacity peer-checked:opacity-100">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-3.5 w-3.5"
											viewBox="0 0 20 20"
											fill="currentColor"
											stroke="currentColor"
											strokeWidth="1"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											></path>
										</svg>
									</div>
								</label>
								<label className="my-auto text-sm text-gray-600">
									Change password
								</label>
							</div>

							{credentials?.toChangePassword && (
								<div className="sm:col-span-5">
									<label className="text-sm text-gray-600 font-bold">
										Change password
									</label>
									<section className="sm:flex gap-2">
										<input
											type="password"
											name="oldPassword"
											className="mt-2 w-full px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
											value={credentials.oldPassword}
											onChange={onChange}
											placeholder="Enter old password"
											minLength={8}
											maxLength={20}
										/>
										<input
											type="password"
											name="newPassword"
											className="mt-2 w-full px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
											value={credentials.newPassword}
											onChange={onChange}
											placeholder="Enter new password"
											minLength={8}
											maxLength={20}
										/>
										<input
											type="password"
											name="confirmNewPassword"
											className="mt-2 w-full px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
											value={
												credentials.confirmNewPassword
											}
											onChange={onChange}
											placeholder="Confirm new password"
											minLength={8}
											maxLength={20}
										/>
									</section>
								</div>
							)}

							<div className="sm:col-span-5 flex gap-2 w-fit h-fit">
								<label className="relative flex cursor-pointer p-1 rounded-md">
									<input
										type="checkbox"
										name="displayEmail"
										checked={credentials?.displayEmail}
										onChange={() => {
											setCredentials((prev) => ({
												...prev,
												displayEmail:
													!credentials.displayEmail,
											}));
										}}
										className="peer cursor-pointer appearance-none relative h-5 w-5 bg-white border border-gray-600 transition-all checked:border-indigo-600 checked:bg-white rounded-md"
									/>
									<div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-indigo-600 opacity-0 transition-opacity peer-checked:opacity-100">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-3.5 w-3.5"
											viewBox="0 0 20 20"
											fill="currentColor"
											stroke="currentColor"
											strokeWidth="1"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											></path>
										</svg>
									</div>
								</label>
								<label className="my-auto text-sm text-gray-600">
									Display Email
								</label>
							</div>

							<div className="sm:col-span-5 flex gap-2 w-fit h-fit">
								<label className="relative flex cursor-pointer p-1 rounded-md">
									<input
										type="checkbox"
										name="displayPhone"
										checked={credentials?.displayPhone}
										onChange={() => {
											setCredentials((prev) => ({
												...prev,
												displayPhone:
													!credentials.displayPhone,
											}));
										}}
										className="peer cursor-pointer appearance-none relative h-5 w-5 bg-white border border-gray-600 transition-all checked:border-indigo-600 checked:bg-white rounded-md"
									/>
									<div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-indigo-600 opacity-0 transition-opacity peer-checked:opacity-100">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-3.5 w-3.5"
											viewBox="0 0 20 20"
											fill="currentColor"
											stroke="currentColor"
											strokeWidth="1"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											></path>
										</svg>
									</div>
								</label>
								<label className="my-auto text-sm text-gray-600">
									Display Phone
								</label>
							</div>

							<div className="sm:col-span-5 inline-flex items-end">
								<button
									className="bg-[#002D74] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									type="submit"
								>
									Update profile
								</button>
								<button
									type="button"
									onClick={cancelForm}
									className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
								>
									Cancel Changes
								</button>
							</div>
						</section>
					</section>
				</form>
			</section>
		</>
	);
};

export default EditProfile;
