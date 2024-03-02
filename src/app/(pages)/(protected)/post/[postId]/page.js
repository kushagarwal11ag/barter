"use client";
import React from "react";

const ViewPost = ({ params }) => {
	const { postId } = params;
	return <div>Viewing post with id: {postId}</div>;
};

export default ViewPost;
