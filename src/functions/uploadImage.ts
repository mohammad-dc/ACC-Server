import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function(req: any, file: any, cb: any){
        cb(null, './src/uploads/')
    },
    filename: function(req: any, file: any, cb: any) {
        cb(null, `acc-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req: any, file: any, cb: any) =>{
    cb(null, true);
};

export let upload = multer({
    storage,
    fileFilter,
}).single('image');