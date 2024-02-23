import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import authService from "@/appwrite/auth";
import useUser from "@/context/users/useUser";

import toast, { Toaster } from "react-hot-toast";

const EditProfile = () => {
	const router = useRouter();
	const { user, setUser } = useUser();
	const oldCredentials = {
		userName: user.userName || "",
	};
	const [credentials, setCredentials] = useState({
		userName: user.userName || "",
		userEmail: user.userEmail || "",
	});
	const [formStatus, setFormStatus] = useState("");

	const onChange = (event) => {
		setCredentials({
			...credentials,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			console.log("inside EditProfile: user:: ", user);
			if (oldCredentials.userName !== credentials.userName) {
				await toast.promise(
					authService.updateName(credentials.userName),
					{
						loading: "Updating name...",
						success: "Name updated successfully! Rerouting...",
						error: "Failed to update name.",
					}
				);
				setUser((prev) => ({
					...prev,
					userName: credentials.userName,
				}));
				setTimeout(() => router.push("/home"), 2000);
			} else {
				setFormStatus("Name not updated! Make some changes first");
				return;
			}
			setFormStatus("");
		} catch (error) {
			setFormStatus(error.message);
		}
	};

	return (
		<>
			<Toaster />
			<div className=" flex items-center justify-center ">
				<div className="container max-w-screen-lg mx-auto pb-12 md:pb-0">
					<div>
						<form onSubmit={handleSubmit}>
							<div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
								<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-3">
									<div className="text-gray-600">
										<p className="font-medium text-lg">
											Edit Profile
										</p>
										<p>Please fill out all the fields.</p>
										<img
											src="/defaultProfile.svg"
											alt=""
											className="w-52 h-52 mt-10 mb-7 rounded-full object-cover"
										/>
										<label className="">
											Upload new photo
										</label>
										<input
											type="file"
											name="profile_pic"
											className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
											// value=""
										/>
									</div>

									<div className="md:col-span-2">
										{formStatus && (
											<p className="text-[#b42318] border-[#b42318]">
												{formStatus}
											</p>
										)}
										<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
											<div className="md:col-span-5">
												<label className="text-sm text-gray-600 font-bold">
													Name
												</label>
												<input
													type="text"
													name="userName"
													className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
													value={credentials.userName}
													onChange={onChange}
													placeholder="Name"
													maxLength={20}
													required
												/>
											</div>

											<div className="md:col-span-5">
												<label className="text-sm text-gray-600 font-bold">
													Email
												</label>
												<input
													type="email"
													name="userEmail"
													className="w-full mt-2 px-3 py-2 text-black bg-[darkgrey] outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
													value={
														credentials.userEmail
													}
													disabled
												/>
											</div>

											<div className="md:col-span-5 ">
												<div className="inline-flex items-end">
													<button
														className="bg-[#002D74] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
														type="submit"
													>
														Update profile
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditProfile;
