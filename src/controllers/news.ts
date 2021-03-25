import {Request, Response, NextFunction} from "express";
import fs from "fs";
import {con} from "../config/db";

const getAllNews = (req: Request, res: Response, next: NextFunction) => {
    con.query('SELECT id, title, description, image, date_time FROM news', (error, results, fields) =>{
        if(error) throw error
        if(results) {
            res.status(200).json({
                success: true,
                results,
                count: results.length
            })
        }
    })
}

const retrieveNews = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;

    con.query(`SELECT id, title, description, image, date_time FROM news WHERE id=${id}`, (error, results, fields) =>{
        if(error) throw error
        if(results) {
            res.status(200).json({
                success: true,
                results,
            })
        }
    })
}

const addNews = (req: Request, res: Response, next: NextFunction) => {
    let {title, description} = req.body;
    let image =`acc${req.file.path.split('acc')[1].trim()}`;

    try{
        con.query(`INSERT INTO news (title, description, image) VALUES ('${title}', '${description}',' ${image}')`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                res.status(200).json({
                    success: true,
                    message: "تم اضافة الخبر بنجاح"
                })
            }
        })
    } 
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
}

const updateNews = (req: Request, res: Response, next: NextFunction) => {
    let {title, description} = req.body;
    let {id} = req.params;

    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM news WHERE id=${id}`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                req.file?
                fs.unlink(`/src/uploads/${results[0].image.trim()}`, (error) => {
                    let image =`acc${req.file.path.split('acc')[1].trim()}`;
                    if(error) throw error;
                    con.query(`UPDATE news SET title='${title}', description='${description}', image='${image}' WHERE id=${id}`, (error, results, fields) =>{
                        if(error) throw error
                        if(results) {
                            res.status(200).json({
                                success: true,
                                message: "تم تعديل الخبر بنجاح"
                            })
                        }
                    })
                }) :
                con.query(`UPDATE news SET title='${title}', description='${description}' WHERE id=${id}`, (error, results, fields) =>{
                    if(error) throw error
                    if(results) {
                        res.status(200).json({
                            success: true,
                            message: "تم تعديل الخبر بنجاح"
                        })
                    }
                })
            }
        })
    } 
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
}

const deleteNews = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;
    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM news WHERE id=${id}`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                fs.unlink(`src/uploads/${results[0].image.trim()}`, (error) => {
                    if(error) throw error;
                    con.query(`DELETE FROM news WHERE id=${id}`, (error, results, fields) =>{
                        if(error) throw error
                        if(results) {
                            res.status(200).json({
                                success: true,
                                message: "تم حذف الخبر بنجاح"
                            })
                        }
                    })
                })
            }
        })
    } 
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
}

export default {
    getAllNews,
    retrieveNews,
    addNews,
    updateNews,
    deleteNews
}
