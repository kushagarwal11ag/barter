import React, { useState } from "react";
import { useRouter } from "next/navigation";

import usePost from "@/context/posts/usePost";

import postService from "@/appwrite/post";

const AddProduct = () => {
	const router = useRouter();
	const { posts, addPost } = usePost();
	const [credentials, setCredentials] = useState({
		imageId: "",
		pName: "",
		pCategory: "Accessories",
		// tName: "",
		// tPhone: "",
	});
	const [postFile, setPostFile] = useState(null);
	const [imageURL, setImageURL] = useState("/images/uploadFile.svg");
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
		const postImageId = await postService.uploadFile(postFile);
		const newCredentials = {
			...credentials,
			imageId: postImageId,
		};
		setCredentials(newCredentials);
		addPost(newCredentials);
		router.push("/home");
	};
	

	return (
		<>
			<div className=" flex items-center justify-center">
				<div className="container max-w-screen-lg mx-auto pb-12 md:pb-0">
					<div>
						<form onSubmit={handleSubmit}>
							<div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
								<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
									<div className="text-gray-600">
										<p className="font-medium text-lg">
											Create Post
										</p>
										<p>Please fill out all the fields.</p>
										<img
											src={imageURL}
											alt="current uploaded file"
											className="w-52 h-52 mt-10 mb-7 object-cover"
										/>
										<label className="">
											Upload product image
										</label>
										<input
											type="file"
											name="postImage"
											accept="image/png, image/jpg, image/jpeg, image/webp, image/svg"
											className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
											onChange={handleFileChange}
										/>
									</div>

									<div className="md:col-span-2">
										<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
											<div className="md:col-span-5">
												<label className="text-sm text-gray-600 font-bold">
													Product Title
												</label>
												<input
													type="text"
													name="pName"
													className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
													value={credentials.pName}
													placeholder="Enter product title"
													onChange={onChange}
												/>
											</div>
											<div className="md:col-span-5">
												<label className="text-sm text-gray-600 font-bold">
													Product Category
												</label>
												<select
													className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
													name="pCategory"
													onChange={onChange}
													value={
														credentials.pCategory
													}
												>
													<option value="Accessories">
														Accessories
													</option>
													<option value="Electronics">
														Electronics
													</option>
													<option value="Home & Garden">
														Home & Garden
													</option>
													<option value="Industrial & Scientific">
														Industrial & Scientific
													</option>
													<option value="Toys & Games">
														Toys & Games
													</option>
													<option value="Other">
														Other
													</option>
												</select>
											</div>

											<button
												type="submit"
												className="w-24 md:w-full text-center bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4  inline-flex items-center rounded-full"
											>
												<img
													src="/images/checked-2.png"
													alt=""
													className="fill-current w-4 h-4 mr-2"
												/>
												<span>Post</span>
											</button>
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

export default AddProduct;
