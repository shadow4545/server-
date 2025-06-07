import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/User.js';

mongoose.connect('mongodb://localhost:27017/minipro')
  .then(async () => {
    const hashedPassword = await bcrypt.hash('123456', 10);
    const user = new User({
      username: 'admin1',
      password: hashedPassword
    });
    await user.save();
    console.log('User created!');
    process.exit();
  })
  .catch(err => console.error(err));
