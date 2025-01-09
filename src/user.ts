"use server";

import { UserBasicData } from "./interface.js";
import fs from "fs/promises";
import { existsSync } from "fs";

const dbPath = "./database.db";
const tempDbPath = "./database.db.tmp";

type DbStructure = {
    Users: {
        [chatId: string]: UserBasicData;
    };
    numberOfUsers: number;
};

export const SaveUserData = async (chatId: string, userData: UserBasicData) => {
    try {
        console.log("Saving user data for :", chatId)
        // Check if the database file exists
        if (!existsSync(dbPath)) {
            await fs.writeFile(dbPath, JSON.stringify({ Users: {}, numberOfUsers: 0 }));
        }

        // Read and parse the database
        const rawData = await fs.readFile(dbPath, "utf-8");
        const data: DbStructure = JSON.parse(rawData);

        // Check if the user already exists
        const isNewUser = !data.Users[chatId];
        console.log("is new user", isNewUser)
        data.Users[chatId] = userData;
        console.log(data.Users[chatId])

        // Increment numberOfUsers only for new users
        if (isNewUser) {
            data.numberOfUsers++;
        }

        // Write data to temporary file and rename
        await fs.writeFile(tempDbPath, JSON.stringify(data, null, 2));
        await fs.rename(tempDbPath, dbPath);

        return { success: true, response: "User data saved successfully." };
    } catch (error) {
        console.error("Error saving user data:", error);
        return { success: false, response: (error as Error).message };
    }
};

export const GetUserData = async (chatId: string) => {
    try {
        console.log("getting user data for :", chatId)
        // Check if the database file exists
        if (!existsSync(dbPath)) {
            throw new Error("Database file does not exist.");
        }

        // Read and parse the database
        const rawData = await fs.readFile(dbPath, "utf-8");
        const data: DbStructure = JSON.parse(rawData);

        
        // Check if the user exists
        if (!data.Users[chatId]) {
           return {success : false , response : 'User not found'}
        }

        return { success: true, response: data.Users[chatId] };
    } catch (error) {
        console.error("Error retrieving user data:", error);
        return { success: false, response: (error as Error).message };
    }
};
