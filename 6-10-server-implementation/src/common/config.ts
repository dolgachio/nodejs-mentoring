import dotenv from "dotenv";
import path from "path";

const envFilePath = path.resolve(__dirname, "../../.env");

dotenv.config({
    path: envFilePath,
});

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;