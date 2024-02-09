import React from "react";

const AddProduct = () => {
	return (
		<>
			<section className="  bg-opacity-50 h-screen my-2">
				<div className="mx-auto container max-w-2xl md:w-3/4 pb-12">
					<div className="bg-gray-100 p-4  bg-opacity-5  rounded-t">
						<div className="max-w-sm mx-auto md:w-full md:mx-0">
							<div className="inline-flex items-center space-x-4">
								<h2 className="text-4xl font-semibold ">
									Create a new post
								</h2>
							</div>
						</div>
					</div>

					<form
						action="assets/php/actions.php?addpost"
						method="post"
						enctype="multipart/form-data"
					>
						<div className="bg-white space-y-6">
							<div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-black items-center">
								<h2 className="md:w-1/3 max-w-sm mx-auto">
									Product
								</h2>
								<div className="md:w-2/3 max-w-sm mx-auto space-y-4 ">
									<div className="space-y-2">
										<label className="text-sm text-black ">
											Title
										</label>
										<div className="w-full inline-flex border ">
											<input
												type="text"
												className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
												placeholder="Enter title of product"
												name="title"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<label className="text-sm text-black ">
											Description
										</label>
										<div className="w-full inline-flex border ">
											<textarea
												id=""
												cols="30"
												rows="5"
												name="description"
												placeholder="Describe your item or write a public message"
												className="w-11/12 focus:outline-none focus:text-gray-600 resize-none"
											></textarea>
										</div>
									</div>
								</div>
							</div>

							<hr />
							<div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-600 items-center">
								<h2 className="md:w-1/3 mx-auto max-w-sm">
									Details
								</h2>
								<div className="md:w-2/3 mx-auto max-w-sm space-y-4">
									<div className="space-y-2">
										<label className="text-sm text-black">
											Category
										</label>
										<div className="w-full inline-flex border">
											<div className="w-1/12 pt-2 bg-gray-100">
												<img
													src="/images/menu.png"
													alt=""
													className="w-6 text-gray-400 mx-auto"
												/>
											</div>

											<select
												name="category"
												id=""
												className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
											>
												<option value="0">
													Select a Category
												</option>
												<option value="Electronics">
													Electronics
												</option>
												<option value="Books">
													Books
												</option>
												<option value="Clothing">
													Clothing
												</option>
												<option value="Furniture">
													Furniture
												</option>
												<option value="Sports">
													Sports
												</option>
												<option value="Vehicle">
													Vehicle
												</option>
												<option value="Random">
													Random
												</option>
											</select>
										</div>
									</div>
									<div className="space-y-2">
										<label className="text-sm text-black">
											Item Condition
										</label>
										<div className="w-full inline-flex border">
											<div className="pt-2 w-1/12 bg-gray-100">
												<img
													src="/images/quality.png"
													alt=""
													className="w-6 text-gray-400 mx-auto"
												/>
											</div>

											<select
												className="w-11/12 focus:outline-none focus:text-gray-600 p-2 "
												name="item_condition"
											>
												<option value="New">New</option>
												<option value="Like New">
													Like New
												</option>
												<option value="Good">
													Good
												</option>
												<option value="Fair">
													Fair
												</option>
											</select>
										</div>
									</div>

									<div className="space-y-2">
										<label className="text-sm text-black">
											Meeting spot
										</label>
										<div className="w-full inline-flex border">
											<div className="pt-2 w-1/12 bg-gray-100">
												<img
													src="/images/location.png"
													alt=""
													className="w-6 text-gray-400 mx-auto"
												/>
											</div>
											<input
												type="text"
												className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
												name="meeting_point"
												placeholder="Enter the address of meeting"
											/>
										</div>
									</div>
								</div>
							</div>

							<hr />
							<div className="flex justify-center ">
								<img
									src=""
									alt=""
									className="w-64 hidden"
									id="post_img"
								/>
							</div>

							<div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
								<h2 className="md:w-4/12 max-w-sm mx-auto">
									Add Photo
								</h2>
								{/* <?=showError('post_img')?> */}
								<div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
									<div className="w-full inline-flex border-b">
										<input
											type="file"
											id="select_post_img"
											name="post_img"
											className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
										/>
									</div>
								</div>

								<div className="md:w-3/12 text-center md:pl-6 ">
									<button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4  inline-flex items-center rounded-full">
										<img
											src="/checked-2.png"
											alt=""
											className="fill-current w-4 h-4 mr-2"
										/>
										<span>Post</span>
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</section>
		</>
	);
};

export default AddProduct;
