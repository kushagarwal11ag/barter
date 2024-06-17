"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Popover, Rate } from "antd";
import axios from "axios";

import defaultProfile from "../../../public/defaultProfile.svg";

const ProductDetails = ({ productId }) => {
	const [product, setProduct] = useState(null);
	const [user, setUser] = useState(null);
	const [barterToggle, setBarterToggle] = useState(false);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const fetchedProduct = await axios.get(
					`/api/v1/products/${productId}`,
					{ withCredentials: true }
				);
				const productDetails = fetchedProduct?.data?.data;
				setProduct(productDetails);
			} catch (error) {
				console.log(error);
			}
		};

		const fetchUser = async () => {
			try {
				const fetchedUser = await axios.get("/api/v1/users/", {
					withCredentials: true,
				});
				if (fetchedUser?.data?.data) {
					const userDetails = fetchedUser.data.data;
					setUser(userDetails);
				}
			} catch (error) {
				console.log(error);
				setUser(null);
			}
		};
		fetchProduct();
		fetchUser();
	}, [productId]);

	const handleDelete = async () => {
		try {
			await axios.delete(`/api/v1/products/${productId}`);
		} catch (error) {
			console.log(error);
		}
	};

	const content = (
		<div className="flex flex-col">
			<Link
				href={`/product/${productId}/edit`}
				className="p-2 hover:text-green-600"
			>
				Edit
			</Link>
			<Link
				href="/explore"
				className="p-2 hover:text-red-500"
				onClick={handleDelete}
			>
				Delete
			</Link>
		</div>
	);

	return (
		<section className="mt-4 mx-auto p-2 max-w-6xl flex flex-col gap-8">
			{product && (
				<section className="grid md:grid-cols-2 gap-8">
					<div className="relative w-full h-96">
						<Image
							src={product.image}
							alt="Product image"
							layout="fill"
							objectFit="contain"
							objectPosition="center"
							className="rounded-lg border border-black"
						/>
					</div>
					<div className="flex flex-col gap-2 text-gray-800">
						<p className="text-xl text-red-600 font-semibold">
							{product.isBarter
								? product.price
									? "Hybrid"
									: "Barter"
								: "Sale"}
						</p>
						<section className="flex items-center justify-between">
							<h2 className="text-5xl font-bold text-[#101827] uppercase">
								{product.title}
							</h2>
							{user?._id === product.owner?._id && (
								<Popover
									content={content}
									placement="bottomRight"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="1.5em"
										height="1.5em"
										viewBox="0 0 16 16"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
										/>
									</svg>
								</Popover>
							)}
						</section>
						<p className="">{product.description}</p>
						<p className="text-sm">
							Category:{" "}
							<span className="text-black font-semibold">
								{product.category}
							</span>
						</p>
						<p className="text-sm">
							Condition:{" "}
							<span className="capitalize font-semibold text-black">
								{product.condition}
							</span>
						</p>
						{product.isBarter && (
							<>
								<div className="flex gap-2 w-fit h-fit">
									<label className="relative flex cursor-pointer p-1 rounded-md">
										<input
											type="checkbox"
											name="isAvailable"
											checked={barterToggle}
											onChange={() => {
												setBarterToggle(!barterToggle);
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
										Show Exchange Requirements
									</label>
								</div>
								{barterToggle && (
									<div className="ml-9 text-sm">
										{product.barterCategory && (
											<p>
												Interested in{" "}
												<span className="font-bold capitalize">
													{product.barterCategory}
												</span>{" "}
												category
											</p>
										)}
										{product.barterDescription && (
											<p>
												<span className="font-bold">
													Description:
												</span>{" "}
												{product.barterDescription}
											</p>
										)}
									</div>
								)}
							</>
						)}
						<p className="text-5xl font-bold text-[#101827] uppercase">
							&#36;{product.price}
						</p>
						<p className="text-xs">
							{product.viewCount} views
						</p>
						{user?._id !== product.owner?._id && (
							<>
								<hr className="my-2 h-px border-0 bg-black"></hr>
								<Link
									className="flex gap-4 items-center"
									href={`/profile/${product.owner?._id}`}
								>
									<Image
										src={
											product.owner?.avatar ||
											defaultProfile
										}
										width={48}
										height={48}
										alt="User avatar"
										className="w-12 h-12 rounded-full object-cover"
									/>
									<div className="flex flex-col">
										<Rate
											disabled
											defaultValue={
												product.owner?.rating || 1
											}
											className="custom-rating"
										/>
										<div>{product.owner?.name}</div>
									</div>
								</Link>
							</>
						)}
					</div>
				</section>
			)}
			{user?._id !== product?.owner?._id && (
				<div className="self-center">
					<Link
						href={`/transaction/add/${productId}`}
						className="w-fit px-2 py-1 border border-[#101827] hover:bg-[#101827] hover:text-white rounded tracking-wide font-semibold hover:shadow-2xl cursor-pointer"
					>
						Initiate Transaction
					</Link>
				</div>
			)}
		</section>
	);
};

export default ProductDetails;
