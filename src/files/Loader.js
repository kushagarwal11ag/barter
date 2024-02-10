"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import gif from "../../public/barter-crop-small-smaller.gif";

const Loader = () => {
	const loadingArr = [
		"Loading up your bartering adventure! Sit tight while we prepare your trading playground.",
		"Bringing bartering to life! Just a moment as we set the stage for your swapping spree.",
		"Trading dreams coming to life! We're getting things sorted for your bartering delight.",
		"Barter magic in progress! We're prepping your platform for a world of swapping wonders.",
		"Revving up the barter engine! Just a quick moment while we fuel your trading excitement.",
		"Bartering brilliance loading! We're prepping the stage for your swap-tastic journey.",
		"Crafting your barter universe! Sit back and relax while we set the scene.",
		"Your bartering oasis is on its way! We're brewing up some barter goodness just for you.",
		"Loading up your barter revolution! Let's get ready to swap, trade, and barter like never before!",
	];

	const [randomText, setRandomText] = useState("Loading...");

	useEffect(() => {
		setRandomText(
			loadingArr[Math.floor(Math.random() * loadingArr.length)]
		);
	}, []);

	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			<Image src={gif} alt="Loading page gif" width={300} height={300} />
			<p className="text-center sm:text-2xl">{randomText}</p>
		</div>
	);
};

export default Loader;
