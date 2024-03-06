import { createContext } from "react";

export const PostContext = createContext({
	posts: [],
	setPosts: () => {},
	addPost: () => {},
	currentPost: null,
	getCurrentPost: () => {},
	editPost: () => {},
	deletePost: () => {},
});

export const PostProvider = PostContext.Provider;

export default PostContext;
