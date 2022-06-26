import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    role: { type: String, default: 'content creator' },
  },
  { timestamps: true }
);
const User = mongoose.model('User', schema);
export default User;
