import TransactionDetails from "@/containers/protected/TransactionDetails";

const TransactionDetailsPage = ({ params }) => {
	const { transactionId } = params;
	return (
		<>
			<TransactionDetails transactionId={transactionId} />
		</>
	);
};

export default TransactionDetailsPage;
