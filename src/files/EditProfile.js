import React, { useState } from "react";

import { useRouter } from "next/navigation";

import useUser from "@/context/users/useUser";
import usePost from "@/context/posts/usePost";

import authService from "@/appwrite/auth";
import userService from "@/appwrite/user";
import postService from "@/appwrite/post";

import toast, { Toaster } from "react-hot-toast";

import Delete from "@/components/icons/Delete";

const EditProfile = () => {
	const router = useRouter();
	const { user, setUser } = useUser();
	const { posts, updatePosts } = usePost();

	const [credentials, setCredentials] = useState({
		profileImageId: user.profileImageId || null,
		profileUrl: user.profileUrl || "/images/defaultProfile.svg",
		userName: user.userName || "",
		userEmail: user.userEmail || "",
	});
	const [userFile, setUserFile] = useState(null);
	const [formStatus, setFormStatus] = useState("");
	const [deleteFunctionCalled, setDeleteFunctionCalled] = useState(false);
	let newCredentials = {};

	const onChange = (event) => {
		setCredentials({
			...credentials,
			[event.target.name]: event.target.value,
		});
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setUserFile(file);
		setCredentials((prev) => ({
			...prev,
			profileUrl: URL.createObjectURL(file),
		}));
	};

	const cancelForm = () => {
		setCredentials({
			profileImageId: user.profileImageId || null,
			profileUrl: user.profileUrl || "/images/defaultProfile.svg",
			userName: user.userName || "",
			userEmail: user.userEmail || "",
		});
		router.push("/home");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const loadingToast = toast.loading("Updating Profile...");
		try {
			await handleFileUpload();

			if (user.userName !== credentials.userName) {
				await authService.updateName(credentials.userName);
				if (posts.length) {
					posts.forEach(async (post) => {
						if (post.tId === user.$id) {
							try {
								updatePosts({ tName: credentials.userName });
								await postService.updatePost(post.$id, {
									tName: credentials.userName,
								});
							} catch (error) {
								console.error(
									"Failed to update post with ID: " + post.$id
								);
								throw error;
							}
						}
					});
				}
				newCredentials = {
					...newCredentials,
					userName: credentials.userName,
				};
			}

			setUser((prev) => ({
				...prev,
				...newCredentials,
			}));

			toast.success("Profile updated!", {
				id: loadingToast,
			});
			setTimeout(() => {
				router.push("/home");
			}, 1000);
			setFormStatus("");
		} catch (error) {
			setFormStatus(error.message);
			toast.error("Error uploading profile", { id: loadingToast });
		}
	};

	const handleFileUpload = async () => {
		if (userFile) {
			const userImageId = Date.now().toString();
			await userService.uploadFile(userImageId, userFile);
			const userImageUrl = userService.getFile(userImageId).href;
			await userService.updateUser(user.$id, userImageId);
			if (credentials.profileImageId)
				await userService.deleteFile(user.profileImageId);

			if (posts.length) {
				updatePosts({ newProfileImageId: userImageId });
				posts.forEach(async (post) => {
					if (post.tId === user.$id) {
						try {
							await postService.updatePost(post.$id, {
								tProfileImageId: userImageId,
								changeProfile: 1,
							});
						} catch (error) {
							console.error(
								"Failed to update post with ID: " + post.$id
							);
							throw error;
						}
					}
				});
			}

			newCredentials = {
				...newCredentials,
				profileImageId: userImageId,
				profileUrl: userImageUrl,
			};
		} else if (user.profileImageId && !userFile && deleteFunctionCalled) {
			setDeleteFunctionCalled(false);
			await userService.deleteFile(user.profileImageId);
			await userService.updateUser(user.$id, null);
			if (posts.length) {
				updatePosts({ newProfileImageId: null });
				posts.forEach(async (post) => {
					if (post.tId === user.$id) {
						try {
							await postService.updatePost(post.$id, {
								tProfileImageId: null,
								changeProfile: 1,
							});
						} catch (error) {
							console.error(
								"Failed to update post with ID: " + post.$id
							);
							throw error;
						}
					}
				});
			}
			setUser((prev) => ({
				...prev,
				profileImageId: null,
				profileUrl: "/images/defaultProfile.svg",
			}));
		}
	};

	const handleDelete = async () => {
		setDeleteFunctionCalled(true);
		try {
			if (userFile) {
				setUserFile(null);
				document.getElementById("profileImageInput").value = "";
			}
			setCredentials({
				...credentials,
				profileImageId: null,
				profileUrl: "/images/defaultProfile.svg",
			});
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
											src={credentials.profileUrl}
											alt="User Profile Image"
											className="w-52 h-52 mt-10 mb-7 rounded-full object-cover"
										/>
										<label className="flex gap-2 items-center justify-start">
											<p>
												Upload new photo (&lt;1000 KB)
											</p>
											<Delete
												className="w-4 h-4 cursor-pointer"
												onClick={handleDelete}
											/>
										</label>
										<input
											type="file"
											id="profileImageInput"
											name="profileImage"
											accept="image/png, image/jpg, image/jpeg, image/svg"
											className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
											onChange={handleFileChange}
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
													<button
														type="button"
														onClick={cancelForm}
														className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
													>
														Cancel Changes
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
