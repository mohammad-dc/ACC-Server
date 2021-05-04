import express from "express";
import controller from "../controllers/videos";
import extractJWT from "../middleware/extractJWT";
import {VideosSchema, VideosUpdateSchema} from "../middleware/videosValid";
import {extractRequest} from "../functions/extractsRequests";

const videosRoute = express.Router();

//admin
videosRoute.post('/api/admin/videos/create',extractJWT, extractRequest(VideosSchema), controller.addVideos);
videosRoute.put('/api/admin/videos/update/:id',extractJWT, extractRequest(VideosUpdateSchema), controller.updateVideos);
videosRoute.delete('/api/admin/videos/delete/:id',extractJWT, controller.deleteVideos);


export = videosRoute;