"use client";
import React, { useEffect, useState } from "react";

import authService from "@/appwrite/auth";
import { AuthProvider } from "@/context/auth/AuthContext";

import Loader from "@/files/Loader";

const ProtectedLayout = ({ children }) => {
	const [authStatus, setAuthStatus] = useState(false);
	const [loader, setLoader] = useState(true);

	useEffect(() => {
		authService
			.isLoggedIn()
			.then(setAuthStatus)
			.finally(() => setLoader(false));
	}, []);

	return (
		<AuthProvider value={{ authStatus, setAuthStatus }}>
			{!loader ? (
				<>
					<main>{children}</main>
				</>
			) : (
				<Loader />
			)}
		</AuthProvider>
	);
};

export default ProtectedLayout;
