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
							className="max-w-xs bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl overflow-hidden"
						>
							<div className="h-40 overflow-hidden">
								<Image
									src={product.image}
									width={100}
									height={100}
									alt={`${product.title} of type ${product.category} by ${product.owner.name}`}
									className="h-full w-full object-contain"
								/>
							</div>
							<div className="p-4">
								<p className="text-gray-700 capitalize">
									{product.category}
								</p>
								<p className="uppercase tracking-wide text-sm font-bold text-gray-700">
									{product.title}
								</p>
								<p className="text-gray-700 capitalize">
									{product.isBarter ? (
										product.price ? (
											<>Hybrid</>
										) : (
											<>Barter</>
										)
									) : (
										<>Sale</>
									)}
								</p>
								<p className="uppercase tracking-wide text-sm font-bold text-gray-700">
									&#x20b9;{product.price}
								</p>
							</div>

							<section className="p-2 border-t border-gray-300 bg-gray-100">
								<div className="flex items-center pt-2">
									<Image
										src={
											product.owner.avatar ||
											defaultProfile
										}
										width={100}
										height={100}
										alt={`Image of trader ${product.owner.name}`}
										className="object-cover object-center w-10 h-10 rounded-full mr-3"
									/>
									<div>
										<p className="font-bold text-gray-900 capitalize">
											{product.owner.name}
										</p>
										<p className="text-sm font-bold text-gray-700 tracking-wide">
											Trader
										</p>
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
