"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import defaultProfile from "../../../public/defaultProfile.svg";

let toastId;
const defaultCredentials = {
	name: "",
	email: "",
	oldPassword: "",
	newPassword: "",
	confirmNewPassword: "",
	bio: "",
	phone: "",
	displayEmail: true,
	displayPhone: true,
};

const Profile = () => {
	const router = useRouter();

	const [credentials, setCredentials] = useState(defaultCredentials);
	const [formStatus, setFormStatus] = useState("");
	const [userFile, setUserFile] = useState(null);
	const [imageUrl, setImageUrl] = useState(defaultProfile);

	useEffect(() => {
		const fetchUser = async () => {
			const fetchedUser = await axios.get("/api/v1/users/", {
				withCredentials: true,
			});

			const userDetails = fetchedUser?.data?.data;
			setCredentials({
				...credentials,
				name: userDetails?.name || "",
				email: userDetails?.email,
				bio: userDetails?.bio || "",
				phone: userDetails?.phone || "",
			});

			setImageUrl(userDetails.avatar?.url || defaultProfile);
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
		setUserFile(file);
		setImageUrl(URL.createObjectURL(file));
	};

	const cancelForm = () => {
		setCredentials(defaultCredentials);
		router.push("/explore");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		toastId = toast.loading("Updating");
		try {
			const info = await updatePersonalInfo();
			if (!info) return;
			const updateFile = await updateFiles();
			if (!updateFile) return;

			toast.success("Profile updated successfully", {
				id: toastId,
			});

			setCredentials(defaultCredentials);
			setUserFile(null);
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
				"/api/v1/users/user/",
				{ name, bio, phone, displayEmail, displayPhone },
				{ withCredentials: true }
			);
			return true;
		} catch (error) {
			handleAxiosError(error);
			return false;
		}
	};

	const updateFiles = async () => {
		try {
			if (userFile) {
				const formData = new FormData();
				formData.append("avatar", userFile);
				await axios.patch("/api/v1/users/user/", formData, {
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

	return (
		<>
			<Toaster />
			<section className="flex items-center justify-center container max-w-screen-lg mx-auto pb-12 md:pb-0">
				<form onSubmit={handleSubmit}>
					<section className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-3">
						<section className="text-gray-600 flex flex-col items-center">
							<p className="font-medium text-lg">Edit Profile</p>
							<p>Please fill out all the fields.</p>
							<Image
								name="avatar"
								src={imageUrl}
								alt="User Profile Image"
								width={200}
								height={200}
								className="w-52 h-52 m-7 rounded-full object-cover object-contain"
							/>
							<label className="flex gap-2 items-center justify-start">
								<p>Upload Avatar</p>
							</label>
							<input
								type="file"
								name="avatar"
								accept="image/png, image/jpg, image/jpeg, image/svg"
								className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
								onChange={handleFileChange}
							/>
						</section>

						<section className="md:col-span-2">
							{formStatus && (
								<p className="text-red-500">{formStatus}</p>
							)}
							<section className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
								<div className="md:col-span-3">
									<label className="text-sm text-gray-600 font-bold">
										Name{" "}
										<span className="text-red-500">*</span>
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

								<div className="md:col-span-2">
									<label className="text-sm text-gray-600 font-bold">
										Email
									</label>
									<p className="w-full mt-2 px-3 py-2 text-black bg-[darkgrey] outline-none border-2 border-[darkgrey] shadow-sm rounded-lg">
										{credentials.email || "example@mail.com"}
									</p>
								</div>

								<div className="md:col-span-3">
									<label className="text-sm text-gray-600 font-bold">
										Bio
									</label>
									<textarea
										name="bio"
										className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
										placeholder="Enter bio"
										rows={1}
										value={credentials.bio}
										onChange={onChange}
										minLength={10}
										maxLength={300}
									/>
								</div>

								<div className="md:col-span-5">
									<label className="text-sm text-gray-600 font-bold">
										Change password
									</label>
									<section className="flex gap-2">
										<input
											type="password"
											name="oldPassword"
											className="mt-2 w-full px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-[#3a8358] shadow-sm rounded-lg"
											value={credentials.oldPassword}
											onChange={onChange}
											placeholder="Enter old password"
											minLength={8}
											maxLength={20}
										/>
										<input
											type="password"
											name="newPassword"
											className="mt-2 w-full px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-[#3a8358] shadow-sm rounded-lg"
											value={credentials.newPassword}
											onChange={onChange}
											placeholder="Enter new password"
											minLength={8}
											maxLength={20}
										/>
										<input
											type="password"
											name="confirmNewPassword"
											className="mt-2 w-full px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-[#3a8358] shadow-sm rounded-lg"
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

								<div className="md:col-span-2">
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

								<div className="md:col-span-2">
									<label className="text-sm text-gray-600 font-bold">
										Display Email
									</label>
									<select
										className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
										name="displayEmail"
										defaultValue={credentials.displayEmail}
										onChange={(e) => {
											setCredentials({
												...credentials,
												displayEmail: JSON.parse(
													e.target.value
												),
											});
										}}
									>
										<option value={true}>True</option>
										<option value={false}>False</option>
									</select>
								</div>

								<div className="md:col-span-2">
									<label className="text-sm text-gray-600 font-bold">
										Display Phone
									</label>
									<select
										className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
										name="displayPhone"
										defaultValue={credentials.displayPhone}
										onChange={(e) => {
											setCredentials({
												...credentials,
												displayPhone: JSON.parse(
													e.target.value
												),
											});
										}}
									>
										<option value={true}>True</option>
										<option value={false}>False</option>
									</select>
								</div>

								<div className="md:col-span-5 inline-flex items-end">
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
					</section>
				</form>
			</section>
		</>
	);
};

export default Profile;
