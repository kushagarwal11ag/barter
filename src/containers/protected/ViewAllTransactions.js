"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const ViewTransaction = () => {
	const [allTransactions, setAllTransactions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			await getAllTransactions();
		};
		fetchData();
		setLoading(false);
	}, []);

	const getAllTransactions = async () => {
		try {
			const transaction = await axios.get("/api/v1/transactions/");
			setAllTransactions(transaction?.data?.data);
		} catch (error) {
			console.log(error);
		}
	};

	if (loading)
		return (
			<section className="mx-auto max-w-7xl p-5 flex flex-col gap-5">
				{Array.from({ length: 3 }).map((_, index) => (
					<section
						key={index}
						className="flex gap-2 border border-black rounded-lg"
					>
						<div className="bg-neutral-400/50 min-w-28 sm:min-w-60 min-h-40 animate-pulse border-r border-black rounded-tl-lg rounded-bl-lg" />
						<div className="p-2 flex flex-col gap-2 w-full">
							<div className="bg-neutral-400/50 w-3/5 sm:w-1/5 h-4 animate-pulse rounded-md" />
							<div className="bg-neutral-400/50 w-3/5 sm:w-1/5 h-8 animate-pulse rounded-md" />
							<div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md" />
							<div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md" />
							<div className="mt-auto bg-neutral-400/50 w-2/5 sm:w-1/5 h-4 animate-pulse rounded-md" />
						</div>
					</section>
				))}
			</section>
		);

	return (
		<>
			<section className="mx-auto max-w-7xl p-5 flex flex-col gap-5">
				{allTransactions?.map((transaction) => (
					<section
						key={transaction._id}
						className="flex gap-2 border border-black rounded-lg"
					>
						<div className="relative min-w-28 sm:min-w-60 min-h-40">
							<Image
								src={transaction.productDetails?.image}
								alt="Product Image"
								layout="fill"
								objectFit="cover"
								className="border-r border-black rounded-tl-lg rounded-bl-lg"
							/>
						</div>
						<div className="p-2 flex flex-col gap-2 w-full">
							<h1 className="text-[#101827] text-lg sm:text-xl font-medium">
								{transaction.transactionType === "sale"
									? "Sale"
									: "Barter"}
							</h1>
							<h2 className="text-xl sm:text-3xl font-semibold">
								{transaction.productDetails?.title}
							</h2>
							<p className="text-sm">
								{transaction.productDetails?.description}
							</p>
							<p className="mt-auto text-sm text-red-600">
								{transaction.count > 1
									? transaction.count + " transactions"
									: 1 + " transaction"}
							</p>
						</div>
						{transaction.transactionType === "sale" &&
							(transaction.initiator ===
							transaction.productDetails.owner ? (
								<div className="text-center w-10 bg-blue-500 border-l border-black rounded-tr-lg rounded-br-lg [writing-mode:vertical-rl] [text-orientation:mixed]">
									OFFERED
								</div>
							) : (
								<div className="text-center w-10 bg-red-500 border-l border-black rounded-tr-lg rounded-br-lg [writing-mode:vertical-rl] [text-orientation:mixed]">
									REQUESTED
								</div>
							))}
					</section>
				))}
			</section>
		</>
	);
};

export default ViewTransaction;
