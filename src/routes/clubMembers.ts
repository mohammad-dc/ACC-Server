import express from "express";
import controller from "../controllers/clucbMembers";
import extractJWT from "../middleware/extractJWT";
import {upload} from "../functions/uploadImage";
import {extractRequest} from "../functions/extractsRequests";
import {ClubMembersSchema} from "../middleware/clubMembersValid";

const clubMembersRouter = express.Router();

//admin
clubMembersRouter.get('/api/admin/club-members/get',extractJWT, controller.getAllClubMembers);
clubMembersRouter.get('/api/admin/club-members/get/:id',extractJWT, controller.retrieveClubMembers);
clubMembersRouter.post('/api/admin/club-members/create',extractJWT, upload, extractRequest(ClubMembersSchema), controller.addClubMembers);
clubMembersRouter.put('/api/admin/club-members/update/:id',extractJWT, upload, extractRequest(ClubMembersSchema), controller.updateClubMembers);
clubMembersRouter.delete('/api/admin/club-members/delete/:id',extractJWT, controller.deleteClubMembers);

//user
clubMembersRouter.get('/api/club-members/get', controller.getAllClubMembers);

export = clubMembersRouter;