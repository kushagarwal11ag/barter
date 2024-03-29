import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import authService from "@/appwrite/auth";
import useAuth from "@/context/auth/useAuth";
import useUser from "@/context/users/useUser";

// const navigation = [{ name: "Home", href: "/", current: true }];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Example({ page = "home" }) {
	const router = useRouter();
	const { setAuthStatus } = useAuth();
	const { user, setUser } = useUser();

	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">
										Open main menu
									</span>
									{open ? (
										<XMarkIcon
											className="block h-6 w-6"
											aria-hidden="true"
										/>
									) : (
										<Bars3Icon
											className="block h-6 w-6"
											aria-hidden="true"
										/>
									)}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex flex-shrink-0 items-center">
									{page === "welcome" ? (
										<Link href="/">
											<img
												className="hidden sm:block h-8 w-auto"
												src="/mainLogo.png"
												alt="Swap Ease Logo"
											/>
											<img
												className="sm:hidden h-8 w-auto"
												src="/logo.png"
												alt="Swap Ease Logo"
											/>
										</Link>
									) : (
										<Link href="/home">
											<img
												className="h-8 w-auto"
												src="/logo.png"
												alt="Swap Ease Logo"
											/>
										</Link>
									)}
								</div>
								{/* <div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? "bg-gray-900 text-white"
														: "text-gray-300 hover:bg-gray-700 hover:text-white",
													"rounded-md px-3 py-2 text-sm font-medium"
												)}
												aria-current={
													item.current
														? "page"
														: undefined
												}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div> */}
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								{page === "home" ? (
									<Link
										href="/post/add"
										className="hidden sm:ml-6 sm:block flex space-x-4 bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 mx-1 text-sm font-medium"
									>
										Add Post
									</Link>
								) : (
									page === "welcome" && (
										<>
											<Link
												href="/login"
												className="hidden sm:block bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
											>
												Login
											</Link>
											<Link
												href="/signup"
												className="hidden sm:block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md ml-3 px-3 py-2 text-sm font-medium"
											>
												Signup
											</Link>
										</>
									)
								)}
								{page !== "welcome" && (
									<button
										type="button"
										className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
									>
										<span className="absolute -inset-1.5" />
										<span className="sr-only">
											View notifications
										</span>
										<BellIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</button>
								)}

								{/* Profile dropdown */}
								{page !== "welcome" && (
									<Menu as="div" className="relative ml-3">
										<div>
											<Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 shadow-xl">
												<span className="absolute -inset-1.5" />
												<span className="sr-only">
													Open user menu
												</span>
												<img
													className="h-8 w-8 rounded-full object-cover object-center"
													src={user.profileUrl}
													alt="User Profile Image"
												/>
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
												<Menu.Item>
													{({ active }) => (
														<Link
															href="/profile"
															className={classNames(
																active
																	? "bg-gray-200"
																	: "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Your Profile
														</Link>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<Link
															href="/contact"
															className={classNames(
																active
																	? "bg-gray-200"
																	: "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Get Help
														</Link>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<Link
															href="#"
															className={classNames(
																active
																	? "bg-gray-200"
																	: "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Settings
														</Link>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<div
															className={classNames(
																active
																	? "bg-gray-200"
																	: "",
																"cursor-pointer block px-4 py-2 text-sm text-gray-700"
															)}
															onClick={() => {
																authService
																	.logout()
																	.then(
																		() => {
																			setAuthStatus(
																				false
																			);
																			setUser(
																				{
																					$id: "",
																					profileImageId:
																						null,
																					profileUrl:
																						"/images/defaultProfile.svg",
																					userName:
																						"",
																					userEmail:
																						"",
																				}
																			);
																			router.push(
																				"/"
																			);
																		}
																	);
															}}
														>
															Sign out
														</div>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								)}
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{/* {navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block rounded-md px-3 py-2 text-base font-medium"
									)}
									aria-current={
										item.current ? "page" : undefined
									}
								>
									{item.name}
								</Disclosure.Button>
							))} */}
							{page === "home" ? (
								<Link
									href="/post/add"
									className="flex space-x-4 bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 mx-1 text-sm font-medium"
								>
									Add Post
								</Link>
							) : (
								page === "welcome" && (
									<>
										<Link
											href="/login"
											className="flex space-x-4 bg-gray-900 text-white text-gray-300  rounded-md px-3 py-2 mx-1 text-sm font-medium"
										>
											Login
										</Link>
										<Link
											href="/signup"
											className="flex space-x-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 mx-1 text-sm font-medium"
										>
											Signup
										</Link>
									</>
								)
							)}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
