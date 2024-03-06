"use client";
import React from "react";

import Navbar from "@/files/Navbar";
import ViewPost from "@/files/ViewPost";

const ViewProduct = ({ params }) => {
	const { postId } = params;
	return (
		<>
			<Navbar page="viewProduct" />
			<ViewPost id={postId} />
		</>
	);
};

export default ViewProduct;
