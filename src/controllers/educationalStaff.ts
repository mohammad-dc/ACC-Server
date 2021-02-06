import {Request, Response, NextFunction} from "express";
import fs from "fs";
import {con} from "../config/db";

const getAllEducationalStaff = (req: Request, res: Response, next: NextFunction) => {
    con.query('SELECT * FROM educational_staff', (error, results, fields) =>{
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

const retrieveEducationalStaff = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;

    con.query(`SELECT * FROM educational_staff WHERE id=${id}`, (error, results, fields) =>{
        if(error) throw error
        if(results) {
            res.status(200).json({
                success: true,
                results,
            })
        }
    })
}

const addEducationalStaff = (req: Request, res: Response, next: NextFunction) => {
    let {first_name, last_name, facebook} = req.body;
    let image = req.file.path;

    try{
        con.query(`INSERT INTO educational_staff (first_name, last_name, image, facebook) VALUES ('${first_name}', '${last_name}',' ${image}','${facebook}')`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                res.status(200).json({
                    success: true,
                    message: "تم اضافة العضو التدريسي بنجاح"
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

const updateEducationalStaff = (req: Request, res: Response, next: NextFunction) => {
    let {first_name, last_name, facebook} = req.body;
    let image = req.file.path;
    let {id} = req.params;

    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM educational_staff WHERE id=${id}`, (error, results, fields) =>{
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
                    con.query(`UPDATE educational_staff SET first_name='${first_name}', last_name='${last_name}', image='${image}', facebook='${facebook}' WHERE id=${id}`, (error, results, fields) =>{
                        if(error) throw error
                        if(results) {
                            res.status(200).json({
                                success: true,
                                message: "تم تعديل العضو التدريسي بنجاح"
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

const deleteEducationalStaff = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;
    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM educational_staff WHERE id=${id}`, (error, results, fields) =>{
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
                    con.query(`DELETE FROM educational_staff WHERE id=${id}`, (error, results, fields) =>{
                        if(error) throw error
                        if(results) {
                            res.status(200).json({
                                success: true,
                                message: "تم حذف العضو التدريسي بنجاح"
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
    getAllEducationalStaff,
    retrieveEducationalStaff,
    addEducationalStaff,
    updateEducationalStaff,
    deleteEducationalStaff
}
