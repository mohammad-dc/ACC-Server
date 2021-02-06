import mysql from "mysql";
import config from "./config";

export const con = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.name
});


 const connection = con.connect((error: Error) => {
    if(error) throw error
    console.log('database connected !!!')
 });

 export default connection;