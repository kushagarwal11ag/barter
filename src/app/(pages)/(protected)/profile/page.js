"use client";
import React from "react";

import EditProfile from "@/files/EditProfile";
import Navbar from "@/files/Navbar";

import useUser from "@/context/users/useUser";

const ProfilePage = () => {

	return (
		<>
			<Navbar page="profile" />
			<EditProfile />
		</>
	);
};

export default ProfilePage;
