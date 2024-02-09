"use client";

import React, { useEffect } from "react";

import Login from "@/files/Login";
import Signup from "@/files/Signup";

// import authService from "@/appwrite/auth";
// import useAuth from "@/context/auth/useAuth";

const Auth = () => {
	// const { authStatus, setAuthStatus } = useAuth();

	// useEffect(() => {
	// 	if (authStatus)
	// 		authService.logout().then(() => {
	// 			setAuthStatus(false);
	// 		});
	// }, []);

	return <Login />;
};

export default Auth;
