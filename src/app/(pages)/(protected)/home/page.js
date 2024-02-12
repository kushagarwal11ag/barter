"use client";
import React from "react";

import Explore from "@/files/Explore";

// import { SectionProvider } from "@/context/section/SectionContext"

const HomePage = () => {
	return (
		<>
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
		</>
	);
};

export default HomePage;
