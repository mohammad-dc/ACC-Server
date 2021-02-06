import {Request, Response, NextFunction} from "express";
import fs from "fs";
import {con} from "../config/db";

const getAllCourses = (req: Request, res: Response, next: NextFunction) => {
    con.query('SELECT * FROM courses', (error, results, fields) =>{
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

const retrieveCourses = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;

    con.query(`SELECT * FROM courses WHERE id=${id}`, (error, results, fields) =>{
        if(error) throw error
        if(results) {
            res.status(200).json({
                success: true,
                results,
            })
        }
    })
}

const addCourses = (req: Request, res: Response, next: NextFunction) => {
    let {name, type, exams_url, summaries_url, course} = req.body;

    try{
        con.query(`INSERT INTO courses (name, type, exams_url, summaries_url, course) VALUES ('${name}', '${type}', '${exams_url}', '${summaries_url}', '${course}')`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                res.status(200).json({
                    success: true,
                    message: "تم اضافة المادة بنجاح"
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

const updateCourses = (req: Request, res: Response, next: NextFunction) => {
    let {name, type, exams_url, summaries_url, course} = req.body;
    let {id} = req.params;

    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM courses WHERE id=${id}`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                let arr = [results[0].image.substring(0,3),
                            results[0].image.substring(3,10),
                            results[0].image.substring(10)
                        ];
                fs.unlink(arr.join("\\"), (error)=>{
                    if(error){
                        res.status(400).json({
                            success: false,
                            message: error.message,
                            error
                        })
                    }
                    con.query(`UPDATE courses SET name='${name}', type='${type}', exams_url='${exams_url}', summaries_url='${summaries_url}' course='${course}' WHERE id=${id}`, (error, results, fields) =>{
                        if(error) throw error
                        if(results) {
                            res.status(200).json({
                                success: true,
                                message: "تم تعديل المادة بنجاح"
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

const deleteCourses = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;
    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM courses WHERE id=${id}`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                let arr = [results[0].image.substring(0,3),
                            results[0].image.substring(3,10),
                            results[0].image.substring(10)
                        ];
                fs.unlink(arr.join("\\"), (error)=>{
                    if(error){
                        res.status(400).json({
                            success: false,
                            message: error.message,
                            error
                        })
                    }
                    con.query(`DELETE FROM courses WHERE id=${id}`, (error, results, fields) =>{
                        if(error) throw error
                        if(results) {
                            res.status(200).json({
                                success: true,
                                message: "تم حذف المادة بنجاح"
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
    getAllCourses,
    retrieveCourses,
    addCourses,
    updateCourses,
    deleteCourses
}
