"use client";
import React from "react";

import Navbar from "@/files/Navbar";
import AddPost from "@/files/AddPost";

import usePost from "@/context/posts/usePost";

const AddProductPage = () => {
	return (
		<>
			<Navbar page="addProduct" />
			<AddPost />
		</>
	);
};

export default AddProductPage;
