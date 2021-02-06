import express from "express";
import controller from "../controllers/videos";
import extractJWT from "../middleware/extractJWT";
import {upload} from "../functions/uploadImage";
import {VideosSchema} from "../middleware/videosValid";
import {extractRequest} from "../functions/extractsRequests";

const videosRoute = express.Router();

//admin
videosRoute.get('/api/admin/videos/get',extractJWT, controller.getAllVideos);
videosRoute.get('/api/admin/videos/get/:id',extractJWT, controller.retrieveVideos);
videosRoute.post('/api/admin/videos/create',extractJWT, upload, extractRequest(VideosSchema), controller.addVideos);
videosRoute.put('/api/admin/videos/update/:id',extractJWT, upload, extractRequest(VideosSchema), controller.updateVideos);
videosRoute.delete('/api/admin/videos/delete/:id',extractJWT, controller.deleteVideos);

//user
videosRoute.get('/api/videos/get', controller.getAllVideos);

export = videosRoute;