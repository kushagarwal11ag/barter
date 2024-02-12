import { createContext, useContext, useState } from "react";

export const PostContext = createContext({
	posts: [
		{
			id: 1,
			liked: false,
			pName: "Books",
			pCategory: "Literature",
			tName: "John Jacobs",
			tPhone: "+91 1234567890",
		},
		{
			id: 2,
			liked: true,
			pName: "Camera",
			pCategory: "Electronics",
			tName: "Lost from Light",
			tPhone: "+91 1234567890",
		},
		{
			id: 3,
			liked: false,
			pName: "Watch",
			pCategory: "Accessories",
			tName: "Changing Star",
			tPhone: "+91 1234567890",
		},
		{
			id: 4,
			liked: true,
			pName: "Bag",
			pCategory: "Accessories",
			tName: "Prince of Nothing",
			tPhone: "+91 1234567890",
		},
		{
			id: 5,
			liked: true,
			pName: "Lipstick",
			pCategory: "Makeup",
			tName: "Soul Reaper",
			tPhone: "+91 1234567890",
		},
	],
	addPost: () => {},
	// deletePost: () => {},
});

export const PostProvider = ({ children }) => {
	const defaultPosts = useContext(PostContext).posts;
	const [posts, setPosts] = useState(defaultPosts);

	const addPost = (post) => {
		setPosts(post);
	};

	// const deletePost = (postId) => {
	// 	setPosts(posts.filter((post) => post.id !== postId));
	// };

	return (
		<PostContext.Provider value={{ posts, addPost }}>
			{children}
		</PostContext.Provider>
	);
};


export default PostContext;
