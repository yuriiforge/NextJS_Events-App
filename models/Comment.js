import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model('Comment', CommentSchema);
