import React, { useEffect, useState } from "react";

import authService from "@/appwrite/auth";
import useUser from "@/context/users/useUser";

import toast, { Toaster } from "react-hot-toast";

const EditProfile = () => {
	const { user, editUser } = useUser();
	const [credentials, setCredentials] = useState({
		userName: "",
		userEmail: "",
		userPhone: "",
	});
	const [formStatus, setFormStatus] = useState("");

	useEffect(() => {
		setCredentials({
			userName: user.userName,
			userEmail: user.userEmail,
			userPhone: user.userPhone,
		});
	}, [user]);

	const onChange = (event) => {
		setCredentials({
			...credentials,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			/*
			 * update user name, email and phone number
			 */
			let sessionPromise = authService.createUserAccount(credentials);

			toast.promise(sessionPromise, {
				loading: "Authenticating...",
				success: "Successfully Authenticated",
				error: "Authentication Error",
			});

			await sessionPromise;
			setCredentials({
				name: "",
				email: "",
				password: "",
			});

			const userDataPromise = authService.getCurrentUser();
			toast.promise(userDataPromise, {
				loading: "Fetching user data",
				success: "Rerouting",
				error: "Error fetching user data",
			});
			await userDataPromise;
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
			<div className=" flex items-center justify-center ">
				<div className="container max-w-screen-lg mx-auto pb-12 md:pb-0">
					<div>
						<form onSubmit={handleSubmit}>
							<div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
								<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
									<div className="text-gray-600">
										<p className="font-medium text-lg">
											Edit Profile
										</p>
										<p>Please fill out all the fields.</p>
										<img
											src="/images/profile/bhuvan.jpg"
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

									<div className="lg:col-span-2">
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
												/>
											</div>

											<div className="md:col-span-3">
												<label className="text-sm text-gray-600 font-bold">
													Email
												</label>
												<input
													type="email"
													name="userEmail"
													className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
													value={
														credentials.userEmail
													}
													placeholder=""
													disabled
												/>
											</div>

											<div className="md:col-span-2">
												<label className="text-sm text-gray-600 font-bold">
													Contact Number
												</label>
												<input
													type="number"
													name="userPhone"
													className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
													value={
														credentials.userPhone
													}
													onChange={onChange}
													placeholder=""
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
