import {ID, Query} from "node-appwrite";
import {users} from "@/lib/appwrite.config";
import {parseStringify} from "@/lib/utils";

export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name,
        );

        return parseStringify(newUser);
    } catch (error: any) {
        console.error("Error in createUser:", error);
        if (error && error?.code === 409) {
            const documents = await users.list([
                Query.equal("email", [user.email])
            ])

            return documents.users[0];
        }
    }
}