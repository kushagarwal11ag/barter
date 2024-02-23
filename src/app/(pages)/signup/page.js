"use client";

import React, { useEffect } from "react";

import Signup from "@/files/Signup";

import authService from "@/appwrite/auth";
import useAuth from "@/context/auth/useAuth";
import useUser from "@/context/users/useUser";

const SignupPage = () => {
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

	return <Signup />;
};

export default SignupPage;
