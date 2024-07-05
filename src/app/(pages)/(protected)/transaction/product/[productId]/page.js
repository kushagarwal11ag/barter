import ViewProductTransactions from "@/containers/protected/ViewProductTransactions";

const ViewProductTransactionsPage = ({ params }) => {
	const { productId } = params;
	return <ViewProductTransactions productId={productId} />;
};

export default ViewProductTransactionsPage;
