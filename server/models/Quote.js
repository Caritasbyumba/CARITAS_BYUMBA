import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    name: String,
    role: String,
    profile: String,
    quote: String,
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);
const Quote = mongoose.model('Quote', schema);
export default Quote;
