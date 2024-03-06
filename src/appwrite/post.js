import conf from "@/conf/config";
import { Client, Databases, Storage } from "appwrite";

export class PostService {
	client = new Client();
	databases;
	bucket;

	constructor() {
		this.client.setEndpoint(conf.endpoint).setProject(conf.projectId);
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	async createPost({ $id, imageId, pName, pCategory, tName, tId }) {
		try {
			return await this.databases.createDocument(
				conf.databaseId,
				conf.postCollectionId,
				$id,
				{
					imageId,
					pName,
					pCategory,
					tName,
					tId
				}
			);
		} catch (error) {
			console.log("Appwrite service :: createPost :: error");
			throw error;
		}
	}

	async updatePost(id, { imageId = null, pName, pCategory }) {
		try {
			let updateObject = {
				pName,
				pCategory,
			};

			if (imageId !== null) {
				updateObject.imageId = imageId;
			}

			return await this.databases.updateDocument(
				conf.databaseId,
				conf.postCollectionId,
				id,
				updateObject
			);
		} catch (error) {
			console.log("Appwrite serive :: updatePost :: error");
			throw error;
		}
	}

	async getPosts() {
		try {
			return await this.databases.listDocuments(
				conf.databaseId,
				conf.postCollectionId
			);
		} catch (error) {
			console.log("Appwrite service :: getPosts :: error");
			throw error;
		}
	}
	
	async deletePost(postId) {
		try {
			return await this.databases.deleteDocument(
				conf.databaseId,
				conf.postCollectionId,
				postId
			);
		} catch (error) {
			console.log("Appwrite service :: deletePost :: error");
			throw error;
		}
	}

	getFile(fileId) {
		return this.bucket.getFilePreview(conf.productImagesId, fileId);
	}

	async uploadFile(id, file) {
		try {
			return await this.bucket.createFile(conf.productImagesId, id, file);
		} catch (error) {
			console.log("Appwrite service :: uploadFile :: error");
			throw error;
		}
	}
	
	async deleteFile(id) {
		try {
			return await this.bucket.deleteFile(conf.productImagesId, id);
		} catch (error) {
			console.log("Appwrite service :: deleteFile :: error", error);
			throw error;
		}
	}
}

const postService = new PostService();

export default postService;
