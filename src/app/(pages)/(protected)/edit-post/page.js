"use client";
import React from "react";

import Navbar from "@/files/Navbar";
import EditPost from "@/files/EditPost";

import usePost from "@/context/posts/usePost";

const AddProductPage = () => {
	return (
		<>
			<Navbar page="editProduct" />
			<EditPost />
		</>
	);
};

export default AddProductPage;
