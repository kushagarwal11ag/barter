import conf from "@/conf/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class PostService {
	client = new Client();
	databases;
	bucket;

	constructor() {
		this.client.setEndpoint(conf.endpoint).setProject(conf.projectId);
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	async createPost({ $id, imageId, pName, pCategory, tName, tPhone }) {
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
					tPhone,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: createPost :: error", error);
			throw error;
		}
	}

	// async getPost(slug){
	//     try {
	//         return await this.databases.getDocument(
	//             conf.appwriteDatabaseId,
	//             conf.appwriteCollectionId,
	//             slug

	//         )
	//     } catch (error) {
	//         console.log("Appwrite service :: getPost :: error", error);
	//         return false
	//     }
	// }

	async getPosts() {
		try {
			return await this.databases.listDocuments(
				conf.databaseId,
				conf.postCollectionId
			);
		} catch (error) {
			console.log("Appwrite service :: getPosts :: error", error);
			throw error;
		}
	}

	async uploadFile(id, file) {
		try {
			return await this.bucket.createFile(conf.productImagesId, id, file);
		} catch (error) {
			console.log("Appwrite service :: uploadFile :: error", error);
			throw error;
		}
	}

	getFile(fileId) {
		return this.bucket.getFilePreview(conf.productImagesId, fileId);
	}
}

const postService = new PostService();

export default postService;
