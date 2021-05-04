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
    let image =`acc${req.file.path.split('acc')[1].trim()}`;

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
    let {id} = req.params;

    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM educational_staff WHERE id=${id}`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                req.file?
                fs.unlink(`/src/uploads/${results[0].image.trim()}`, (error) => {
                    let image =`acc${req.file.path.split('acc')[1].trim()}`;
                    if(error) throw error;
                    con.query(`UPDATE educational_staff SET first_name='${first_name}', last_name='${last_name}', image='${image}', facebook='${facebook}' WHERE id=${id}`, (error, results, fields) =>{
                        if(error) throw error
                        if(results) {
                            res.status(200).json({
                                success: true,
                                message: "تم تعديل العضو التدريسي بنجاح"
                            })
                        }
                    })
                }) :
                con.query(`UPDATE educational_staff SET first_name='${first_name}', last_name='${last_name}', facebook='${facebook}' WHERE id=${id}`, (error, results, fields) =>{
                    if(error) throw error
                    if(results) {
                        res.status(200).json({
                            success: true,
                            message: "تم تعديل العضو التدريسي بنجاح"
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

const deleteEducationalStaff = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;
    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM educational_staff WHERE id=${id}`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                fs.unlink(`src/uploads/${results[0].image.trim()}`, (error) => {
                    if(error) throw error;
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
