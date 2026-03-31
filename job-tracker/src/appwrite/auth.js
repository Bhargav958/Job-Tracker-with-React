import {Client, Account, ID} from "appwrite";
import {config} from './config';

//create a client instance
const client = new Client();
client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);

//create an account instance
const account = new Account(client);

export const registerUser = async (email, password)=>{
    return await account.create(ID.unique(),email,password);
};

export const loginUser = async (email, password)=>{
    return await account.createEmailPasswordSession(email,password);
};