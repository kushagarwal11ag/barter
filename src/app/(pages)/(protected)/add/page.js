"use client";
import React from "react";

import Navbar from "@/files/Navbar";
import AddProduct from "@/files/AddProduct";

import usePost from "@/context/posts/usePost";

const AddProductPage = () => {
	return (
		<>
			<Navbar page="addProduct" />
			<AddProduct />
		</>
	);
};

export default AddProductPage;
