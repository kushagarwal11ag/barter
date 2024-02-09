import React from "react";
import "@/components/Login.css";

const Signup = () => {
	return (
		<>
			<div className="relative min-h-screen flex ">
				<div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
					<div
						className="sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto items-center justify-start p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
						style={{
							backgroundImage:
								"url(https://images.unsplash.com/photo-1579451861283-a2239070aaa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80)",
						}}
					>
						<div className="absolute bg-gradient-to-b from-blue-900 to-gray-900 opacity-75 inset-0 z-0"></div>
						<div className="absolute border-l-[25rem] border-l-transparent border-t-[60rem] border-t-white border-solid min-h-screen right-0 w-16"></div>

						<a className="flex absolute top-5 text-center text-gray-100 focus:outline-none">
							<img
								src="/images/sl10.png"
								alt=""
								className="object-cover mx-auto w-40"
							/>
						</a>

						<img
							src="/images/3d.png"
							className="h-96 absolute right-5 mr-5"
						/>

						<ul className="circles">
							<li className="circle circle-1"></li>
							<li className="circle circle-2"></li>
							<li className="circle circle-3"></li>
							<li className="circle circle-4"></li>
							<li className="circle circle-5"></li>
							<li className="circle circle-6"></li>
							<li className="circle circle-7"></li>
							<li className="circle circle-8"></li>
							<li className="circle circle-9"></li>
							<li className="circle circle-10"></li>
						</ul>
					</div>
					<div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full  xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white ">
						<div className="max-w-md w-full space-y-8">
							<div className="text-center">
								<h2 className="mt-6 text-3xl font-bold text-gray-900">
									Welcome to SwapEase
								</h2>
								<p className="mt-2 text-sm text-gray-500">
									Please create your account
								</p>
							</div>

							<form
								className="mt-8 space-y-6"
								action="assets/php/actions.php?signup"
								method="POST"
							>
								<div className="relative">
									<label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
										UserName
									</label>
									<input
										className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
										type="text"
										placeholder="Enter your username"
										name="username"
										// value="<?=showFormData('username')?>"
									/>
									{/* <?=showError('username')?> */}
								</div>

								<div className="relative">
									<label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
										Email
									</label>
									<input
										className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
										type="email"
										placeholder="mail@gmail.com"
										name="email"
										// value="<?=showFormData('email')?>"
									/>
									{/* <?=showError('email')?> */}
								</div>
								<div className="mt-8 content-center relative">
									<label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
										Password
									</label>
									<input
										id="pass1"
										className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
										type="password"
										placeholder="Enter your password"
										name="password"
										value=""
									/>
									{/* <?=showError('password')?> */}

									<span
										className="absolute  right-5 -translate-y-1/2  top-[48px]"
										onclick=" hidepassword()"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="gray"
											id="hide1"
											className="hidden bi bi-eye "
											viewBox="0 0 16 16"
										>
											<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
											<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											id="hide2"
											className=" bi bi-eye-slash "
											viewBox="0 0 16 16"
										>
											<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
											<path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
											<path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
										</svg>
									</span>
								</div>
								<div className="flex items-center justify-between"></div>
								<div>
									<button
										type="submit"
										name="submit"
										className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
									>
										Join Now
									</button>
								</div>
								<p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
									<span>Already have an account?</span>
									<a
										href="?login"
										className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
									>
										Login
									</a>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>

			{/* <script src="assets/js/login.js"></script> */}
		</>
	);
};

export default Signup;
