import { createContext, useContext, useState } from "react";

export const PostContext = createContext({
	posts: [
		{
			id: 1,
			liked: false,
			imageId: "65d50926238160d98cee",
			pName: "Bag",
			pCategory: "Accessories",
			tName: "John Jacobs",
			tPhone: "+91 1234567890",
		},
		{
			id: 2,
			liked: true,
			imageId: "65d50926238160d98cee",
			pName: "Headphones",
			pCategory: "Electronics",
			tName: "Lost from Light",
			tPhone: "+91 1234567890",
		},
		{
			id: 3,
			liked: false,
			imageId: "65d4e7b799af9265bb61",
			pName: "Watch",
			pCategory: "Accessories",
			tName: "Changing Star",
			tPhone: "+91 1234567890",
		},
		{
			id: 4,
			liked: true,
			imageId: "65d50e442e82e82cde5f",
			pName: "Shoes",
			pCategory: "Accessories",
			tName: "Prince of Nothing",
			tPhone: "+91 1234567890",
		},
		{
			id: 5,
			liked: true,
			imageId: "65d50d171e3ef9b0a326",
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
		setPosts([
			{
				id: Date.now(),
				liked: false,
				imageId: "65d4e7b799af9265bb61",
				tName: "Kushal",
				tPhone: "+919191919191",
				...post,
			},
			...posts,
		]);
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
