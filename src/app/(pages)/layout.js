import Navbar from "@/containers/public/Navbar";

const ProtectedLayout = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default ProtectedLayout;
