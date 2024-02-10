"use client";

import React, { useEffect } from "react";

import Login from "@/files/Login";
import Signup from "@/files/Signup";
import AddProduct from "@/files/AddProduct";
import Loader from "@/files/Loader";
import EditProfile from "@/files/EditProfile";
import ChatBox from "@/files/ChatBox";
import NotificationBox from "@/files/NotificationBox";


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

	return <NotificationBox />;
};

export default Auth;
