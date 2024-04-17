"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const ViewTransaction = () => {
	const [userAs, setUserAs] = useState("initiator");
	const [
		userAsInitiatorTransactionDetails,
		setUserAsInitiatorTransactionDetails,
	] = useState([]);
	const [
		userAsRecipientTransactionDetails,
		setUserAsRecipientTransactionDetails,
	] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			await getAllUserAsInitiatorTransactions();
			await getAllUserAsRecipientTransactions();
		};
		fetchData();
	}, []);

	const getAllUserAsInitiatorTransactions = async () => {
		try {
			const transaction = await axios.get(
				"/api/v1/transactions/user/initiator"
			);
			setUserAsInitiatorTransactionDetails(transaction?.data?.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getAllUserAsRecipientTransactions = async () => {
		try {
			const transaction = await axios.get(
				"/api/v1/transactions/user/recipient"
			);
			setUserAsRecipientTransactionDetails(transaction?.data?.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<section>
				<label className="text-sm text-gray-600 font-bold">
					Select transactions to display
				</label>
				<select
					className="w-full mt-2 px-3 py-2 text-black bg-transparent outline-none border-2 border-[darkgrey] focus:border-indigo-600 shadow-sm rounded-lg"
					name="transactionDisplay"
					onChange={(e) => {
						setUserAs(e.target.value);
					}}
					value={userAs}
				>
					<option value="initiator">User as initiator</option>
					<option value="recipient">User as recipient</option>
				</select>
			</section>
			{userAs === "initiator" ? (
				userAsInitiatorTransactionDetails.length ? (
					userAsInitiatorTransactionDetails.map((transaction) => (
						<Link
							key={transaction._id}
							href={`/transaction/${transaction._id}`}
						>
							<Image
								src={transaction?.product?.image}
								width={200}
								height={200}
								alt="Image of transaction initiated by user"
								className="rounded-lg"
							/>
							<div>{transaction?.product?.title}</div>
							<div>{transaction.orderStatus}</div>
						</Link>
					))
				) : (
					<p>No transactions to display</p>
				)
			) : userAsRecipientTransactionDetails.length ? (
				userAsRecipientTransactionDetails.map((transaction) => (
					<Link
						key={transaction._id}
						href={`/transaction/${transaction._id}`}
					>
						<Image
							src={transaction?.product?.image}
							width={200}
							height={200}
							alt="Image of transaction initiated by user"
							className="rounded-lg"
						/>
						<div>{transaction?.product?.title}</div>
						<div>{transaction.orderStatus}</div>
					</Link>
				))
			) : (
				<p>No transactions to display</p>
			)}
		</>
	);
};

export default ViewTransaction;
