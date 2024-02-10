import React from "react";

const EditProfile = () => {
	return (
		<>
			<div className=" flex items-center justify-center ">
				<div className="container max-w-screen-lg mx-auto pb-12 md:pb-0">
					<div>
						<form
							action=""
							method="post"
							enctype="multipart/form-data"
						>
							<div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
								<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
									<div className="text-gray-600">
										<p className="font-medium text-lg">
											Edit Profile
										</p>
										<p>Please fill out all the fields.</p>
										<img
											src="/images/profile/bhuvan.jpg"
											alt=""
											className="w-52 h-52 mt-10 mb-7 rounded-full object-cover"
										/>
										<label className="">Upload new photo</label>
										<input
											type="file"
											name="profile_pic"
											className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
											value=""
										/>
									</div>

									<div className="lg:col-span-2">
										<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
											<div className="md:col-span-5">
												<label>Name</label>
												<input
													type="text"
													name="name"
													className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
													value=""
													placeholder="Name"
												/>
											</div>

											<div className="md:col-span-3">
												<label>Email</label>
												<input
													type="email"
													name="email"
													className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
													value=""
													placeholder=""
													disabled
												/>
											</div>

											<div className="md:col-span-2">
												<label>Contact no.</label>
												<input
													type="number"
													name="contact"
													className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
													value=""
													placeholder=""
												/>
											</div>

											<div className="md:col-span-3">
												<label for="address">
													Address / Street
												</label>
												<input
													type="text"
													name="address"
													id="address"
													className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
													value=""
													placeholder=""
												/>
											</div>

											<div className="md:col-span-2">
												<label for="city">City</label>
												<input
													type="text"
													name="city"
													id="city"
													className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
													value=""
													placeholder=""
												/>
											</div>

											<div className="md:col-span-2">
												<label for="country">
													Country / region
												</label>
												<div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
													<input
														name="country"
														id="country"
														placeholder="Country"
														type="text"
														className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
														value=""
													/>
												</div>
											</div>

											<div className="md:col-span-2">
												<label for="state">
													State / province
												</label>
												<div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
													<input
														name="state"
														id="state"
														placeholder="State"
														className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
														value=""
													/>
												</div>
											</div>

											<div className="md:col-span-1">
												<label for="zipcode">
													Zipcode
												</label>
												<input
													type="text"
													name="zipcode"
													id="zipcode"
													className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
													placeholder=""
													value=""
												/>
											</div>

											<div className="md:col-span-5">
												<label>Bio</label>

												<input
													type="text"
													name="bio"
													className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
													placeholder=""
													value=""
												/>
											</div>

											<div className="md:col-span-5 ">
												<div className="inline-flex items-end">
													<button className="bg-[#002D74] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
														Update profile
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditProfile;
