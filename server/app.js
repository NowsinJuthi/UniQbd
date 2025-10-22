import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './src/routes/api.js';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1000,
});


app.use(limiter);

app.use("/api/v1", router);


// 🧠 Serve uploaded images as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



export default app;
