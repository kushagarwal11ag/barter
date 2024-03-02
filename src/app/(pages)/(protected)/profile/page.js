"use client";
import React from "react";

import EditProfile from "@/files/EditProfile";
import Navbar from "@/files/Navbar";

const ProfilePage = () => {

	return (
		<>
			<Navbar page="profile" />
			<EditProfile />
		</>
	);
};

export default ProfilePage;
