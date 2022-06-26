import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);
const Carousel = mongoose.model('Carousel', schema);
export default Carousel;
