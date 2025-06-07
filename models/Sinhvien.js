import mongoose from 'mongoose';

const sinhvienSchema = new mongoose.Schema({
    // --- Thông tin bắt buộc ---
    name: {
        type: String,
        required: true,
        trim: true // Tự động xóa khoảng trắng thừa ở đầu và cuối
    },
    laoname: {
        type: String,
        required: true,
        trim: true
    },
    mssv: {
        type: String,
        required: true,
        unique: true // Đảm bảo mỗi sinh viên có một MSSV duy nhất
    },
    class: { // Lưu ý: 'class' là một từ khóa trong JS, nhưng trong key của object thì vẫn hợp lệ
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true,
        enum: ['Nam', 'Nữ'] // Chỉ cho phép giá trị là 'Nam' hoặc 'Nữ'
    },
    birthday: { // Sửa từ 'brithday' thành 'birthday' cho đúng chính tả và khớp với state của React
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    numpassport: {
        type: String,
        required: true
    },
    
    // --- Thông tin không bắt buộc ---
    link: {
        type: String,
        default: '' // Giá trị mặc định nếu không được cung cấp
    },
    hobbies: {
        type: [{ type: String }] // Một mảng chứa các chuỗi (string)
    },
    avatar: {
        type: String // Sẽ lưu đường dẫn (path) tới file ảnh sau khi upload
    }
}, {
    // Tự động thêm hai trường: createdAt (thời gian tạo) và updatedAt (thời gian cập nhật)
    timestamps: true 
});

// Tạo model từ schema
// 'sinhviens' là tên của collection (bảng) trong MongoDB
const Sinhvien = mongoose.model('sinhviens', sinhvienSchema);

// Export model để có thể sử dụng ở các file khác (như trong router)
export default Sinhvien;