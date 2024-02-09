import { useContext } from "react";
import AuthContext from "./AuthContext";

const useAuth = () => {
	const data = useContext(AuthContext);
	return data;
};

export default useAuth;