import {Request, Response, NextFunction} from "express";
import fs from "fs";
import {con} from "../config/db";

const getAllOutstandingStudents = (req: Request, res: Response, next: NextFunction) => {
    con.query('SELECT * FROM outstanding_students', (error, results, fields) =>{
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

const retrieveOutstandingStudents = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;

    con.query(`SELECT * FROM outstanding_students WHERE id=${id}`, (error, results, fields) =>{
        if(error) throw error
        if(results) {
            res.status(200).json({
                success: true,
                results,
            })
        }
    })
}

const addOutstandingStudents = (req: Request, res: Response, next: NextFunction) => {
    let {first_name, last_name, description} = req.body;
    let image = req.file.path;

    try{
        con.query(`INSERT INTO outstanding_students (first_name, last_name, image, description) VALUES ('${first_name}', '${last_name}',' ${image}','${description}')`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                res.status(200).json({
                    success: true,
                    message: "تم اضافة الطالب بنجاح"
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

const updateOutstandingStudents = (req: Request, res: Response, next: NextFunction) => {
    let {first_name, last_name, description} = req.body;
    let image = req.file.path;
    let {id} = req.params;

    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM outstanding_students WHERE id=${id}`, (error, results, fields) =>{
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
                    con.query(`UPDATE outstanding_students SET first_name='${first_name}', last_name='${last_name}', image='${image}', description='${description}' WHERE id=${id}`, (error, results, fields) =>{
                        if(error) throw error
                        if(results) {
                            res.status(200).json({
                                success: true,
                                message: "تم تعديل الطالب بنجاح"
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

const deleteOutstandingStudents = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;
    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM outstanding_students WHERE id=${id}`, (error, results, fields) =>{
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
                    con.query(`DELETE FROM outstanding_students WHERE id=${id}`, (error, results, fields) =>{
                        if(error) throw error
                        if(results) {
                            res.status(200).json({
                                success: true,
                                message: "تم حذف الطالب بنجاح"
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
    getAllOutstandingStudents,
    retrieveOutstandingStudents,
    addOutstandingStudents,
    updateOutstandingStudents,
    deleteOutstandingStudents
}
