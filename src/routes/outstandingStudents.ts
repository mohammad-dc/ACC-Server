import express from "express";
import controller from "../controllers/outstandinStudents";
import extractJWT from "../middleware/extractJWT";
import {upload} from "../functions/uploadImage";
import {OutStandingStudentsSchema} from "../middleware/outstandingValid";
import {extractRequest} from "../functions/extractsRequests";

const outstandingStudentsRoute = express.Router();

//admin
outstandingStudentsRoute.get('/api/admin/outstanding-students/get',extractJWT, controller.getAllOutstandingStudents);
outstandingStudentsRoute.get('/api/admin/outstanding-students/get/:id',extractJWT, controller.retrieveOutstandingStudents);
outstandingStudentsRoute.post('/api/admin/outstanding-students/create',extractJWT, upload, extractRequest(OutStandingStudentsSchema), controller.addOutstandingStudents);
outstandingStudentsRoute.put('/api/admin/outstanding-students/update/:id',extractJWT, upload, extractRequest(OutStandingStudentsSchema), controller.updateOutstandingStudents);
outstandingStudentsRoute.delete('/api/admin/outstanding-students/delete/:id',extractJWT, controller.deleteOutstandingStudents);

//user
outstandingStudentsRoute.get('/api/outstanding-students/get', controller.getAllOutstandingStudents);

export = outstandingStudentsRoute;