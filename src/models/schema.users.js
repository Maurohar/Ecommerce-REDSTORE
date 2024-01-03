import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  role: String,
  age: Number,
});

userSchema.index({ email: 1 }, { unique: true });
const UserModel = mongoose.model('User', userSchema);

export default UserModel;

