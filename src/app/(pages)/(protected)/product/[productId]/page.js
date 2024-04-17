import ProductDetails from "@/containers/protected/ProductDetails";

const ProductDetailsPage = ({ params }) => {
	const { productId } = params;
	return (
		<>
			<ProductDetails productId={productId} />
		</>
	);
};

export default ProductDetailsPage;
