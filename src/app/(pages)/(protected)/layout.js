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
				if (error.response.status === 401) {
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
