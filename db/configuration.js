import {createPool} from "mysql2";
import dotenv from 'dotenv'
dotenv.config();

//Creating a connection pool in order to connect with the mySQL Database
export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
}).promise();

