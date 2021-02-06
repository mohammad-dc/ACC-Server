import express from "express";
import controller from "../controllers/studentsHelpClub";
import extractJWT from "../middleware/extractJWT";
import {upload} from "../functions/uploadImage";
import {StudentsHelpClubSchema} from "../middleware/studentsHelpClubValid";
import {extractRequest} from "../functions/extractsRequests";

const studentsHelpClubRouter = express.Router();

//admin
studentsHelpClubRouter.get('/api/admin/students-help-club/get',extractJWT, controller.getAllStudentsHelpClubs);
studentsHelpClubRouter.get('/api/admin/students-help-club/get/:id',extractJWT, controller.retrieveStudentsHelpClubs);
studentsHelpClubRouter.post('/api/admin/students-help-club/create',extractJWT, upload, extractRequest(StudentsHelpClubSchema), controller.addStudentsHelpClubs);
studentsHelpClubRouter.put('/api/admin/students-help-club/update/:id',extractJWT, upload, extractRequest(StudentsHelpClubSchema), controller.updateStudentsHelpClubs);
studentsHelpClubRouter.delete('/api/admin/students-help-club/delete/:id',extractJWT, controller.deleteStudentsHelpClubs);

//user
studentsHelpClubRouter.get('/api/students-help-club/get', controller.getAllStudentsHelpClubs);

export = studentsHelpClubRouter;