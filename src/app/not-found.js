"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// import Loader from "@/files/Loader";

// import notFound from "@/components/css/NotFound.module.css";

function Custom404() {
	// const router = useRouter();
	// const [loader, setLoader] = useState(false);

	return (
		<main className="h-screen overflow-hidden">
			<section className="bg-cover bg-center bg-[url('/error404background.svg')] h-full w-full grid grid-flow-row grid-rows-[50%_50%] justify-items-center items-center sm:grid-rows-[auto] sm:grid-flow-col sm:grid-cols-[50%_50%]">
				<div className="p-8 flex flex-col gap-8 items-center sm:items-start">
					<header className="text-[white] text-5xl font-semibold md:text-[4rem]">
						404: Lost in Chaos
					</header>
					<p className="text-[#88e3ad] text-2xl md:text-[2rem]">
						Enjoy the glitchy vibes!
					</p>
					<button
						className="cursor-pointer w-fit bg-[#92e3a9] text-[#263238] text-base font-medium px-4 py-4 rounded-[30px] md:text-[2rem]"
						onClick={() => {
							setLoader(true);
							router.replace("/");
							setLoader(false);
						}}
					>
						Home
					</button>
				</div>
				<div className="bg-contain bg-center bg-no-repeat bg-[url('/error404.svg')] w-full h-full scale-100 p-8"></div>
			</section>
		</main>
	);
}

export default Custom404;
