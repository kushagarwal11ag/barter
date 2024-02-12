import { useContext } from "react";
import UserContext from "./UserContext";

const useUser = () => {
	const data = useContext(UserContext);
	return data;
};

export default useUser;
