import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // Import module 'fs' để xử lý file

// Import model Sinhvien đã tạo
import Sinhvien from '../models/Sinhvien.js';

const router = express.Router();

// --- Cấu hình Multer để xử lý upload file ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// === ĐỊNH NGHĨA CÁC API ENDPOINTS ===

// POST - Tạo mới sinh viên (giữ nguyên)
router.post('/', upload.single('avatar'), async (req, res) => {
    try {
        const sinhvienData = JSON.parse(req.body.data);
        const newSinhvien = new Sinhvien({
            ...sinhvienData,
            avatar: req.file ? `uploads/${req.file.filename}` : null
        });
        const savedSinhvien = await newSinhvien.save();
        res.status(201).json(savedSinhvien);
    } catch (error) {
        console.error('Lỗi khi tạo sinh viên:', error);
        res.status(400).json({ message: 'Tạo sinh viên thất bại', error: error.message });
    }
});

// GET - Lấy tất cả sinh viên (giữ nguyên)
router.get('/', async (req, res) => {
    try {
        const sinhviens = await Sinhvien.find().sort({ createdAt: -1 });
        res.json(sinhviens);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});

// GET - Lấy một sinh viên theo ID (giữ nguyên)
router.get('/:id', async (req, res) => {
    try {
        const sinhvien = await Sinhvien.findById(req.params.id);
        if (!sinhvien) {
            return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
        }
        res.json(sinhvien);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});

// ✅ --- ROUTE MỚI ĐỂ CẬP NHẬT (EDIT) ---
/**
 * @route   PUT /api/sinhvien/:id
 * @desc    Cập nhật thông tin sinh viên theo ID
 * @access  Public
 */
router.put('/:id', upload.single('avatar'), async (req, res) => {
    try {
        const updatedData = JSON.parse(req.body.data);

        // Nếu người dùng upload file ảnh mới
        if (req.file) {
            // Tìm sinh viên cũ để lấy đường dẫn avatar cũ và xóa nó đi
            const oldSinhvien = await Sinhvien.findById(req.params.id);
            if (oldSinhvien && oldSinhvien.avatar) {
                fs.unlink(oldSinhvien.avatar, (err) => {
                    if (err) console.error("Lỗi khi xoá avatar cũ:", err);
                });
            }
            // Gán đường dẫn avatar mới cho dữ liệu cập nhật
            updatedData.avatar = `uploads/${req.file.filename}`;
        }

        // Cập nhật sinh viên trong database
        // { new: true } để kết quả trả về là sinh viên sau khi đã được cập nhật
        const updatedSinhvien = await Sinhvien.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!updatedSinhvien) {
            return res.status(404).json({ message: "Không tìm thấy sinh viên để cập nhật" });
        }

        res.status(200).json(updatedSinhvien);

    } catch (error) {
        console.error("Lỗi khi cập nhật sinh viên:", error);
        res.status(400).json({ message: "Cập nhật sinh viên thất bại", error: error.message });
    }
});


// DELETE - Xóa sinh viên (giữ nguyên)
router.delete('/:id', async (req, res) => {
    try {
        const sinhvien = await Sinhvien.findById(req.params.id);
        if (!sinhvien) {
            return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
        }
        if (sinhvien.avatar) {
            fs.unlink(sinhvien.avatar, (err) => {
                if (err) {
                    console.error('Lỗi khi xóa file avatar:', err);
                }
            });
        }
        await Sinhvien.findByIdAndDelete(req.params.id);
        res.json({ message: 'Xóa sinh viên thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});

export default router;