import conf from "@/conf/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class UserService {
	client = new Client();
	databases;
	bucket;

	constructor() {
		this.client.setEndpoint(conf.endpoint).setProject(conf.projectId);
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	async createUser(id, profileImageId) {
		try {
			return await this.databases.createDocument(
				conf.databaseId,
				conf.userCollectionId,
				id,
				{
					profileImageId,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: createUser :: error", error);
			throw error;
		}
	}

	async updateUser(id, profileImageId) {
		try {
			return await this.databases.updateDocument(
				conf.databaseId,
				conf.userCollectionId,
				id,
				{
					profileImageId,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: updateUser :: error", error);
			throw error;
		}
	}

	async getUser(id) {
		try {
			return await this.databases.getDocument(
				conf.databaseId,
				conf.userCollectionId,
				id
			);
		} catch (error) {
			console.log("Appwrite service :: getUser :: error", error);
			throw error;
		}
	}

	async uploadFile(id, file) {
		try {
			return await this.bucket.createFile(conf.userImagesId, id, file);
		} catch (error) {
			console.log("Appwrite service :: uploadFile :: error", error);
			throw error;
		}
	}

	async deleteFile(id) {
		try {
			return await this.bucket.deleteFile(conf.userImagesId, id);
		} catch (error) {
			console.log("Appwrite service :: deleteFile :: error", error);
			throw error;
		}
	}

	getFile(id) {
		try {
			return this.bucket.getFilePreview(conf.userImagesId, id);
		} catch (error) {
			console.log("Appwrite service :: getFile :: error", error);
			throw error;
		}
	}
}

const userService = new UserService();

export default userService;
