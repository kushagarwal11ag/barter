import React, { useState } from "react";
const SVGComponent = (props) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={512}
			height={512}
			viewBox="0 0 512 512"
			xmlSpace="preserve"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<g data-name="Layer 2">
				<circle
					cx={256}
					cy={256}
					r={256}
					fill={isHovered ? "#047857" : "#9CA3AF"}
					data-original="#26a1f4"
				/>
				<path
					d="m345.15 237.54-.14-.14-70.56-70.61s-86 86-127.44 128.3c-5.16 5.26-9.07 12.58-11.39 19.66-6.8 20.79-12.43 42-18.69 63-1.68 5.63-1.34 10.59 3.07 14.79 4.16 4 8.84 4.14 14.24 2.52 20-6 40.13-11.71 60.22-17.46a61.5 61.5 0 0 0 27.16-16.39c39.48-39.72 123.53-123.67 123.53-123.67m41.19-87.73-24.13-24.13a33 33 0 0 0-46.65 0L288.21 153 359 223.81l27.35-27.35a33 33 0 0 0-.01-46.65"
					data-original="#ffffff"
					fill="#fff"
				/>
			</g>
		</svg>
	);
};
export default SVGComponent;
