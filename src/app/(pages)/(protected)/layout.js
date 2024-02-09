"use client";
import { useEffect } from "react";
import useAuth from "@/context/auth/useAuth";
import { useRouter } from "next/navigation";

const ProtectedLayout = ({ children }) => {
	const router = useRouter();
	const { authStatus } = useAuth();

	useEffect(() => {
		if (!authStatus) {
			router.replace("/auth");
		}
	}, [authStatus, router]);
	return authStatus ? children : null;
};

export default ProtectedLayout;
