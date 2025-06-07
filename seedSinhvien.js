import mongoose from 'mongoose';
import Sinhvien from './models/Sinhvien.js';

mongoose.connect('mongodb://localhost:27017/minipro')
  .then(async () => {
    console.log('✅ Đã kết nối MongoDB!');

    const sampleData = [
      {
        name: 'Nguyễn Văn A',
        laoname: 'Nguyen Van A',
        mssv: 'B21DCCN001',
        class: 'D21CQCN01-B',
        major: 'Khoa học máy tính',
        sex: 'Nam',
        brithday: '2003-01-15',
        education: 'Đại học',
        phonenumber: '0912345678',
        link: 'https://facebook.com/nguyenvana',
        hobbies: ['Đọc sách', 'Chơi thể thao'],
        from: 'Hà Nội',
        numpassport: 'C12345678',
        avatar: 'https://i.pravatar.cc/150?img=1'
      }
    ];

    await Sinhvien.deleteMany({});
    await Sinhvien.insertMany(sampleData);
    console.log('✅ Dữ liệu mẫu đã được thêm!');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Lỗi:', err);
    process.exit(1);
  });
