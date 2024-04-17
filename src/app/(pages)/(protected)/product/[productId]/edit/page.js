import EditProduct from "@/containers/protected/EditProduct";

const EditProductPage = ({ params }) => {
	const { productId } = params;
	return (
		<>
			<EditProduct productId={productId} />
		</>
	);
};

export default EditProductPage;
