import {Request, Response, NextFunction} from "express";
import {con} from "../config/db";
import signJWT from "../functions/signJWT";

const login = (req: Request, res: Response, next: NextFunction) =>{
    let {email, password} = req.body;

    con.query(`SELECT * FROM admin WHERE email='${email}'`, (error, results, fields) =>{
        if(error) throw error
        signJWT(results[0], (_error, token) =>{
            if(_error){
                return res.status(500).json({
                    success: false,
                    message: _error.message,
                    error: _error
                })
            } else if(token){
                return res.status(200).json({
                    success: true,
                    message: 'Auth Successfully!!!',
                    token
                })
            }
        })
    })

}

export default {
    login
}