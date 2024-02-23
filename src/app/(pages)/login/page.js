"use client";

import React, { useEffect } from "react";

import Login from "@/files/Login";

import authService from "@/appwrite/auth";
import useAuth from "@/context/auth/useAuth";
import useUser from "@/context/users/useUser";

const LoginPage = () => {
	const { authStatus, setAuthStatus } = useAuth();
	const { setUser } = useUser();

	useEffect(() => {
		if (authStatus)
			authService.logout().then(() => {
				setAuthStatus(false);
			});
		setUser({
			$id: "",
			// profileImageId: null,
			userName: "",
			userEmail: "",
		});
	}, []);

	return <Login />;
};

export default LoginPage;
