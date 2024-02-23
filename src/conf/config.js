const conf = {
	endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
	projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
	databaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
	postCollectionId: String(
		process.env.NEXT_PUBLIC_APPWRITE_DATABASE_POST_COLLECTION_ID
	),
	userCollectionId: String(
		process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USER_COLLECTION_ID
	),
	userImagesId: String(
		process.env.NEXT_PUBLIC_APPWRITE_BUCKET_USER_IMAGES_ID
	),
	productImagesId: String(
		process.env.NEXT_PUBLIC_APPWRITE_BUCKET_POST_IMAGES_ID
	),
};

export default conf;
