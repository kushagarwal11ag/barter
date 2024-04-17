"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

import defaultProfile from "../../../public/defaultProfile.svg";
import uploadFile from "../../../public/uploadFile.svg";

const AddTransaction = ({ productId: productRequestedId }) => {
	const router = useRouter();

	const [productRequested, setProductRequested] = useState(null);
	const [productOfferedId, setProductOfferedId] = useState("");
	const [productOffered, setProductOffered] = useState(null);
	const [myProducts, setMyProducts] = useState([]);
	const [remarks, setRemarks] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			await getProductRequestedDetails();
			await getMyProducts();
		};
		fetchData();
	}, []);

	const getProductRequestedDetails = async () => {
		try {
			const requestedProduct = await axios.get(
				`/api/v1/products/${productRequestedId}`,
				{ withCredentials: true }
			);
			const productRequestedDetails = requestedProduct?.data?.data?.[0];
			setProductRequested(productRequestedDetails);
		} catch (error) {
			console.log(error);
		}
	};

	const getMyProducts = async () => {
		try {
			const res = await axios.get("/api/v1/products/my-products", {
				withCredentials: true,
			});
			const productData = res?.data?.data;
			setMyProducts(productData);
		} catch (error) {
			console.log(error);
		}
	};

	const getProductOfferedDetails = async (productOfferedId) => {
		try {
			const offeredProduct = await axios.get(
				`/api/v1/products/${productOfferedId}`,
				{ withCredentials: true }
			);
			const productOfferedDetails = offeredProduct?.data?.data?.[0];
			setProductOffered(productOfferedDetails);
		} catch (error) {
			console.log(error);
		}
	};

	const initiateTransaction = async () => {
		try {
			await axios.post(
				`/api/v1/transactions/transaction/add/${productRequestedId}`,
				{ productOfferedId, remarks },
				{ withCredentials: true }
			);
			console.log("Successful transaction");
			router.push("/explore");
		} catch (error) {
			console.log(error);
		}
	};

	const handleProductChange = (e) => {
		setProductOfferedId(e.target.value);
		getProductOfferedDetails(e.target.value);
	};

	return (
		<>
			<div>
				<label className="text-sm text-gray-600 font-bold">
					Select product to barter
				</label>
				<select
					className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
					name="myProducts"
					onChange={handleProductChange}
					value={productOfferedId}
				>
					<option value="">Select a product</option>
					{myProducts?.length &&
						myProducts.map((product) => (
							<option key={product._id} value={product._id}>
								{product.title}
							</option>
						))}
				</select>
			</div>
			<section className="px-4 py-2 grid grid-cols-2 gap-4">
				<section>
					<div>Product To Request</div>
					<section>
						<Image
							src={productRequested?.image || uploadFile}
							width={400}
							height={400}
							alt="Product requested image"
							className="rounded-lg"
						/>
						<div>{productRequested?.category}</div>
						<div>{productRequested?.title}</div>
						<p>{productRequested?.description}</p>
						<p>
							Condition:{" "}
							<span className="capitalize">
								{productRequested?.condition}
							</span>
						</p>
						<div>
							<Image
								src={
									productRequested?.owner?.avatar ||
									defaultProfile
								}
								width={48}
								height={48}
								alt="User avatar"
								className="w-12 h-12 rounded-full object-cover"
							/>
							<span>{productRequested?.owner?.name}</span>
						</div>
					</section>
				</section>
				<section>
					<div>Product To Barter</div>
					<section>
						<Image
							src={productOffered?.image || uploadFile}
							width={400}
							height={400}
							alt="Product offered image"
							className="rounded-lg"
						/>
						<div>{productOffered?.category}</div>
						<div>{productOffered?.title}</div>
						<p>{productOffered?.description}</p>
						<p>
							Condition:{" "}
							<span className="capitalize">
								{productOffered?.condition}
							</span>
						</p>
						<div>
							<Image
								src={
									productOffered?.owner?.avatar ||
									defaultProfile
								}
								width={48}
								height={48}
								alt="User avatar"
								className="w-12 h-12 rounded-full object-cover"
							/>
							<span>{productOffered?.owner?.name}</span>
						</div>
					</section>
				</section>
				<textarea
					rows={2}
					name="remarks"
					className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
					value={remarks}
					placeholder="Enter transaction remarks"
					onChange={(e) => {
						setRemarks(e.target.value);
					}}
					minLength={3}
					maxLength={150}
				/>
				<button onClick={initiateTransaction}>
					Initiate Transaction
				</button>
			</section>
		</>
	);
};

export default AddTransaction;
