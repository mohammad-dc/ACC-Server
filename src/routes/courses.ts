import express from "express";
import controller from "../controllers/courses";
import extractJWT from "../middleware/extractJWT";
import {upload} from "../functions/uploadImage";
import {CoursesSchema} from "../middleware/coursesValid";
import {extractRequest} from "../functions/extractsRequests";

const coursesRoute = express.Router();

//admin
coursesRoute.get('/api/admin/courses/get', controller.getAllCourses);
coursesRoute.get('/api/admin/courses/get/:id',extractJWT, controller.retrieveCourses);
coursesRoute.post('/api/admin/courses/create', upload, extractRequest(CoursesSchema), controller.addCourses);
coursesRoute.put('/api/admin/courses/update/:id',extractJWT, upload, extractRequest(CoursesSchema), controller.updateCourses);
coursesRoute.delete('/api/admin/courses/delete/:id',extractJWT, controller.deleteCourses);

//user
coursesRoute.get('/api/courses/get', controller.getAllCourses);

export = coursesRoute;