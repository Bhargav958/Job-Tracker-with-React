import { Client, Account, Databases } from "appwrite";

export const config = {
  endpoint: "https://sgp.cloud.appwrite.io/v1",
  projectId: "69cba10b002a2442ac90",
  databaseId: "69cbab4100315f21d259",   // from top
  collectionId: "jobs"         // table name/id
};

//create a client instance
const client = new Client();
client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);

//create an account instance
export const account = new Account(client);
export const databases = new Databases(client);