"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

import defaultProfile from "../../../public/defaultProfile.svg";

const Explore = () => {
	const [products, setProducts] = useState([]);

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
			}
		};
		fetchProducts();
	}, []);

	return (
		<>
			<section className="m-auto max-w-7xl p-8 grid gap-8 grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
				{products.length &&
					products.map((product) => (
						<Link
							key={product._id}
							href={`/product/${product._id}`}
							className="relative max-w-xs shadow-md duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden h-80"
						>
							<div
								className="absolute inset-0 bg-cover bg-center z-0 rounded-xl border-black border"
								style={{
									backgroundImage: `url(${product.image})`,
								}}
							></div>
							<section className="p-4 opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 bg-[#000000d9] text-white flex flex-col justify-end rounded-xl">
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
		</>
	);
};

export default Explore;
