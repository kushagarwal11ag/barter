"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Navbar from "@/containers/public/Navbar";

const ProtectedLayout = ({ children }) => {
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				await axios.get("/api/v1/users/", {
					withCredentials: true,
				});
			} catch (error) {
				const errorMessage = error.response?.data?.message;
				if (
					errorMessage === "Access token expired. Please refresh." ||
					errorMessage === "No access token provided. Please log in."
				) {
					try {
						await axios.post("/api/v1/users/refresh", {
							withCredentials: true,
						});

						await axios.get("/api/v1/users/");
					} catch (refreshError) {
						router.push("/login");
					}
				} else {
					router.push("/login");
				}
			}
		};
		fetchUser();
	}, []);

	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default ProtectedLayout;
