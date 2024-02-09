import React from "react";

const Navbar = () => {
	return (
		<>
			<nav className="bg-white border-gray-200 ">
				<div className="max-w-screen-xl flex flex-wrap   items-center justify-between mx-auto p-4">
					<a href="?" className="">
						<img
							src="/images/sl10.png"
							className="h-10 flex justify-start"
							alt="SwapEase Logo"
						/>
					</a>
					<div className="hidden md:flex  items-center space-x-1">
						<a
							href="?"
							className="py-2 px-3  text-gray-700 hover:text-black  "
						>
							Home
						</a>
						<a
							href="?explore"
							className="py-2 px-3  text-gray-700 hover:text-black "
						>
							Explore
						</a>
					</div>

					<div className=" fixed bottom-0 left-0 z-50 w-full mx-24 ">
						<div className="w-full ">
							<section
								id="bottom-navigation"
								className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow "
							>
								<div id="tabs" className="flex justify-between">
									<a
										href="?"
										className="w-full   hover:text-purple-600 justify-center inline-block text-center pt-2 pb-1"
									>
										<img
											src="/images/home-button.png"
											alt=""
											className="inline-block mb-1 h-6 w-6"
										/>
										<span className=" block text-xs">Home</span>
									</a>
									<a
										href="?explore"
										className="w-full  hover:text-purple-600 justify-center inline-block text-center pt-2 pb-1"
									>
										<img
											src="/images/search (2).png"
											alt=""
											className="inline-block mb-1 h-6 w-6 "
										/>
										<span className=" block text-xs">
											Explore
										</span>
									</a>
									<a
										href="?add_product"
										className="w-full relative  hover:text-purple-600 justify-center inline-block text-center pt-2 pb-1 hover:scale-105 hover:shadow-xl duration-500  rounded-full"
									>
										<img
											src="/images/add8.png"
											alt=""
											className="inline-block mb-1 h-10 w-10"
										/>
									</a>

									{/* <?php
            if (getUnreadNotificationsCount() > 0) {
              ?> */}

									<button
										type="button"
										data-drawer-target="not-drawer"
										data-drawer-show="not-drawer"
										id="show_not1"
										className="  hover:text-purple-600 justify-center inline-block text-center pt-2 pb-1 relative  w-full"
									>
										<img
											src="/images/notification.png"
											alt=""
											className="inline-block mb-1 h-6 w-6"
										/>

										<span className=" block text-xs">
											Notification
										</span>
										<div className="absolute right-5 top-0  bg-red-500 rounded-full un-count1 w-5 h-5 text-sm text-white  text-center">
											{/* <?= getUnreadNotificationsCount() ?> */}
										</div>
									</button>
									{/* <?php

            } else {
              ?> */}
									<button
										type="button"
										data-drawer-target="not-drawer"
										data-drawer-show="not-drawer"
										className="w-full  hover:text-purple-600 justify-center inline-block text-center pt-2 pb-1"
									>
										<img
											src="/images/notification.png"
											alt=""
											className="inline-block mb-1 h-6 w-6"
										/>
										<span className=" block text-xs">
											Notification
										</span>
									</button>

									<button
										type="button"
										data-drawer-target="drawer-example"
										data-drawer-show="drawer-example"
										className="  hover:text-purple-600 justify-center inline-block text-center pt-2 pb-1 w-full relative"
									>
										<img
											src="/images/messenger.png"
											alt=""
											className="inline-block mb-1 h-6 w-6 "
										/>
										<div
											className="absolute right-5 top-0 bg-red-500 rounded-full text-sm text-white  w-5 h-5 un-count"
											id="msgcounter1"
										></div>

										<span className=" block text-xs">
											Message
										</span>
									</button>
								</div>
							</section>
						</div>
					</div>

					<form
						className=" items-center hidden md:flex"
						id="searchform"
						actions="?search"
					>
						<label for="simple-search" className="sr-only">
							Search
						</label>
						<div className="relative w-full">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-gray-500"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
										clip-rule="evenodd"
									></path>
								</svg>
							</div>
							<input
								type="search"
								name="search"
								placeholder="Search items"
								id="search"
								autocomplete="off"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2.5"
								required
							/>
						</div>
						<button
							type="submit"
							className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								></path>
							</svg>
							<span className="sr-only">Search</span>
						</button>
					</form>

					<div className="hidden md:flex   mr-4 items-center ">
						<div className="block relative ">
							<a href="?add_product">
								<button
									type="button"
									className="inline-block py-2 px-3  rounded-full relative "
								>
									<div className="flex items-center h-5  ">
										<img
											src="/images/add8.png"
											alt=""
											title="add product"
											className=" hover:scale-105 hover:shadow-xl duration-500  rounded-full block h-9 w-9 fill-[currentcolor]"
										/>
									</div>
								</button>
							</a>

							{/* <?php
        if (getUnreadNotificationsCount() > 0) {
          ?> */}
							<button
								type="button"
								id="show_not"
								className="inline-block py-2 px-3  rounded-full relative "
								data-drawer-target="not-drawer"
								data-drawer-show="not-drawer"
							>
								<div className="absolute right-0 -top-1  bg-red-500 rounded-full un-count w-6 h-6 text-sm text-white  text-center">
									{/* <?= getUnreadNotificationsCount() ?> */}
								</div>
								<div className="flex items-center h-5">
									<img
										src="/images/notification.png"
										alt=""
                                        className="block h-6 w-6 fill-[currentcolor]"
									/>
								</div>
							</button>

							<button
								type="button"
								className="inline-block py-2 px-3  rounded-full relative "
								data-drawer-target="not-drawer"
								data-drawer-show="not-drawer"
							>
								<div className="flex items-center h-5">
									<img
										src="/images/notification.png"
										alt=""
										className="block h-6 w-6 fill-[currentcolor]"
									/>
								</div>
							</button>

							<button
								type="button"
								className="inline-block py-2 px-3  rounded-full relative "
								data-drawer-target="drawer-example"
								data-drawer-show="drawer-example"
							>
								<div
									className="absolute right-0 -top-1  bg-red-500 rounded-full text-sm text-white  w-6 h-6 un-count"
									id="msgcounter"
								></div>

								<div className="flex items-center h-5">
									<img
										src="/images/messenger.png"
										alt=""
										className="block h-6 w-6 fill-[currentcolor]"
									/>
								</div>
							</button>
						</div>
					</div>
					<div className="flex items-center md:order-2">
						<button
							type="button"
							className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 "
							id="user-menu-button"
							aria-expanded="false"
							data-dropdown-toggle="user-dropdown"
							data-dropdown-placement="bottom"
						>
							<span className="sr-only">Open user menu</span>
							<img
								src="/images/profile/<?= $user['profile_pic'] ?>"
								alt=""
								className="w-10 h-10 object-cover rounded-full"
							/>
						</button>

						{/* Dropdown menu */}
						<div
							className="z-50 hidden my-4 text-base list-none bg-gray-800 text-white divide-y divide-gray-100 rounded-lg shadow "
							id="user-dropdown"
						>
							<div className="px-4 py-3">
								<span className="block text-sm text-white ">
									{/* <?= $user['first_name'] ?>
            <?= $user['last_name'] ?> */}
								</span>
								<span className="block text-sm  text-white truncate ">
									{/* <?= $user['email'] ?> */}
								</span>
							</div>
							<ul
								className="ml-2 py-2 space-y-3"
								aria-labelledby="user-menu-button"
							>
								<li className="font-medium">
									<a
										href="?u=<?= $user['username'] ?>"
										className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-500"
									>
										<div className="mr-3">
											<svg
												className="w-6 h-6"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												></path>
											</svg>
										</div>
										Account
									</a>
								</li>
								<li className="font-medium">
									<a
										href="?contact"
										className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-500"
									>
										<div className="mr-3">
											<img
												src="/images/support.png"
												className="w-6 h-6 text-white"
												alt=""
											/>
										</div>
										Help
									</a>
								</li>
								<hr className="dark:border-gray-700" />
								<li className="font-medium">
									<a
										href="assets/php/actions.php?logout"
										className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
									>
										<div className="mr-3 text-red-600">
											<svg
												className="w-6 h-6"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
												></path>
											</svg>
										</div>
										Logout
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
