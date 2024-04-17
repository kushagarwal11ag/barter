import "@/components/globals.css";

export const metadata = {
	title: "Swap Ease - Bartering Platform",
	description: "Bartering application",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/logo.svg"
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}
