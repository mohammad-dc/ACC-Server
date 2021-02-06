import express from "express";
import controller from "../controllers/educationalStaff";
import extractJWT from "../middleware/extractJWT";
import {upload} from "../functions/uploadImage";
import {EducationalStaffSchema} from "../middleware/educationalValid";
import {extractRequest} from "../functions/extractsRequests";

const educationaStaffRoute = express.Router();

//admin
educationaStaffRoute.get('/api/admin/educational-staff/get',extractJWT, controller.getAllEducationalStaff);
educationaStaffRoute.get('/api/admin/educational-staff/get/:id',extractJWT, controller.retrieveEducationalStaff);
educationaStaffRoute.post('/api/admin/educational-staff/create',extractJWT, upload, extractRequest(EducationalStaffSchema), controller.addEducationalStaff);
educationaStaffRoute.put('/api/admin/educational-staff/update/:id',extractJWT, upload, extractRequest(EducationalStaffSchema), controller.updateEducationalStaff);
educationaStaffRoute.delete('/api/admin/educational-staff/delete/:id',extractJWT, controller.deleteEducationalStaff);

//user
educationaStaffRoute.get('/api/educational-staff/get', controller.getAllEducationalStaff);

export = educationaStaffRoute;