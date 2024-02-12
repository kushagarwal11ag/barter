import { createContext, useContext, useState } from "react";

export const UserContext = createContext({
	userName: "John Doe",
	userEmail: "john@example.com",
	userPhone: "",
	editUser: () => {},
});

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({
		userName: "John Doe",
		userEmail: "john@example.com",
		userPhone: "",
	});

	const editUser = (user) => {
		setUser(user);
	};

	return (
		<UserContext.Provider value={{ user, editUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
