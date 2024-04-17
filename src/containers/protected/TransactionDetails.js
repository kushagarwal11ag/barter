"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import defaultProfile from "../../../public/defaultProfile.svg";
import uploadFile from "../../../public/uploadFile.svg";

const TransactionDetails = ({ transactionId }) => {
	const [transaction, setTransaction] = useState(null);

	useEffect(() => {
		const fetchTransactionDetails = async () => {
			const TransactionDetails = await axios.get(
				`/api/v1/transactions/${transactionId}`
			);
			setTransaction(TransactionDetails?.data?.data?.[0]);
		};
		fetchTransactionDetails();
	}, [transactionId]);

	return (
		<>
			<p>{transaction?.orderStatus} order status</p>
			<p>Remarks: {transaction?.remarks}</p>
			<section className="px-4 py-2 grid grid-cols-2 gap-4">
				<section>
					<section>
						<Image
							src={
								transaction?.productRequest?.image || uploadFile
							}
							width={400}
							height={400}
							alt="Product requested image"
							className="rounded-lg"
						/>
						<div>{transaction?.productRequest?.category}</div>
						<div>{transaction?.productRequest?.title}</div>
						<p>{transaction?.productRequest?.description}</p>
						<p>
							Condition:{" "}
							<span className="capitalize">
								{transaction?.productRequest?.condition}
							</span>
						</p>
						<div>
							<Image
								src={
									transaction?.recipientUser?.avatar ||
									defaultProfile
								}
								width={48}
								height={48}
								alt="User avatar"
								className="w-12 h-12 rounded-full object-cover"
							/>
							<span>{transaction?.recipientUser?.name}</span>
						</div>
					</section>
				</section>
				<section>
					<section>
						<Image
							src={transaction?.productOffer?.image || uploadFile}
							width={400}
							height={400}
							alt="Product offered image"
							className="rounded-lg"
						/>
						<div>{transaction?.productOffer?.category}</div>
						<div>{transaction?.productOffer?.title}</div>
						<p>{transaction?.productOffer?.description}</p>
						<p>
							Condition:{" "}
							<span className="capitalize">
								{transaction?.productOffer?.condition}
							</span>
						</p>
						<div>
							<Image
								src={
									transaction?.initiatedUser?.avatar ||
									defaultProfile
								}
								width={48}
								height={48}
								alt="User avatar"
								className="w-12 h-12 rounded-full object-cover"
							/>
							<span>{transaction?.initiatedUser?.name}</span>
						</div>
					</section>
				</section>
			</section>
		</>
	);
};

export default TransactionDetails;
