import express from "express";
import controller from "../controllers/news";
import extractJWT from "../middleware/extractJWT";
import {upload} from "../functions/uploadImage";
import {NewsSchema} from "../middleware/newsValid";
import {extractRequest} from "../functions/extractsRequests";

const newsRouter = express.Router();

//admin
newsRouter.get('/api/admin/news/get',extractJWT, controller.getAllNews);
newsRouter.get('/api/admin/news/get/:id',extractJWT, controller.retrieveNews);
newsRouter.post('/api/admin/news/create',extractJWT, upload, extractRequest(NewsSchema), controller.addNews);
newsRouter.put('/api/admin/news/update/:id',extractJWT, upload, extractRequest(NewsSchema), controller.updateNews);
newsRouter.delete('/api/admin/news/delete/:id',extractJWT, controller.deleteNews);

//user
newsRouter.get('/api/news/get', controller.getAllNews);

export = newsRouter;