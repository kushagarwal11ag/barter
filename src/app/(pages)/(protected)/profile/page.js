"use client";
import React from "react";

import Sidebar from "@/files/Sidebar";
import Dashboard from "@/files/Dashboard";

import { SectionProvider } from "@/context/section/SectionContext";

const ProfilePage = () => {
	return (
		<SectionProvider>
			<Sidebar />
			<Dashboard />
		</SectionProvider>
	);
};

export default ProfilePage;
