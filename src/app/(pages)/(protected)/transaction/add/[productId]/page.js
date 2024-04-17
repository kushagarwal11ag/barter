import AddTransaction from "@/containers/protected/AddTransaction";
const AddTransactionPage = ({ params }) => {
	const { productId } = params;
	return (
		<>
			<AddTransaction productId={productId} />
		</>
	);
};

export default AddTransactionPage;
