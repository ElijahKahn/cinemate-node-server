import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  media_id: Number,
  content: String,
  author: String,
  media_type: String,
});

const Review = mongoose.model('reviews', reviewSchema);

export default Review;