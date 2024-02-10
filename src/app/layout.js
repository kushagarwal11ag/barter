import "@/components/globals.css";

export const metadata = {
	title: "Swap Ease - A Barter System",
	description: "For bartering",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
