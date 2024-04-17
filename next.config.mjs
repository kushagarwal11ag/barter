/** @type {import('next').NextConfig} */
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "res.cloudinary.com",
				pathname: "/**",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/api/v1/:path*",
				destination: `${API_URL}/api/v1/:path*`, // Proxy the request to the external API
			},
		];
	},
};

export default nextConfig;
