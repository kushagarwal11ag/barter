"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/context/auth/useAuth";

import Loader from "@/files/Loader";
import Welcome from "@/files/Welcome";

const Home = () => {
	const router = useRouter();
	const { authStatus } = useAuth();
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		setLoader(true);
		if (authStatus) router.push("/home");
		setLoader(false);
	}, [authStatus, router]);

	return loader ? <Loader /> : authStatus ? <></> : <Welcome />;
};

export default Home;
