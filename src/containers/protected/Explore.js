"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

import defaultProfile from "../../../public/defaultProfile.svg";
import { Empty } from "antd";

const Explore = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await axios.get("/api/v1/products/", {
					withCredentials: true,
				});
				const productData = res?.data?.data;
				setProducts(productData);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	if (loading) {
		return (
			<section className="max-w-7xl mx-auto p-8 grid gap-8 grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
				{Array.from({ length: 10 }).map((_, index) => (
					<div
						key={index}
						className="p-4 bg-neutral-400/50 max-w-xs h-80 animate-pulse rounded-xl border-black border"
					></div>
				))}
			</section>
		);
	}

	return (
		<>
			{products?.length > 0 ? (
				<>
					<section className="mx-auto max-w-7xl p-8 grid gap-8 grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
						{products.map((product) => (
							<Link
								key={product._id}
								href={`/product/${product._id}`}
								className="relative max-w-xs shadow-md duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden h-80 rounded-xl"
							>
								<Image
									src={product.image}
									alt="Product image"
									layout="fill"
									objectFit="cover"
									className="border-black border rounded-xl"
								/>
								{product.isWishlist && (
									<div
										className="absolute top-0 right-2 z-20 w-10 h-10 bg-cover bg-no-repeat"
										style={{
											backgroundImage:
												"url(/icons/heart.svg)",
										}}
									></div>
								)}
								<section className="p-4 opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 bg-[#000000d9] text-white flex flex-col justify-end">
									<p className="text-sm">
										{product.isBarter
											? product.price
												? "Hybrid"
												: "Barter"
											: "Sale"}
									</p>
									<p className="uppercase tracking-wide text-lg font-bold">
										{product.title}
									</p>
									<p className="capitalize text-sm">
										{product.category}
									</p>
									<div className="mt-2 flex items-center gap-2">
										<Image
											src={
												product.owner.avatar ||
												defaultProfile
											}
											width={100}
											height={100}
											alt={`Image of trader ${product.owner.name}`}
											className="object-cover object-center w-10 h-10 rounded-full"
										/>
										<div className="font-bold capitalize">
											{product.owner.name}
										</div>
									</div>
								</section>
							</Link>
						))}
					</section>
					<Link href="/product/add">
						<Image
							src="/icons/plus.svg"
							alt="Add product icon"
							width={60}
							height={60}
							className="fixed bottom-5 right-5 cursor-pointer hover:scale-110 duration-500"
						/>
					</Link>
				</>
			) : (
				<Empty description={<p>No products to display</p>}>
					<Link
						href="/product/add"
						className="p-2 bg-[#101827] text-white rounded"
					>
						Create Now
					</Link>
				</Empty>
			)}
		</>
	);
};

export default Explore;
