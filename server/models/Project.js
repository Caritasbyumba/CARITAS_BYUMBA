import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    name: String,
    smallDescription: String,
    description: String,
    startDate: Date,
    endDate: Date,
    gallery: [String],
    isMain: Boolean,
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);
const Project = mongoose.model('Project', schema);
export default Project;
