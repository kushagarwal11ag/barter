"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddProduct = () => {
	const router = useRouter();

	const [credentials, setCredentials] = useState({
		title: "",
		description: "",
		condition: "fair",
		category: "Fashion and Accessories",
	});
	const [postFile, setPostFile] = useState(null);
	const [imageURL, setImageURL] = useState("/uploadFile.svg");
	const [formStatus, setFormStatus] = useState("");

	const onChange = (event) => {
		setCredentials({
			...credentials,
			[event.target.name]: event.target.value,
		});
	};
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setPostFile(file);
		setImageURL(URL.createObjectURL(file));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const toastId = toast.loading("Uploading");
		try {
			const formData = new FormData();
			formData.append("title", credentials.title);
			formData.append("description", credentials.description);
			formData.append("condition", credentials.condition);
			formData.append("category", credentials.category);
			if (postFile) {
				formData.append("image", postFile);
			}

			const response = await axios.post(
				"/api/v1/products/product",
				formData,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			toast.success(response?.data?.message, {
				id: toastId,
			});

			setCredentials({
				title: "",
				description: "",
				condition: "fair",
				category: "Fashion and Accessories",
			});
			setFormStatus("");
			router.push("/explore");
		} catch (error) {
			const errorMessage =
				error.response?.data?.message ||
				"Something went wrong. Try again";
			setFormStatus(errorMessage);
			toast.error("Error", {
				id: toastId,
			});
		}
	};

	const cancelForm = () => {
		setCredentials({
			title: "",
			description: "",
			condition: "fair",
			category: "Fashion and Accessories",
		});
		router.push("/explore");
	};

	return (
		<>
			<Toaster />
			<div className="flex items-center justify-center">
				<div className="container max-w-screen-lg mx-auto pb-12 md:pb-0">
					<div>
						<form onSubmit={handleSubmit}>
							<div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
								<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-3">
									<div className="text-gray-600">
										<p className="font-medium text-lg">
											Create Post
										</p>
										<p>Please fill out all the fields.</p>
										<Image
											src={imageURL}
											width={100}
											height={100}
											alt="Post Image"
											className="w-52 h-52 mt-10 mb-7 object-cover"
										/>
										<label>Upload product image</label>
										<input
											type="file"
											name="image"
											accept="image/png, image/jpg, image/jpeg, image/svg"
											className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
											onChange={handleFileChange}
											required
										/>
									</div>

									<div className="md:col-span-2">
										{formStatus && (
											<p className="text-red-500">
												{formStatus}
											</p>
										)}
										<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
											<div className="md:col-span-5">
												<label className="text-sm text-gray-600 font-bold">
													Title
												</label>
												<input
													type="text"
													name="title"
													className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
													value={credentials.title}
													placeholder="Enter product title"
													onChange={onChange}
													maxLength={20}
												/>
											</div>
											<div className="md:col-span-5">
												<label className="text-sm text-gray-600 font-bold">
													Description
												</label>
												<textarea
													rows={2}
													name="description"
													className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
													value={
														credentials.description
													}
													placeholder="Enter product description"
													onChange={onChange}
													minLength={3}
													maxLength={150}
													required
												/>
											</div>
											<div className="md:col-span-2">
												<label className="text-sm text-gray-600 font-bold">
													Condition
												</label>
												<select
													className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
													name="condition"
													onChange={onChange}
													value={
														credentials.condition
													}
												>
													<option value="new">
														New
													</option>
													<option value="fair">
														Fair
													</option>
													<option value="good">
														Good
													</option>
												</select>
											</div>
											<div className="md:col-span-3">
												<label className="text-sm text-gray-600 font-bold">
													Category
												</label>
												<select
													className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
													name="category"
													onChange={onChange}
													value={credentials.category}
												>
													<option value="Fashion and Accessories">
														Fashion and Accessories
													</option>
													<option value="Electronics">
														Electronics
													</option>
													<option value="Appliances">
														Appliances
													</option>
													<option value="Furniture">
														Furniture
													</option>
													<option value="Home Decor">
														Home Decor
													</option>
													<option value="Sports and Fitness">
														Sports and Fitness
													</option>
													<option value="Books and media">
														Books and media
													</option>
													<option value="Toys and Games">
														Toys and Games
													</option>
													<option value="Kitchenware">
														Kitchenware
													</option>
													<option value="Health and Beauty">
														Health and Beauty
													</option>
													<option value="Other">
														Other
													</option>
												</select>
											</div>
										</div>
										<button
											type="submit"
											className="mt-2 mr-2 w-fit text-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 inline-flex items-center gap-2 rounded-full"
										>
											<Image
												src="/checked.png"
												width={100}
												height={100}
												alt="Checked icon"
												className="fill-current w-4 h-4"
											/>
											Post
										</button>
										<button
											type="button"
											onClick={cancelForm}
											className="mt-2 w-fit text-center bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-full"
										>
											Cancel Changes
										</button>
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

export default AddProduct;
