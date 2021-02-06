backend: node.js express -- typescript
database: mysql
authentication: JWT


tabels: 

1- admin:
    id: INT AI PRIMARY
    email: varchar(50)
    password: Varchar(50)

    actions: login => JWT => 2Func, extractJWT, signJWT ✔️

2- news:
    id: INT AI PRIMARY
    title: Varchar(50)
    description: Varchar(300)
    image: Varchar(300)

    actions: 
        admin: getAllNews, retreiveNews, addNews, updateNews, deleteNews 
        user: getAllNews ✔️

3- club members: 
    id: INT AI PRIMARY
    first_name: varchar(50)
    last_name: varchar(50)
    image: Varchar(300)
    rank: varchar(20)

    actions: 
        admin: getAllClubMembers, retreiveClubMembers, addClubMembers, updateClubMembers, deleteClubMembers 
        user: getAllClubMembers ✔️

4- educational staff:
    id: INT AI PRIMARY
    first_name: varchar(50)
    last_name: varchar(50)
    image: Varchar(300)
    facebook: varchar(500)

    actions: 
        admin: getAllEducationalStaff, retreiveEducationalStaff, addEducationalStaff, updateEducationalStaff, deleteEducationalStaff 
        user: getAllEducationalStaff ✔️

5- outstanding students: 
    id: INT AI PRIMARY
    first_name: varchar(50)
    last_name: varchar(50)
    image: Varchar(300)
    description: Varchar(300)

    actions: 
        admin: getAllOutStandingStudents, retreiveOutStandingStudents, addOutStandingStudents, updateOutStandingStudents, deleteOutStandingStudents 
        user: getAllOutStandingStudents ✔️

6- courses:
    id: INT AI PRIMARY
    name: varchar(50)
    type: varchar(50)
    exams_url: varchar(500)
    summaries_url: varchar(500)
    course: varchar(500)

    actions: 
        admin: getAllCourses, retreiveCourses, addCourses, updateCourses, deleteCourses 
        user: getAllCourses ✔️

7- videos: 
    id: INT AI PRIMARY
    course_id: INT Foring key refrance course
    url varchar(500)

    actions: 
        admin: getAllVideos, retreiveVideos, addVideos, updateVideos, deleteVideos 
        user: getAllVideos ✔️

8- students_help_club:
    id: INT AI PRIMARY
    first_name: varchar(50)
    last_name: varchar(50)
    image: Varchar(300)
    description: Varchar(300)

    actions: 
        admin: getAllStudentsHelpClub, retreiveStudentsHelpClub, addStudentsHelpClub, updateStudentsHelpClub, deleteStudentsHelpClub 
        user: getAllStudentsHelpClub ✔️