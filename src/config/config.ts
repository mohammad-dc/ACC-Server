import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'accdb';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'hussamisthebest';
const JWT_ISSURE = process.env.JWT_ISSURE ||  'thisisissurebb';
const EXPIRE_TIME = process.env.EXPIRE_TIME || 3600;

const MYQSL = {
    host: DB_HOST,
    name: DB_NAME,
    password: DB_PASSWORD,
    user: DB_USER
};

const SERVER = {
    port: PORT,
    token: {
        issure: JWT_ISSURE,
        secretToken: JWT_SECRET,
        expireTime: EXPIRE_TIME
    }
}

const config = {
    mysql: MYQSL,
    server: SERVER
}

export default config;