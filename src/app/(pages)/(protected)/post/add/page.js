"use client";
import React from "react";

import Navbar from "@/files/Navbar";
import AddPost from "@/files/AddPost";

const AddProduct = () => {
	return (
		<>
			<Navbar page="addProduct" />
			<AddPost />
		</>
	);
};

export default AddProduct;
