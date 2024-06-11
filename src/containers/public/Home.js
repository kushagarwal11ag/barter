import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<section className="bg-gray-900">
				<div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
					<div className="mr-auto place-self-center lg:col-span-7">
						<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
							Shop without spending money
						</h1>
						<p className="max-w-2xl mb-6 font-light  lg:mb-8 md:text-lg lg:text-xl text-gray-400">
							Everyday,thousands of people meet on SwapEase to
							trade for everything from clothing and furniture to
							houseplants and art
						</p>
						<Link
							href="/login"
							className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center  border  rounded-lg  focus:ring-4  text-white border-gray-700 hover:bg-gray-700 focus:ring-gray-800"
						>
							Get Started
						</Link>
					</div>
					<Image
						className="hidden lg:mt-0 lg:col-span-5 lg:flex"
						src="/barter-illustration.png"
						width={500}
						height={500}
						alt="Image illustrating bartering process"
					/>
				</div>
			</section>

			{/* Categories */}

			<h2 className="text-4xl font-bold text-center text-black my-4">
				Popular Categories
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 w-full">
				<div className="relative p-4 w-full bg-white rounded-lg overflow-hidden hover:shadow flex flex-col justify-center items-center">
					<div className="w-16 h-16 rounded-lg">
						<Image
							src="/icons/electronics.png"
							width={100}
							height={100}
							alt="Electronics image"
						/>
					</div>

					<p className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
						Electronics
					</p>
				</div>

				<div className="relative p-4 w-full bg-white rounded-lg overflow-hidden hover:shadow flex flex-col justify-center items-center">
					<div className="w-16 h-16 rounded-lg">
						<Image
							src="/icons/books.png"
							width={100}
							height={100}
							alt="Books image"
						/>
					</div>

					<p className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
						Books
					</p>
				</div>

				<div className="relative p-4 w-full bg-white rounded-lg overflow-hidden hover:shadow flex flex-col justify-center items-center">
					<div className="w-16 h-16 rounded-lg">
						<Image
							src="/icons/jacket.png"
							width={100}
							height={100}
							alt="Jacket image"
						/>
					</div>

					<p className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
						Clothing
					</p>
				</div>

				<div className="relative p-4 w-full bg-white rounded-lg overflow-hidden hover:shadow flex flex-col justify-center items-center">
					<div className="w-16 h-16 rounded-lg">
						<Image
							src="/icons/furniture.png"
							width={100}
							height={100}
							alt="Furniture image"
						/>
					</div>

					<p className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
						Furniture
					</p>
				</div>

				<div className="relative p-4 w-full bg-white rounded-lg overflow-hidden hover:shadow flex flex-col justify-center items-center">
					<div className="w-16 h-16 rounded-lg">
						<Image
							src="/icons/sports.png"
							width={100}
							height={100}
							alt="Sports image"
						/>
					</div>

					<p className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
						Sports
					</p>
				</div>

				<div className="relative p-4 w-full bg-white rounded-lg overflow-hidden hover:shadow flex flex-col justify-center items-center">
					<div className="w-16 h-16 rounded-lg">
						<Image
							src="/icons/car.png"
							width={100}
							height={100}
							alt="Vehicle image"
						/>
					</div>

					<p className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
						Vehicles
					</p>
				</div>
			</div>

			{/* Steps with SwapEase */}

			<section className="p-6 bg-gray-100 text-gray-100">
				<div className="container mx-auto">
					<span className="block mb-2 text-xs font-medium tracking-widest text-center uppercase text-[#002D74]">
						How it works
					</span>
					<h2 className="text-5xl font-bold text-center text-black">
						Working with SwapEase is simple
					</h2>
					<div className="grid gap-6 my-16 lg:grid-cols-3">
						<div className="flex flex-col p-8 space-y-4 rounded-md bg-gray-900">
							<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-violet-400 text-gray-900">
								1
							</div>
							<p className="text-2xl">
								<b>SignUp.</b> Create your free account and
								start exploring items!
							</p>
						</div>
						<div className="flex flex-col p-8 space-y-4 rounded-md bg-gray-900">
							<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-violet-400 text-gray-900">
								2
							</div>
							<p className="text-2xl">
								<b>Upload items.</b> Click a picture of your
								item and upload it.
							</p>
						</div>
						<div className="flex flex-col p-8 space-y-4 rounded-md bg-gray-900">
							<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full bg-violet-400 text-gray-900">
								3
							</div>
							<p className="text-2xl">
								<b>Trade it.</b> Connect with other people and
								start trading your items!
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}

			<div className="w-full p-4 text-center border shadow sm:p-8 bg-gray-800 border-gray-700">
				<h5 className="mb-2 text-3xl font-bold text-white">
					Start Bartering Today
				</h5>
				<p className="mb-5 text-base  sm:text-lg text-gray-400">
					Swap items anytime with SwapEase on iOS &#38; Android.
					Download the app today.
				</p>
				<div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
					<Link
						href="/"
						className="w-full sm:w-auto  focus:ring-4 focus:outline-none  text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-gray-700 hover:bg-gray-600 focus:ring-gray-700"
					>
						<svg
							className="mr-3 w-7 h-7"
							aria-hidden="true"
							focusable="false"
							data-prefix="fab"
							data-icon="apple"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 384 512"
						>
							<path
								fill="currentColor"
								d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
							></path>
						</svg>
						<div className="text-left">
							<div className="mb-1 text-xs">Download on the</div>
							<div className="-mt-1 font-sans text-sm font-semibold">
								Mac App Store
							</div>
						</div>
					</Link>
					<Link
						href="/"
						className="w-full sm:w-auto  focus:ring-4 focus:outline-none  text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 bg-gray-700 hover:bg-gray-600 focus:ring-gray-700"
					>
						<svg
							className="mr-3 w-7 h-7"
							aria-hidden="true"
							focusable="false"
							data-prefix="fab"
							data-icon="google-play"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<path
								fill="currentColor"
								d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
							></path>
						</svg>
						<div className="text-left">
							<div className="mb-1 text-xs">Get in on</div>
							<div className="-mt-1 font-sans text-sm font-semibold">
								Google Play
							</div>
						</div>
					</Link>
				</div>
			</div>

			<footer className="py-6 bg-gray-800 text-gray-50">
				<div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
					<div className="grid justify-center pt-6 lg:justify-between">
						<div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
							<span>©2023 All rights reserved</span>
							<Link href="#">
								Privacy policy
							</Link>
							<Link href="#">
								Terms of service
							</Link>
							<Link href="/contact">
								Contact Us
							</Link>
						</div>
						<div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
							<Link
								rel="noopener noreferrer"
								href="mailto:contact.swapease@gmail.com"
								title="Email"
								className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-400 text-gray-900"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									className="w-5 h-5"
								>
									<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
									<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
								</svg>
							</Link>
							<Link
								rel="noopener noreferrer"
								href="https://twitter.com/login?lang=en"
								title="Twitter"
								className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-400 text-gray-900"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 50 50"
									fill="currentColor"
									className="w-5 h-5"
								>
									<path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z"></path>
								</svg>
							</Link>
							<Link
								rel="noopener noreferrer"
								href="https://github.com/"
								title="GitHub"
								className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-400 text-gray-900"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 24 24"
									className="w-5 h-5"
								>
									<path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
