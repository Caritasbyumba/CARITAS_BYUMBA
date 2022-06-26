import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    name: String,
    link: String,
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);
const FooterLink = mongoose.model('FooterLink', schema);
export default FooterLink;
