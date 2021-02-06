import jwt from "jsonwebtoken";
import config from "../config/config";
import {IAdmin} from "../interfaces/admin";

const signJWT = (admin: IAdmin, callback: (error: Error | null, token: string | null) => void): void =>{

    let timeSinceEpoch = new Date().getTime();
    let expirationTime = timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
    let expirationTimeInSeconds: number = Math.floor(expirationTime / 1000);

    try{
        jwt.sign(
            {
                email: admin.email
            },
            config.server.token.secretToken,
            {
                issuer: config.server.token.issure,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            }, 
            (error, token) => {
                if(error) {
                    callback(error, null)
                } else if (token) {
                    callback(null, token)
                }
            }
        )
    } catch(error) {
        callback(error, null)
    }
}

export default signJWT;