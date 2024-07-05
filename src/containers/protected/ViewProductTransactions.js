"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Empty } from "antd";

const TransactionCard = ({ transaction, productId }) => {
	const isOfferedProduct = productId === transaction.productOffered?._id;
	const offeredPrice = isOfferedProduct
		? transaction.priceRequested
		: transaction.priceOffered;
	const requestedPrice = isOfferedProduct
		? transaction.priceOffered
		: transaction.priceRequested;
	const requestedImageUrl = isOfferedProduct
		? transaction.productRequested.image
		: transaction.productOffered.image;
	const offeredImageUrl = isOfferedProduct
		? transaction.productOffered.image
		: transaction.productRequested.image;
	const statusClasses = {
		pending: "bg-yellow-400 text-black",
		cancel: "bg-red-600 text-white",
		accept: "bg-green-600 text-white",
		complete: "bg-[#101827] text-white",
	};
	const statusText = {
		pending: "Pending",
		cancel: "Cancelled",
		accept: "Accepted",
		complete: "Completed",
	};

	return (
		<section key={transaction._id} className="flex flex-col gap-2">
			<section className="grid grid-cols-3 gap-2">
				<section className="h-fit border border-black rounded-lg">
					<div className="text-center bg-red-600 text-white border-b border-black rounded-tl-lg rounded-tr-lg">
						REQUESTED
					</div>
					<div className="flex flex-col justify-between gap-2">
						<p className="text-center text-lg">
							&#36;
							{offeredPrice}
						</p>
						<div className="relative h-28 sm:h-60 md:h-80">
							<Image
								src={requestedImageUrl}
								alt="Image of requested product"
								layout="fill"
								objectFit="cover"
								className="border-t border-black rounded-lg"
							/>
						</div>
					</div>
				</section>
				<div className="flex flex-col gap-2 justify-center">
					<div className="relative w-20 h-20 sm:w-40 sm:h-40 mx-auto">
						<Image
							src="/icons/doubleArrow.svg"
							alt="Exchange icon"
							layout="fill"
							objectFit="cover"
						/>
					</div>
					<div
						className={`mx-auto px-2 py-1 w-fit text-xs rounded-2xl ${
							statusClasses[transaction.orderStatus]
						}`}
					>
						{statusText[transaction.orderStatus]}
					</div>
				</div>
				<section className="h-fit border border-black rounded-lg">
					<div className="text-center bg-blue-600 text-white border-b border-black rounded-tl-lg rounded-tr-lg">
						OFFERED
					</div>
					<div className="flex flex-col justify-between gap-2">
						<p className="text-center text-lg">
							&#36;
							{requestedPrice}
						</p>
						<div className="relative h-28 sm:h-60 md:h-80">
							<Image
								src={offeredImageUrl}
								alt="Image of offered product"
								layout="fill"
								objectFit="cover"
								className="border-t border-black rounded-lg"
							/>
						</div>
					</div>
				</section>
			</section>
			<Link
				href={`/transaction/${transaction._id}`}
				className="w-fit mx-auto hover:text-red-600"
			>
				View transaction details
			</Link>
			<hr className="h-px border-0 bg-black" />
		</section>
	);
};

const ViewProductTransactions = ({ productId }) => {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		const fetchProductTransactions = async () => {
			try {
				const transactions = await axios.get(
					`/api/v1/transactions/product/${productId}`,
					{ withCredentials: true }
				);
				setTransactions(transactions?.data?.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchProductTransactions();
	}, []);

	return (
		<section className="mx-auto max-w-7xl p-5 flex flex-col gap-5">
			{transactions?.length > 0 ? (
				transactions.map((transaction) => (
					<TransactionCard
						key={transaction._id}
						transaction={transaction}
						productId={productId}
					/>
				))
			) : (
				<Empty
					description={<p>No transactions to display</p>}
					className="my-5"
				>
					<Link
						href="/explore"
						className="p-2 bg-[#101827] text-white rounded"
					>
						Explore Products
					</Link>
				</Empty>
			)}
		</section>
	);
};

export default ViewProductTransactions;
