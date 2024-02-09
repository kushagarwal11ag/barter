"use client";

import React, { useEffect } from "react";

import Auth from "@/files/Auth";

import authService from "@/appwrite/auth";
import useAuth from "@/context/auth/useAuth";

const Home = () => {
	const { authStatus, setAuthStatus } = useAuth();

	useEffect(() => {
		if (authStatus)
			authService.logout().then(() => {
				setAuthStatus(false);
			});
	}, []);

	return <Auth />;
};

export default Home;
