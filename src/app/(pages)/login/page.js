"use client";

import React, { useEffect } from "react";

import Login from "@/files/Login";

import authService from "@/appwrite/auth";
import useAuth from "@/context/auth/useAuth";

const LoginPage = () => {
	const { authStatus, setAuthStatus } = useAuth();

	useEffect(() => {
		if (authStatus)
			authService.logout().then(() => {
				setAuthStatus(false);
			});
	}, []);

	return <Login />;
};

export default LoginPage;