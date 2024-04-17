"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import defaultProfile from "../../../public/defaultProfile.svg";
import uploadFile from "../../../public/uploadFile.svg";

const AddTransaction = ({ productId: productRequestedId }) => {
	const [productRequested, setProductRequested] = useState(null);
	const [productOffered, setProductOffered] = useState(null);
	const [remarks, setRemarks] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			await getProductRequestedDetails();
		};
		fetchData();
	}, []);

	const getProductRequestedDetails = async () => {
		try {
            console.log(productRequestedId)
			const requestedProduct = await axios.get(
				`/api/v1/products/${productRequestedId}`,
				{ withCredentials: true }
			);
			const productRequestedDetails = requestedProduct?.data?.data?.[0];
            console.log(productRequestedDetails)
			setProductRequested(productRequestedDetails);
		} catch (error) {
			console.log(error);
		}
	};

	const getProductOfferedDetails = async () => {
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
		const initiate = await axios.post(
			`/api/v1/transactions/transaction/add/${productRequestedId}`,
			{ productOfferedId: productOffered?._id, remarks },
			{ withCredentials: true }
		);
	};

	return (
		<>
			<section className="px-4 py-2 grid grid-cols-2 gap-4">
				<section>
					<div>Product To Request</div>
					<section>
						<Image
							src={productRequested?.image || uploadFile}
							width={500}
							height={700}
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
				<section>Product To Barter</section>
			</section>
		</>
	);
};

export default AddTransaction;
