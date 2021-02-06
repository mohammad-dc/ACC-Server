import express from "express";
import connection from "./config/db";
import adminRouter from "./routes/admin";
import newsRouter from  './routes/news';
import clubMembersRouter from "./routes/clubMembers";
import educationaStaffRoute from "./routes/educationalStaff";
import outstandingStudentsRoute from "./routes/outstandingStudents";
import studentsHelpClubRouter from "./routes/studentsHelpClub";
import coursesRoute from "./routes/courses";
import videosRoute from "./routes/videos";

const server = express();
server.use(express.json());
connection;

server.use('/', adminRouter);
server.use('/', newsRouter);
server.use('/', clubMembersRouter);
server.use('/', educationaStaffRoute);
server.use('/', outstandingStudentsRoute);
server.use('/', studentsHelpClubRouter);
server.use('/', coursesRoute);
server.use('/', videosRoute);

server.listen(4000, () => console.log("http://localhost:4000"))