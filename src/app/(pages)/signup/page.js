"use client";

import React, { useEffect } from "react";

import Signup from "@/files/Signup";

import authService from "@/appwrite/auth";
import useAuth from "@/context/auth/useAuth";

const SignupPage = () => {
	const { authStatus, setAuthStatus } = useAuth();

	useEffect(() => {
		if (authStatus)
			authService.logout().then(() => {
				setAuthStatus(false);
			});
	}, []);

	return <Signup />;
};

export default SignupPage;
