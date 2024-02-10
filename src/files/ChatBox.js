import React from "react";

const ChatBox = () => {
	return (
		<>
			<div
				// id="drawer-example"
				className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto bg-white w-80 "
				// tabIndex="-1"
				aria-labelledby="drawer-label"
			>
				<div className="flex flex-row h-full w-full overflow-x-hidden">
					<div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
						<div className="flex flex-row items-center justify-center h-12 w-full">
							<div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
									></path>
								</svg>
							</div>
							<div className="ml-2 font-bold text-2xl">
								QuickChat
							</div>
						</div>
						<div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
							<div className="h-20 w-20 rounded-full border overflow-hidden ">
								<img
									src="/images/profile/bhuvan.jpg"
									alt="Avatar"
									className="h-full w-full object-cover"
								/>
							</div>
							<div className="text-sm font-semibold mt-2"></div>
							<div className="text-xs text-gray-500"></div>
							<div className="flex flex-row items-center mt-3">
								<div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
									<div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
								</div>
								<div className="leading-none ml-1 text-xs">
									Active
								</div>
							</div>
						</div>
						<div className="flex flex-col mt-8">
							<div className="flex flex-row items-center justify-between text-lg">
								<span className="font-bold">
									Active Conversations
								</span>
							</div>
							<div
								className="flex flex-col space-y-1 mt-4 -mx-2 h-72	 overflow-y-auto"
								id="chatlist"
							>
								{/* this is the chats section */}
								<div
									class="flex items-center p-3 bg-white rounded-lg shadow-xl  w-auto relative cursor-pointer chatlist_item"
									onclick="openModal();popchat(40)"
								>
									<span class="text-xs font-bold uppercase px-2 mt-2 mr-1 text-green-900 bg-green-400 border rounded-full absolute top-0 right-0 hidden">
										New
									</span>

									<img
										class="h-12 w-12 rounded-full object-cover"
										alt="user"
										src="/images/profile/black.jpg"
									/>

									<div class="ml-3 text-sm font-normal">
										<div class="text-sm font-bold text-gray-900 flex justify-start mt-3">
											Sanju Samson
										</div>
										<div class="text-sm font-normal flex justify-star mb-5">
											Want
										</div>
										<span class="text-xs font-semibold uppercase m-1 py-1 mr-3 text-gray-500 absolute bottom-0 right-0">
											20:02
										</span>
									</div>
								</div>
								<div
									class="flex items-center p-3 bg-white rounded-lg shadow-xl  w-auto relative cursor-pointer chatlist_item"
									onclick="openModal();popchat(40)"
								>
									<span class="text-xs font-bold uppercase px-2 mt-2 mr-1 text-green-900 bg-green-400 border rounded-full absolute top-0 right-0">
										New
									</span>

									<img
										class="h-12 w-12 rounded-full object-cover"
										alt="user"
										src="/images/profile/camera-woman.jpg"
									/>

									<div class="ml-3 text-sm font-normal">
										<div class="text-sm font-bold text-gray-900 flex justify-start mt-3">
											Camera
										</div>
										<div class="text-sm font-normal flex justify-star mb-5">
											Hi
										</div>
										<span class="text-xs font-semibold uppercase m-1 py-1 mr-3 text-gray-500 absolute bottom-0 right-0">
											21:25
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<button
						type="button"
						data-drawer-hide="drawer-example"
						aria-controls="drawer-example"
						className="text-gray-900 bg-gray-300  hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
					>
						<svg
							aria-hidden="true"
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
						<span className="sr-only">Close menu</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default ChatBox;
