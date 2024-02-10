import React from "react";

const NotificationBox = () => {
	return (
		<>
			<div
				id="not-drawer"
				className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 transform-none"
				tabIndex="-1"
				aria-labelledby="drawer-label"
				aria-modal="true"
				role="dialog"
			>
				<div className="flex flex-row h-full w-full overflow-y-hidden">
					<div className="flex flex-col py-8  pr-2 w-full bg-white flex-shrink-0">
						<div className="flex flex-row items-center justify-center h-12 w-full">
							<div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
								<img
									src="/images/not.png"
									alt=""
									className="w-6 h-6"
								/>
							</div>
							<div className="ml-2 font-bold text-2xl">
								Notifications
							</div>
						</div>

						<div className="flex flex-col mt-8 h-full pb-20 ">
							<div className="flex flex-col space-y-1 mt-4 -mx-2  overflow-y-auto  ">
								<div className="flex items-center p-3 bg-white rounded-lg shadow-xl  w-auto relative cursor-pointer ">
									<a href="?u=Jack">
										<img
											className="h-12 w-12 rounded-full object-cover inline-block"
											alt="user"
											src="/images/profile/camera-woman.jpg"
										/>
									</a>

									<div className="ml-3 text-sm font-normal">
										<div className="text-sm font-bold text-gray-900 flex justify-start mt-3">
											Jack Sparrow{" "}
										</div>
										<div className="text-sm font-normal flex justify-start  mb-4 ">
											unliked your post !{" "}
										</div>
										<span className="text-xs absolute bottom-0 right-2  text-gray-500 mt-10 mb-2 ">
											4 days ago
										</span>
									</div>
								</div>

								<div className="flex items-center p-3 bg-white rounded-lg 3shadow-xl  w-auto relative cursor-pointer ">
									<a href="?u=Jack">
										<img
											className="h-12 w-12 rounded-full object-cover inline-block"
											alt="user"
											src="/images/profile/white.jpg"
										/>
									</a>

									<div className="ml-3 text-sm font-normal">
										<div className="text-sm font-bold text-gray-900 flex justify-start mt-3">
											Jack Sparrow{" "}
										</div>
										<div className="text-sm font-normal flex justify-start  mb-4 ">
											liked your post !{" "}
										</div>
										<span className="text-xs absolute bottom-0 right-2  text-gray-500 mt-10 mb-2 ">
											a month ago
										</span>
									</div>
								</div>

								<div className="flex items-center p-3 bg-white rounded-lg shadow-xl  w-auto relative cursor-pointer ">
									<a href="?u=Jack">
										<img
											className="h-12 w-12 rounded-full object-cover inline-block"
											alt="user"
											src="/images/profile/truman.jpg"
										/>
									</a>

									<div className="ml-3 text-sm font-normal">
										<div className="text-sm font-bold text-gray-900 flex justify-start mt-3">
											Jack Sparrow{" "}
										</div>
										<div className="text-sm font-normal flex justify-start  mb-4 ">
											started following you !{" "}
										</div>
										<span className="text-xs absolute bottom-0 right-2  text-gray-500 mt-10 mb-2 ">
											a month ago
										</span>
									</div>
								</div>

								<div className="flex items-center p-3 bg-white rounded-lg shadow-xl  w-auto relative cursor-pointer ">
									<a href="?u=sadas">
										<img
											className="h-12 w-12 rounded-full object-cover inline-block"
											alt="user"
											src="/images/profile/sunglasses.jpg"
										/>
									</a>

									<div className="ml-3 text-sm font-normal">
										<div className="text-sm font-bold text-gray-900 flex justify-start mt-3"></div>
										<div className="text-sm font-normal flex justify-start  mb-4 ">
											liked your post !{" "}
										</div>
										<span className="text-xs absolute bottom-0 right-2  text-gray-500 mt-10 mb-2 ">
											6 months ago
										</span>
									</div>
								</div>

								<div className="flex items-center p-3 bg-white rounded-lg shadow-xl  w-auto relative cursor-pointer ">
									<a href="?u=Jethalal">
										<img
											className="h-12 w-12 rounded-full object-cover inline-block"
											alt="user"
											src="/images/profile/silhouette.jpg"
										/>
									</a>

									<div className="ml-3 text-sm font-normal">
										<div className="text-sm font-bold text-gray-900 flex justify-start mt-3">
											Jethalal Gada{" "}
										</div>
										<div className="text-sm font-normal flex justify-start  mb-4 ">
											liked your post !{" "}
										</div>
										<span className="text-xs absolute bottom-0 right-2  text-gray-500 mt-10 mb-2 ">
											10 months ago
										</span>
									</div>
								</div>

								<div className="flex items-center p-3 bg-white rounded-lg shadow-xl  w-auto relative cursor-pointer ">
									<a href="?u=Jethalal">
										<img
											className="h-12 w-12 rounded-full object-cover inline-block"
											alt="user"
											src="/images/profile/silencer.jpg"
										/>
									</a>

									<div className="ml-3 text-sm font-normal">
										<div className="text-sm font-bold text-gray-900 flex justify-start mt-3">
											Jethalal Gada{" "}
										</div>
										<div className="text-sm font-normal flex justify-start  mb-4 ">
											liked your post !{" "}
										</div>
										<span className="text-xs absolute bottom-0 right-2  text-gray-500 mt-10 mb-2 ">
											10 months ago
										</span>
									</div>
								</div>

								<div className="flex items-center p-3 bg-white rounded-lg shadow-xl  w-auto relative cursor-pointer ">
									<a href="?u=Nobita">
										<img
											className="h-12 w-12 rounded-full object-cover inline-block"
											alt="user"
											src="/images/profile/gaurav.jpg"
										/>
									</a>

									<div className="ml-3 text-sm font-normal">
										<div className="text-sm font-bold text-gray-900 flex justify-start mt-3">
											Nobita Nobi{" "}
										</div>
										<div className="text-sm font-normal flex justify-start  mb-4 ">
											unliked your post !{" "}
										</div>
										<span className="text-xs absolute bottom-0 right-2  text-gray-500 mt-10 mb-2 ">
											10 months ago
										</span>
									</div>
								</div>

								<div className="flex items-center p-3 bg-white rounded-lg shadow-xl  w-auto relative cursor-pointer ">
									<a href="?u=Nobita">
										<img
											className="h-12 w-12 rounded-full object-cover inline-block"
											alt="user"
											src="/images/profile/black.jpg"
										/>
									</a>

									<div className="ml-3 text-sm font-normal">
										<div className="text-sm font-bold text-gray-900 flex justify-start mt-3">
											Nobita Nobi{" "}
										</div>
										<div className="text-sm font-normal flex justify-start  mb-4 ">
											liked your post !{" "}
										</div>
										<span className="text-xs absolute bottom-0 right-2  text-gray-500 mt-10 mb-2 ">
											10 months ago
										</span>
									</div>
								</div>

								<div className="flex items-center p-3 bg-white rounded-lg shadow-xl  w-auto relative cursor-pointer ">
									<a href="?u=Nobita">
										<img
											className="h-12 w-12 rounded-full object-cover inline-block"
											alt="user"
											src="/images/profile/bhuvan.jpg"
										/>
									</a>

									<div className="ml-3 text-sm font-normal">
										<div className="text-sm font-bold text-gray-900 flex justify-start mt-3">
											Nobita Nobi{" "}
										</div>
										<div className="text-sm font-normal flex justify-start  mb-4 ">
											unliked your post !{" "}
										</div>
										<span className="text-xs absolute bottom-0 right-2  text-gray-500 mt-10 mb-2 ">
											10 months ago
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<button
						type="button"
						data-drawer-hide="not-drawer"
						aria-controls="not-drawer"
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

export default NotificationBox;
