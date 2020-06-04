import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: 'uploads',
    filename(req: Express.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void): void {
        const ext = path.extname(file.originalname);
        callback(null, 'User' + Date.now() + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1000 * 1000 }
})

export default upload;