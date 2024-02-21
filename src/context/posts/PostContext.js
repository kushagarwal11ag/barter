import { createContext, useState } from "react";

export const PostContext = createContext({
	posts: [],
	addInitialPosts: () => {},
	addPost: () => {},
	deletePost: () => {},
});

export const PostProvider = ({ children }) => {
	const [posts, setPosts] = useState([]);

	const addPost = (post) => {
		setPosts([{...post}, ...posts]);
	};

	const addInitialPosts = (posts) => {
		setPosts([...posts]);
	};

	const deletePost = (postId) => {
		setPosts(posts.filter((post) => post.id !== postId));
	};

	return (
		<PostContext.Provider
			value={{ posts, addInitialPosts, addPost, deletePost }}
		>
			{children}
		</PostContext.Provider>
	);
};

export default PostContext;
