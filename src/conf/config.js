const conf = {
	endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
	projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
	databaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
	postCollectionId: String(
		process.env.NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID
	),
	bucketId: String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
};

export default conf;
