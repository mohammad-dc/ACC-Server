import express from "express";
import controller from "../controllers/admin";
import {extractRequest} from "../functions/extractsRequests";
import {AdminSchema} from "../middleware/adminValid";

const adminRouter = express.Router();

adminRouter.post('/api/admin/login', extractRequest(AdminSchema), controller.login);

export = adminRouter;