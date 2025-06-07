import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Đặt rõ collection là "admins"
export default mongoose.model('User', userSchema, 'admins');
