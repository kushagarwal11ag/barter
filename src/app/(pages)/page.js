"use client";

import React from "react";
// import { useRouter } from "next/navigation";


import Welcome from "@/files/Welcome";
// import useAuth from "@/context/auth/useAuth";
// import Loader from "@/files/Loader";

const Home = () => {
	// const router = useRouter();
	// const { authStatus } = useAuth();
	// const [loader, setLoader] = useState(false);

	// useEffect(() => {
	// 	setLoader(true);
	// 	if (authStatus) {
	// 		router.push("/profile");
	// 		setLoader(false);
	// 	} else {
	// 		router.push("/auth");
	// 		setLoader(false);
	// 	}
	// }, [authStatus, router]);

	// return loader ? <Loader /> : <></>;
	return <Welcome />;
};

export default Home;
