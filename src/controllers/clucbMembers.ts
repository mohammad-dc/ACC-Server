import {Request, Response, NextFunction} from "express";
import fs from "fs";
import {con} from "../config/db";


const getAllClubMembers = (req: Request, res: Response, next: NextFunction) => {
    con.query('SELECT * FROM club_members', (error, results, fields) =>{
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

const retrieveClubMembers = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;

    con.query(`SELECT * FROM club_members WHERE id=${id}`, (error, results, fields) =>{
        if(error) throw error
        if(results) {
            res.status(200).json({
                success: true,
                results,
            })
        }
    })
}

const addClubMembers = (req: Request, res: Response, next: NextFunction) => {
    let {first_name, last_name, rank} = req.body;
    let image =`acc${req.file.path.split('acc')[1].trim()}`;

    try{
        con.query(`INSERT INTO club_members (first_name, last_name, image, rank) VALUES ('${first_name}', '${last_name}',' ${image}','${rank}')`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                res.status(200).json({
                    success: true,
                    message: "تم اضافة العضو بنجاح"
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

const updateClubMembers = (req: Request, res: Response, next: NextFunction) => {
    let {first_name, last_name, rank} = req.body;
    let {id} = req.params;

    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM club_members WHERE id=${id}`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                req.file?
                fs.unlink(`/src/uploads/${results[0].image.trim()}`, (error) => {
                    let image =`acc${req.file.path.split('acc')[1].trim()}`;
                    if(error) throw error;
                    con.query(`UPDATE club_members SET first_name='${first_name}', last_name='${last_name}', image=${image}, rank='${rank}' WHERE id=${id}`, (error, results, fields) =>{
                        if(error) throw error
                        if(results) {
                            res.status(200).json({
                                success: true,
                                message: "تم تعديل العضو بنجاح"
                            })
                        }
                    });
                }) : 
                con.query(`UPDATE club_members SET first_name='${first_name}', last_name='${last_name}', rank='${rank}' WHERE id=${id}`, (error, results, fields) =>{
                    if(error) throw error
                    if(results) {
                        res.status(200).json({
                            success: true,
                            message: "تم تعديل العضو بنجاح"
                        })
                    }
                });
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

const deleteClubMembers = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;
    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM club_members WHERE id=${id}`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                fs.unlink(`src/uploads/${results[0].image.trim()}`, (error) => {
                    if(error) throw error;
                    con.query(`DELETE FROM club_members WHERE id=${id}`, (error, results, fields) =>{
                        if(error) throw error
                        if(results) {
                            res.status(200).json({
                                success: true,
                                message: "تم حذف العضو بنجاح"
                            })
                        }
                    });
                });
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
    getAllClubMembers,
    retrieveClubMembers,
    addClubMembers,
    updateClubMembers,
    deleteClubMembers
}
