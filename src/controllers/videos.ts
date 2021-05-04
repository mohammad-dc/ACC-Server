import {Request, Response, NextFunction} from "express";
import fs from "fs";
import {con} from "../config/db";

const addVideos = (req: Request, res: Response, next: NextFunction) => {
    let {course_id, url} = req.body;

    try{
        con.query(`INSERT INTO videos (course_id, url) VALUES (${course_id}, '${url}')`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                res.status(200).json({
                    success: true,
                    message: "تم اضافة الفيديو بنجاح"
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

const updateVideos = (req: Request, res: Response, next: NextFunction) => {
    let {url} = req.body;
    let {id} = req.params;

    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM videos WHERE id=${id}`, (error, results, fields) =>{
            if(error) throw error
            if(results){
                con.query(`UPDATE videos SET url='${url}' WHERE id=${id}`, (error, results, fields) =>{
                    if(error) throw error
                    if(results) {
                        res.status(200).json({
                            success: true,
                            message: "تم تعديل الفيديو بنجاح"
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

const deleteVideos = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;
    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM videos WHERE id=${id}`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                con.query(`DELETE FROM videos WHERE id=${id}`, (error, results, fields) =>{
                    if(error) throw error
                    if(results) {
                        res.status(200).json({
                            success: true,
                            message: "تم حذف الفيديو بنجاح"
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

export default {
    addVideos,
    updateVideos,
    deleteVideos
}
