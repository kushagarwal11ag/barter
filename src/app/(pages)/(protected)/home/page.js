"use client";
import React from "react";

import Explore from "@/files/Post";

// import { SectionProvider } from "@/context/section/SectionContext"

const HomePage = () => {
	return (
		<main className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] m-8">
			<Explore
				productLiked={true}
				productCategory="Electronic"
				productName="Camera"
				traderName="Woman"
				traderPhone="+91 1234567890"
			/>
			<Explore
				productLiked={false}
				productCategory="Beauty"
				productName="Lipstick"
				traderName="Woman"
				traderPhone="+91 1234567899"
			/>
			<Explore
				productLiked={false}
				productCategory="Beauty"
				productName="Lipstick"
				traderName="Woman"
				traderPhone="+91 1234567899"
			/>
			<Explore
				productLiked={false}
				productCategory="Beauty"
				productName="Lipstick"
				traderName="Woman"
				traderPhone="+91 1234567899"
			/>
			<Explore
				productLiked={false}
				productCategory="Beauty"
				productName="Lipstick"
				traderName="Woman"
				traderPhone="+91 1234567899"
			/>
			<Explore
				productLiked={false}
				productCategory="Beauty"
				productName="Lipstick"
				traderName="Woman"
				traderPhone="+91 1234567899"
			/>
			<Explore
				productLiked={false}
				productCategory="Beauty"
				productName="Lipstick"
				traderName="Woman"
				traderPhone="+91 1234567899"
			/>
			<Explore
				productLiked={false}
				productCategory="Beauty"
				productName="Lipstick"
				traderName="Woman"
				traderPhone="+91 1234567899"
			/>
			<Explore
				productLiked={false}
				productCategory="Beauty"
				productName="Lipstick"
				traderName="Woman"
				traderPhone="+91 1234567899"
			/>
		</main>
	);
};

export default HomePage;
