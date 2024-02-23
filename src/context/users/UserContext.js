import { createContext } from "react";

export const UserContext = createContext({
	user: {},
	setUser: () => {},
});

export const UserProvider = UserContext.Provider;

export default UserContext;
