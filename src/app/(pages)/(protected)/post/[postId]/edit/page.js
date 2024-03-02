"use client";
import React from "react";

import Navbar from "@/files/Navbar";
import EditPost from "@/files/EditPost";

const EditProduct = ({ params }) => {
	const { postId } = params;
	return (
		<>
			<Navbar page="editProduct" />
			<EditPost id={postId} />
		</>
	);
};

export default EditProduct;
