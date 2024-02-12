import { useContext } from "react";
import PostContext from "./PostContext";

const usePost = () => {
	const data = useContext(PostContext);
	return data;
};

export default usePost;
