import Image from "next/image";
const Contact = () => {
	return (
		<>
			<div className="pt-8 text-center">
				<h2 className="text-4xl lg:text-5xl font-bold leading-tight">
					Get in touch
				</h2>
				<p className="text-gray-700 mt-8 text-2xl">
					We are here to help
				</p>
			</div>
			<div className="max-w-7xl mx-auto px-8 grid gap-8 grid-cols-1 md:grid-cols-2 py-16 text-gray-900 rounded-lg ">
				<div className="flex flex-col justify-between bg-gray-100">
					<Image
						className="w-full h-full"
						src="/contact.svg"
						alt="Contact us image"
						width={500}
						height={500}
					/>
				</div>
				<form>
					<div>
						<span className="text-sm text-gray-600 font-bold">
							Name
						</span>
						<input
							className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
							type="text"
							placeholder=""
							name="name"
							required
						/>
					</div>
					<div className="mt-8">
						<span className="text-sm text-gray-600 font-bold">
							Email
						</span>
						<input
							className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
							type="email"
							name="email"
							required
						/>
					</div>
					<div className="mt-8">
						<span className="text-sm text-gray-600 font-bold">
							Message
						</span>
						<textarea
							required
							name="message"
							className="w-full mt-2 h-36 px-3 py-2 text-black resize-none appearance-none bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
						></textarea>
					</div>
					<div className="mt-8">
						<button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Contact;
