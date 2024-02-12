import React from "react";
import Link from "next/link";

const Explore = ({ productLiked = false, productCategory = "undefined", productName = "null", traderName = "null", traderPhone = "null" }) => {
	return (
		<>
			<section className="w-fit pb-14 mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
				<div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
					<Link href="?p=80">
						<div className="bg-white shadow-xl rounded-lg overflow-hidden">
							<div className="bg-cover bg-center h-56 p-4 bg-[url(/images/profile/camera-woman.jpg)]">
								<div className="flex justify-end">
									<span>
										{productLiked ? (
											<img
											src="/images/fill-heart.png"
											alt=""
											className="h-7 w-7 inline-block"
											data-post-id="80"
										/>
										) : (
											<img
												src="/images/heart.png"
												alt=""
												className="h-7 w-7 inline-block"
												data-post-id="80"
											/>
										)}
									</span>
								</div>
							</div>
							<div className="p-4">
								<p className="text-gray-700">{productCategory}</p>
								<span className="uppercase tracking-wide text-sm font-bold text-gray-700">
									{productName}
								</span>
							</div>

							<div className="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
								<div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
									trader
								</div>
								<div className="flex items-center pt-2">
									<div className="bg-cover bg-center w-10 h-10 rounded-full mr-3  bg-[url(/images/profile/camera-woman.jpg)]"></div>
									<div>
										<p className="font-bold text-gray-900">
										{traderName}
										</p>
										<p className="text-sm text-gray-700">
											{traderPhone}
										</p>
									</div>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</section>
		</>
	);
};

export default Explore;
