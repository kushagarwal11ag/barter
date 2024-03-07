import { createContext } from "react";

export const PostContext = createContext({
	posts: [],
	setPosts: () => {},
	addPost: (post) => {},
	currentPost: null,
	getCurrentPost: (postId) => {},
	editPost: (postId, updatedPost) => {},
	updatePosts: (newData) => {},
	deletePost: (postId) => {},
});

export const PostProvider = PostContext.Provider;

export default PostContext;
