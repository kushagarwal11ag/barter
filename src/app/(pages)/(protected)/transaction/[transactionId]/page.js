import TransactionDetails from "@/containers/protected/TransactionDetails";

const ViewTransactionPage = ({ params }) => {
	const { transactionId } = params;
	return (
		<>
			<TransactionDetails transactionId={transactionId} />
		</>
	);
};

export default ViewTransactionPage;
