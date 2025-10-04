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
    windowMs: 15 * 60 * 1000,
    max: 100,
});

// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(limiter);

app.use("/api/v1", router);

// app.use(express.static(path.join(__dirname, 'client', 'dist')));

// app.get(/.*/, function (req, res) {
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
// });

export default app;
