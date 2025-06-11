// ✅ Sửa từ require → import
import express from 'express';
import mongoose from 'mongoose';
import sinhvienRouter from './routes/sinhvien.js'; // nhớ thêm .js
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();



const app = express();
const port = 5000;

// 👇 vì __dirname không có sẵn trong ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// router
app.use('/api/sinhvien', sinhvienRouter);

// mongo
mongoose.connect('mongodb+srv://beak11:sPpLB75cxBJmoTdc@cluster0.ofkoxoy.mongodb.net/MINIPRO?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ Kết nối MongoDB thành công!'))
  .catch((err) => console.error('❌ Lỗi MongoDB:', err));

app.listen(port, () => {
  console.log(`✅ Server đang chạy ở http://localhost:${port}`);
});
