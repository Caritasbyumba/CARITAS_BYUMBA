import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    name: String,
    description: String,
    vision: String,
    mision: String,
    objectives: String,
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);
const Aboutus = mongoose.model('Aboutus', schema);
export default Aboutus;
