"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Popover } from "antd";
import axios from "axios";

import defaultProfile from "../../../public/defaultProfile.svg";

const ProductDetails = ({ productId }) => {
	const [product, setProduct] = useState(null);
	const [user, setUser] = useState(null);

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
		<>
			{product && (
				<div className="mt-4 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row -mx-4">
						<div className="md:flex-1 px-4">
							<div className="h-fit flex justify-center rounded-lg mb-4">
								<Image
									src={product.image}
									width={500}
									height={700}
									objectFit="cover"
									alt="Product image"
									className="rounded-lg"
								/>
							</div>
						</div>
						<div className="md:flex-1 px-4">
							<section className="flex">
								<div className="flex flex-col">
									<div className="text-lg text-gray-700 capitalize">
										{product.category}
									</div>
									<h2 className="text-3xl sm:text-5xl font-bold text-gray-800 uppercase mb-2">
										{product.title}
									</h2>
								</div>
								{user?._id === product.owner?._id && (
									<Popover
										content={content}
										placement="bottomRight"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1em"
											height="1em"
											viewBox="0 0 16 16"
											className="bi bi-three-dots-vertical"
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
							<p className="text-gray-600 mt-2">
								{product.description}
							</p>
							<p className="text-gray-600 mt-2">
								Condition:{" "}
								<span className="capitalize">
									{product.condition}
								</span>
							</p>
							{product.isBarter && (
								<div className="text-gray-600 mt-2">
									{product.price ? <>Hybrid</> : <>Barter</>}
									{product.barterCategory && (
										<p className="capitalize">
											Barter Category:{" "}
											{product.barterCategory}
										</p>
									)}
									{product.barterDescription && (
										<p className="capitalize">
											Barter Description:{" "}
											{product.barterDescription}
										</p>
									)}
								</div>
							)}
							<p className="text-xl sm:text-2xl font-bold text-gray-800 uppercase mt-2">
								&#x20b9;{product.price}
							</p>
							<p className="text-gray-800 mt-2">
								Views: {product.viewCount}
							</p>
							<hr className="opacity-8 mt-8"></hr>
							<button className="mt-4 flex gap-4 items-center">
								<Image
									src={
										product.owner?.avatar || defaultProfile
									}
									width={48}
									height={48}
									alt="User avatar"
									className="w-12 h-12 rounded-full object-cover"
								/>
								<span>{product.owner?.name}</span>
							</button>
						</div>
					</div>
					{user?._id !== product.owner?._id && (
						<div className="py-2 px-4 w-max max-w-6xl mx-auto bg-gray-900 hover:bg-gray-700 text-white rounded-2xl cursor-pointer">
							<Link href={`/transaction/add/${productId}`}>
								<Image
									src="/logo.svg"
									alt="logo"
									width={48}
									height={48}
									className="w-10 md:w-12"
								/>
								Swap It
							</Link>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default ProductDetails;
