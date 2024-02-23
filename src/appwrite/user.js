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

	async createUser({ $id, profileImageId }) {
		try {
			return await this.databases.createDocument(
				conf.databaseId,
				conf.userCollectionId,
				$id,
				{
					profileImageId,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: createUser :: error", error);
		}
	}

	async updateUser({ $id, profileImageId }) {
		try {
			return await this.databases.updateDocument(
				conf.databaseId,
				conf.userCollectionId,
				$id,
				{
					profileImageId,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: updateUser :: error", error);
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
			return false;
		}
	}

	async uploadProfileImage(id, file) {
		try {
			return await this.bucket.createFile(conf.userImagesId, id, file);
		} catch (error) {
			console.log(
				"Appwrite service :: uploadProfileImage :: error",
				error
			);
			return false;
		}
	}

	getProfileImage(id) {
		return this.bucket.getFilePreview(conf.userImagesId, id);
	}
}

const userService = new UserService();

export default userService;
