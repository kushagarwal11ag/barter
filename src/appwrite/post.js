import conf from "@/conf/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class PostService {
	client = new Client();
	databases;
	postImage;

	constructor() {
		this.client.setEndpoint(conf.endpoint).setProject(conf.projectId);
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	// async createPost({title, slug, content, featuredImage, status, userId}){
	//     try {
	//         return await this.databases.createDocument(
	//             conf.appwriteDatabaseId,
	//             conf.appwriteCollectionId,
	//             slug,
	//             {
	//                 title,
	//                 content,
	//                 featuredImage,
	//                 status,
	//                 userId,
	//             }
	//         )
	//     } catch (error) {
	//         console.log("Appwrite serive :: createPost :: error", error);
	//     }
	// }

	// async getPost(slug){
	//     try {
	//         return await this.databases.getDocument(
	//             conf.appwriteDatabaseId,
	//             conf.appwriteCollectionId,
	//             slug

	//         )
	//     } catch (error) {
	//         console.log("Appwrite serive :: getPost :: error", error);
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
			console.log("Appwrite serive :: getPosts :: error", error);
			return false;
		}
	}

	async uploadFile(file) {
		try {
			const id = Date.now();
			await this.bucket.createFile(conf.productImagesId, id, file);
			return id;
		} catch (error) {
			console.log("Appwrite serive :: uploadFile :: error", error);
			return false;
		}
	}

	getFile(fileId) {
		return this.bucket.getFilePreview(conf.productImagesId, fileId);
	}
}

const postService = new PostService();

export default postService;
