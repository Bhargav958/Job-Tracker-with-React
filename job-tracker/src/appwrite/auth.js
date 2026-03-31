import {Client, Account, ID, Databases, Query} from "appwrite";
import {config} from './config';

//create a client instance
const client = new Client();
client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);

//create an account instance
const account = new Account(client);
const databases = new Databases(client);

export const registerUser = async (email, password)=>{
    return await account.create(ID.unique(),email,password);
};

export const loginUser = async (email, password)=>{
    try { // deleting any login session if exists, to avoid multiple session error
    await account.deleteSession("current"); // logout first
  } catch (e) {}
    return await account.createEmailPasswordSession(email,password);
};

export const addJob = async(title,company,status)=>{
    const user = await account.get();
    return await databases.createDocument(
        config.databaseId,
        config.collectionId,
        ID.unique(),
        {title,company,status, userId: user.$id}
    )
}

export const getJobs = async()=>{
    const user = await account.get();
    return await databases.listDocuments(config.databaseId, config.collectionId, [Query.equal("userId", user.$id)]);
}

export const deleteJob = async(id)=>{
    return await databases.deleteDocument(config.databaseId, config.collectionId, id);
}