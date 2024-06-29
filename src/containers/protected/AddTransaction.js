"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Rate } from "antd";
import toast, { Toaster } from "react-hot-toast";

import defaultProfile from "../../../public/defaultProfile.svg";
import uploadFile from "../../../public/uploadFile.svg";

let toastId;

const AddTransaction = ({ productId: productRequestedId }) => {
	const router = useRouter();

	const [productRequested, setProductRequested] = useState(null);
	const [productOfferedId, setProductOfferedId] = useState("");
	const [productOffered, setProductOffered] = useState(null);
	const [myProducts, setMyProducts] = useState([]);
	const [formStatus, setFormStatus] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const productRequestedDetails =
					await getProductRequestedDetails();
				await fetchUser(productRequestedDetails);
			} catch (error) {
				handleAxiosError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const fetchUser = async (productRequested) => {
		try {
			const fetchedUser = await axios.get("/api/v1/users/", {
				withCredentials: true,
			});
			const userDetails = fetchedUser?.data?.data;
			await getMyProducts(userDetails?._id, productRequested);
		} catch (error) {
			setCurrentUser(null);
			handleAxiosError(error);
		}
	};

	const getProductRequestedDetails = async () => {
		try {
			const requestedProduct = await axios.get(
				`/api/v1/products/${productRequestedId}`,
				{ withCredentials: true }
			);
			const productRequestedDetails = requestedProduct?.data?.data;
			setProductRequested(productRequestedDetails);
			if (!productRequestedDetails.isBarter) {
				router.push("/explore");
			}
			return productRequestedDetails;
		} catch (error) {
			handleAxiosError(error);
		}
	};

	const getMyProducts = async (userId, productRequested) => {
		if (!userId) return;
		try {
			const res = await axios.get(`/api/v1/products/user/${userId}`, {
				withCredentials: true,
			});
			const productData = res?.data?.data;
			const filteredProducts = productData.filter((product) => {
				if (productRequested?.isBarter)
					return product.isBarter && product.isAvailable;
			});
			setMyProducts(filteredProducts);
		} catch (error) {
			handleAxiosError(error);
		}
	};

	const getProductOfferedDetails = async (productOfferedId) => {
		try {
			const offeredProduct = await axios.get(
				`/api/v1/products/${productOfferedId}`,
				{ withCredentials: true }
			);
			const productOfferedDetails = offeredProduct?.data?.data;
			setProductOffered(productOfferedDetails);
		} catch (error) {
			handleAxiosError(error);
		}
	};

	const initiateTransaction = async () => {
		toastId = toast.loading("Updating");
		try {
			let transactionType;
			if (productRequested.isBarter && productOffered.isBarter) {
				if (productRequested.price || productOffered.price)
					transactionType = "hybrid";
				else transactionType = "barter";
			} else if (!productRequested.isBarter) {
				transactionType = "sale";
			} else {
				setFormStatus(
					"Cannot initiate transaction as product types do not match."
				);
				toast.error("Error", {
					id: toastId,
				});
				return;
			}
			const res = await axios.post(
				"/api/v1/transactions/add",
				{
					transactionType,
					productRequestedId,
					productOfferedId:
						transactionType === "barter" ||
						transactionType === "hybrid"
							? productOfferedId
							: null,
					priceOffered:
						transactionType === "hybrid"
							? productOffered.price
							: null,
					priceRequested:
						transactionType === "sale" ||
						transactionType === "hybrid"
							? productRequested.price
							: null,
				},
				{ withCredentials: true }
			);
			toast.success(res?.response?.data?.message, {
				id: toastId,
			});
			router.push("/explore");
		} catch (error) {
			handleAxiosError(error);
		}
	};

	const handleProductChange = (e) => {
		setProductOfferedId(e.target.value);
		getProductOfferedDetails(e.target.value);
	};

	const handleAxiosError = (error) => {
		const errorMessage =
			error.response?.data?.message || "Something went wrong. Try again";
		setFormStatus(errorMessage);
		toast.error("Error", {
			id: toastId,
		});
	};

	if (loading) {
		return (
			<section className="mx-auto max-w-7xl">
				<div className="mx-auto mt-2 w-60 h-8 px-3 py-2 bg-neutral-400/50 animate-pulse rounded-lg" />
				<section className="px-4 py-2 grid md:grid-cols-2 gap-8">
					<section>
						<p className="text-center text-white bg-red-600 border-t border-x border-black rounded-t-lg">
							Product To Request
						</p>
						<div className="w-full h-96 bg-neutral-400/50 animate-pulse rounded-b-lg border-x border-b border-black" />
						<section className="mt-2 flex flex-col gap-2">
							<div className="flex gap-4 items-center">
								<Image
									src={defaultProfile}
									alt="User Avatar"
									className="w-14 h-14 rounded-full border-2 border-black"
									width={100}
									height={100}
								/>
								<div className="flex flex-col gap-2">
									<div className="bg-neutral-400/50 w-20 h-5 animate-pulse rounded-md"></div>
									<div className="bg-neutral-400/50 w-20 h-5 animate-pulse rounded-md"></div>
								</div>
							</div>
							<hr className="my-2 h-px border-0 bg-black" />
							<div className="bg-neutral-400/50 w-40 h-5 animate-pulse rounded-md"></div>
							<div className="bg-neutral-400/50 w-40 h-5 animate-pulse rounded-md"></div>
							<div className="bg-neutral-400/50 w-40 h-5 animate-pulse rounded-md"></div>
						</section>
					</section>
					<section>
						<p className="text-center text-white bg-blue-600 border-t border-x border-black rounded-t-lg">
							Product To Offer
						</p>
						<div className="w-full h-96 bg-neutral-400/50 animate-pulse rounded-b-lg border-x border-b border-black" />
						<section className="mt-2 flex flex-col gap-2">
							<div className="flex gap-4 items-center">
								<Image
									src={defaultProfile}
									alt="User Avatar"
									className="w-14 h-14 rounded-full border-2 border-black"
									width={100}
									height={100}
								/>
								<div className="flex flex-col gap-2">
									<div className="bg-neutral-400/50 w-20 h-5 animate-pulse rounded-md"></div>
									<div className="bg-neutral-400/50 w-20 h-5 animate-pulse rounded-md"></div>
								</div>
							</div>
							<hr className="my-2 h-px border-0 bg-black" />
							<div className="bg-neutral-400/50 w-40 h-5 animate-pulse rounded-md"></div>
							<div className="bg-neutral-400/50 w-40 h-5 animate-pulse rounded-md"></div>
							<div className="bg-neutral-400/50 w-40 h-5 animate-pulse rounded-md"></div>
						</section>
					</section>
				</section>
			</section>
		);
	}

	return (
		<>
			<Toaster />
			<section className="mx-auto max-w-7xl">
				<div className="text-center mt-2">
					<select
						className="w-fit px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
						name="myProducts"
						onChange={handleProductChange}
						value={productOfferedId}
					>
						<option value="">Select a product to barter</option>
						{myProducts?.length &&
							myProducts.map((product) => (
								<option key={product._id} value={product._id}>
									{product.title}
								</option>
							))}
					</select>
				</div>

				<section className="px-4 py-2 grid md:grid-cols-2 gap-8">
					{productRequested && (
						<section>
							<p className="text-center text-white bg-red-600 border-t border-x border-black rounded-t-lg">
								Product To Request
							</p>
							<div className="relative w-full h-96">
								<Image
									src={productRequested.image || uploadFile}
									alt="Product requested image"
									layout="fill"
									objectFit="contain"
									objectPosition="center"
									className="rounded-b-lg border-x border-b border-black"
								/>
							</div>
							<section className="mt-2 flex flex-col gap-2">
								<div className="flex gap-4 items-center">
									<Image
										src={
											productRequested.owner?.avatar ||
											defaultProfile
										}
										width={100}
										height={100}
										alt="User avatar"
										className="w-14 h-14 rounded-full object-cover border-2 border-black"
									/>
									<div className="flex flex-col">
										<Rate
											disabled
											defaultValue={
												productRequested.owner
													?.rating || 1
											}
											className="custom-rating"
										/>
										<p>{productRequested.owner?.name}</p>
									</div>
								</div>
								<hr className="my-2 h-px border-0 bg-black" />
								<p>
									<span className="font-medium">
										Category:
									</span>{" "}
									{productRequested.category}
								</p>
								<p>
									<span className="font-medium">Title:</span>{" "}
									{productRequested.title}
								</p>
								<p className="capitalize">
									<span className="font-medium">
										Condition:
									</span>{" "}
									{productRequested.condition}
								</p>
								{productRequested.price > 0 && (
									<p>
										<span className="font-medium">
											Price:
										</span>{" "}
										{productRequested.price}
									</p>
								)}
							</section>
						</section>
					)}
					{productOffered ? (
						<section>
							<p className="text-center text-white bg-blue-600 border-t border-x border-black rounded-t-lg">
								Product To Offer
							</p>
							<div className="relative w-full h-96">
								<Image
									src={productOffered.image || uploadFile}
									alt="Product offered image"
									layout="fill"
									objectFit="contain"
									objectPosition="center"
									className="rounded-b-lg border-x border-b border-black"
								/>
							</div>
							<section className="mt-2 flex flex-col gap-2">
								<div className="flex gap-4 items-center">
									<Image
										src={
											productOffered.owner?.avatar ||
											defaultProfile
										}
										width={100}
										height={100}
										alt="User avatar"
										className="w-14 h-14 rounded-full object-cover border-2 border-black"
									/>
									<div className="flex flex-col">
										<Rate
											disabled
											defaultValue={
												productOffered.owner?.rating ||
												1
											}
											className="custom-rating"
										/>
										<p>{productOffered.owner?.name}</p>
									</div>
								</div>
								<hr className="my-2 h-px border-0 bg-black" />
								<p>
									<span className="font-medium">
										Category:
									</span>{" "}
									{productOffered.category}
								</p>
								<p>
									<span className="font-medium">Title:</span>{" "}
									{productOffered.title}
								</p>
								<p className="capitalize">
									<span className="font-medium">
										Condition:
									</span>{" "}
									{productOffered.condition}
								</p>
								{productOffered.price > 0 && (
									<p>
										<span className="font-medium">
											Price:
										</span>{" "}
										{productOffered.price}
									</p>
								)}
							</section>
						</section>
					) : (
						<div>
							<p className="text-center text-white bg-blue-600 border-t border-x border-black rounded-t-lg">
								Product To Offer
							</p>
							<div className="h-96 flex justify-center items-center text-lg border-b border-x border-black rounded-b-lg">
								Choose your product
							</div>
						</div>
					)}
				</section>
				<p className="mx-auto w-fit text-red-600">{formStatus}</p>
				<div className="mt-2 text-center">
					<button
						className="w-fit px-2 py-1 border border-[#101827] hover:bg-[#101827] hover:text-white rounded tracking-wide font-semibold hover:shadow-2xl cursor-pointer"
						onClick={initiateTransaction}
					>
						Initiate Transaction
					</button>
				</div>
			</section>
		</>
	);
};

export default AddTransaction;
