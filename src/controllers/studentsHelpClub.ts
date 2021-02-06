import {Request, Response, NextFunction} from "express";
import fs from "fs";
import {con} from "../config/db";

const getAllStudentsHelpClubs = (req: Request, res: Response, next: NextFunction) => {
    con.query('SELECT * FROM students_help_club', (error, results, fields) =>{
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

const retrieveStudentsHelpClubs = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;

    con.query(`SELECT * FROM students_help_club WHERE id=${id}`, (error, results, fields) =>{
        if(error) throw error
        if(results) {
            res.status(200).json({
                success: true,
                results,
            })
        }
    })
}

const addStudentsHelpClubs = (req: Request, res: Response, next: NextFunction) => {
    let {first_name, last_name, description} = req.body;
    let image = req.file.path;

    try{
        con.query(`INSERT INTO students_help_club (first_name, last_name, description, image) VALUES ('${first_name}', '${last_name}', '${description}', '${image}')`, (error, results, fields) =>{
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

const updateStudentsHelpClubs = (req: Request, res: Response, next: NextFunction) => {
    let {first_name, last_name, description} = req.body;
    let image = req.file.path;
    let {id} = req.params;

    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM students_help_club WHERE id=${id}`, (error, results, fields) =>{
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
                    con.query(`UPDATE students_help_club SET first_name='${first_name}', last_name='${last_name}', description='${description}', image='${image}' WHERE id=${id}`, (error, results, fields) =>{
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

const deleteStudentsHelpClubs = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;
    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM students_help_club WHERE id=${id}`, (error, results, fields) =>{
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
                    con.query(`DELETE FROM students_help_club WHERE id=${id}`, (error, results, fields) =>{
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
    getAllStudentsHelpClubs,
    retrieveStudentsHelpClubs,
    addStudentsHelpClubs,
    updateStudentsHelpClubs,
    deleteStudentsHelpClubs
}
