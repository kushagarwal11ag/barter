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
		let isMounted = true;
		const navigate = async () => {
			if (authStatus && user.$id) {
				setLoader(true);
				router.push("/home");
				if (isMounted) setLoader(false);
			}
		};

		navigate();

		return () => {
			isMounted = false;
		};
	}, [authStatus, user.$id, router]);

	if (loader) return <Loader />;
	if (!authStatus) return <Welcome />;
	return null;
};

export default Home;
