import * as sdk from 'node-appwrite';
import config from "@/config";

export const {
    ENDPOINT,
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    PATIENTS_COLLECTION_ID,
    DOCTOR_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
    BUCKET_ID,
} = config;

const client = new sdk.Client();

client
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);