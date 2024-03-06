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
			<path
				fill={isHovered ? "#B91C1C" : "#9CA3AF"}
				fillRule="evenodd"
				d="M256 0C114.842 0 0 114.842 0 256s114.839 256 256 256 256-114.841 256-256S397.16 0 256 0m-49.921 114.329a8.325 8.325 0 0 1 8.32-8.324h83.2a8.34 8.34 0 0 1 8.322 8.334v20.577h-99.842zm136.8 279.759A12.745 12.745 0 0 1 330.067 406h-149.1a12.873 12.873 0 0 1-12.807-11.963L155.407 207.4h201.081l-13.614 186.688zM376.02 190.5H135.98v-19.339a19.357 19.357 0 0 1 19.339-19.341l201.359-.006a19.365 19.365 0 0 1 19.338 19.348v19.336zM217.35 361.508V243a8.449 8.449 0 0 1 16.9.006v118.502a8.451 8.451 0 1 1-16.9 0m60.292 0V243a8.451 8.451 0 0 1 16.9.006v118.507a8.452 8.452 0 1 1-16.9 0z"
				data-original="#fc0005"
			/>
		</svg>
	);
};
export default SVGComponent;
