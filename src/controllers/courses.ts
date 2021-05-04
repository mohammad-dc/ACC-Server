import {Request, Response, NextFunction} from "express";
import fs from "fs";
import {con} from "../config/db";

const getAllCourses = (req: Request, res: Response, next: NextFunction) => {
    let queryCourses = 'SELECT id, name, type, setup, exams, course, summaries FROM courses';
    let queryVideos = 'SELECT id, course_id, url FROM videos';

    con.query(queryCourses, (error, courses, fields) =>{
        if(error) throw error
        if(courses) {
            con.query(queryVideos, (error, videos, fields) =>{
                if(error) throw error;
                if(videos){
                    let results = [];
                    courses.forEach((el: any, index: number) =>{
                        let videosList = videos.filter((e: any) => e.course_id === el.id);
                        courses[index]['videos'] = videosList;
                    });
                    results = courses
                    res.status(200).json({
                        success: true,
                        results,
                        count: courses.length
                    })
                }
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
    let {name, type, exams, summaries, course, setup, videos} = req.body;
    console.log(req.body);
    let query1 = `INSERT INTO courses (name, type, setup, exams, summaries, course) VALUES ('${name}', '${type}', '${setup}', '${exams}', '${summaries}', '${course}')`;
    let query2 = `INSERT INTO videos (course_id, url) VALUES ?`;

    try{
        con.query(query1, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                if(videos.length !== 0){
                    let videosList = [];
                    while(videos.length) videosList.push(videos.splice(0,1));
                    videosList.forEach(el => {
                        el.unshift(results.insertId)
                    });
                    con.query(query2, [videosList], (error, results, fields) =>{
                    if(error) throw error;
                    if(results){
                        return res.status(200).json({
                            success: true,
                            message: "تم اضافة المادة بنجاح"
                        })
                    }
                })
                }
                else {
                return res.status(200).json({
                    success: true,
                    message: "تم اضافة المادة بنجاح"
                })
            }
            }
        })
    } 
    catch(error){
        return res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
}

const updateCourses = (req: Request, res: Response, next: NextFunction) => {
    let {name, type, setup, exams, summaries, course} = req.body;
    let {id} = req.params;

    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM courses WHERE id=${id}`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                con.query(`UPDATE courses SET name='${name}', type='${type}', setup='${setup}', exams='${exams}', summaries='${summaries}' course='${course}' WHERE id=${id}`, (error, results, fields) =>{
                    if(error) throw error
                    if(results) {
                        res.status(200).json({
                            success: true,
                            message: "تم تعديل المادة بنجاح"
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

const deleteCourses = (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;
    try{
        // remove the last image from uploads folder
        con.query(`SELECT * FROM courses WHERE id=${id}`, (error, results, fields) =>{
            if(error) throw error
            if(results) {
                con.query(`DELETE FROM courses WHERE id=${id}`, (error, results, fields) =>{
                    if(error) throw error
                    if(results) {
                        res.status(200).json({
                            success: true,
                            message: "تم حذف المادة بنجاح"
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
    getAllCourses,
    retrieveCourses,
    addCourses,
    updateCourses,
    deleteCourses
}
