"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/context/auth/useAuth";
import useUser from "@/context/users/useUser";

import Loader from "@/files/Loader";
import Welcome from "@/files/Welcome";

const Home = () => {
	const router = useRouter();
	const { authStatus } = useAuth();
	const { user } = useUser();
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		setLoader(true);
		console.log("starting web app: user:: ", user)
		if (authStatus && user.$id) router.push("/home");
		setLoader(false);
	}, [authStatus, router]);

	return loader ? <Loader /> : authStatus ? <></> : <Welcome />;
};

export default Home;
