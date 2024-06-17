"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import uploadFile from "../../../public/uploadFile.svg";

const defaultCredentials = {
	description: "",
	barterCategory: "",
	barterDescription: "",
	price: 0,
	meetingSpot: "",
	isAvailable: true,
};

const EditProduct = ({ productId }) => {
	const router = useRouter();

	const [credentials, setCredentials] = useState(defaultCredentials);
	const [postFile, setPostFile] = useState(null);
	const [imageURL, setImageURL] = useState(uploadFile);
	const [formStatus, setFormStatus] = useState("");

	useEffect(() => {
		const fetchProduct = async () => {
			const fetchedProduct = await axios.get(
				`/api/v1/products/${productId}`,
				{
					withCredentials: true,
				}
			);

			const productDetails = fetchedProduct?.data?.data;

			setCredentials({
				title: productDetails.title,
				category: productDetails.category,
				condition: productDetails.condition,
				isBarter: productDetails.isBarter,
				description: productDetails.description || "",
				barterCategory: productDetails.barterCategory || "",
				barterDescription: productDetails.barterDescription || "",
				price: productDetails.price || 0,
				meetingSpot: productDetails.meetingSpot || "",
				isAvailable: productDetails.isAvailable,
			});

			setImageURL(productDetails.image);
		};
		fetchProduct();
	}, []);

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
		const toastId = toast.loading("Editing");
		try {
			const formData = new FormData();
			formData.append("description", credentials.description);
			credentials.isBarter &&
				formData.append("barterCategory", credentials.barterCategory);
			credentials.isBarter &&
				formData.append(
					"barterDescription",
					credentials.barterDescription
				);
			formData.append("price", credentials.price);
			formData.append("meetingSpot", credentials.meetingSpot);
			formData.append("isAvailable", credentials.isAvailable);
			if (postFile) {
				formData.append("image", postFile);
			}

			const response = await axios.patch(
				`/api/v1/products/${productId}`,
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

			setCredentials(defaultCredentials);
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
		setCredentials(defaultCredentials);
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
											Edit Post
										</p>
										<p>Please fill out all the fields.</p>
										<Image
											src={imageURL || uploadFile}
											width={100}
											height={100}
											alt="Product Image"
											className="w-52 h-52 mt-10 mb-7 object-contain"
										/>
										<label>Upload product image</label>
										<input
											type="file"
											name="postImage"
											accept="image/png, image/jpg, image/jpeg, image/svg"
											className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
											onChange={handleFileChange}
										/>
									</div>

									<div className="md:col-span-2">
										{formStatus && (
											<p className="text-red-500">
												{formStatus}
											</p>
										)}
										<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 sm:grid-cols-5">
											<div className="sm:col-span-3">
												<label className="text-sm text-gray-600 font-bold">
													Title
												</label>
												<p
													className="w-full mt-2 px-3 py-2 text-black bg-[darkgrey] outline-none border-2 border-[darkgrey] shadow-sm rounded-lg"
													disabled
												>
													{credentials.title ||
														"Title"}
												</p>
											</div>

											<div className="sm:col-span-2">
												<label className="text-sm text-gray-600 font-bold">
													Category
												</label>
												<p className="w-full mt-2 px-3 py-2 text-black bg-[darkgrey] outline-none border-2 border-[darkgrey] shadow-sm rounded-lg">
													{credentials.category ||
														"Category"}
												</p>
											</div>

											<div className="sm:col-span-5">
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
													minLength={10}
													maxLength={150}
													required
												/>
											</div>

											{credentials.isBarter && (
												<>
													<div className="sm:col-span-2">
														<label className="text-sm text-gray-600 font-bold">
															Barter Category
														</label>
														<input
															name="barterCategory"
															className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
															value={
																credentials.barterCategory
															}
															placeholder="Enter barter category"
															onChange={onChange}
															minLength={3}
															maxLength={30}
														/>
													</div>

													<div className="sm:col-span-3">
														<label className="text-sm text-gray-600 font-bold">
															Barter Description
														</label>
														<textarea
															rows={1}
															name="barterDescription"
															className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
															value={
																credentials.barterDescription
															}
															placeholder="Enter barter description"
															onChange={onChange}
															minLength={10}
															maxLength={150}
														/>
													</div>
												</>
											)}

											<div className="sm:col-span-1">
												<label className="text-sm text-gray-600 font-bold">
													Condition
												</label>
												<p className="w-full mt-2 px-3 py-2 text-black bg-[darkgrey] outline-none border-2 border-[darkgrey] shadow-sm rounded-lg">
													{credentials.condition ||
														"Condition"}
												</p>
											</div>

											<div className="sm:col-span-1">
												<label className="text-sm text-gray-600 font-bold">
													Price
												</label>
												<input
													type="number"
													name="price"
													className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
													value={credentials.price}
													placeholder="Enter price"
													onChange={onChange}
													min={
														credentials.isBarter
															? 0
															: 1
													}
												/>
											</div>

											<div className="sm:col-span-3">
												<label className="text-sm text-gray-600 font-bold">
													Meeting Spot
												</label>
												<textarea
													rows={1}
													name="meetingSpot"
													className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
													value={
														credentials.meetingSpot
													}
													placeholder="Enter meeting spot"
													onChange={onChange}
													minLength={10}
													maxLength={150}
													required
												/>
											</div>

											<div className="sm:col-span-5 flex gap-2 w-fit h-fit">
												<label className="relative flex cursor-pointer p-1 rounded-md">
													<input
														type="checkbox"
														name="isAvailable"
														checked={
															credentials?.isAvailable
														}
														onChange={() => {
															setCredentials(
																(prev) => ({
																	...prev,
																	isAvailable:
																		!credentials.isAvailable,
																})
															);
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
													Change product availability
												</label>
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

export default EditProduct;
