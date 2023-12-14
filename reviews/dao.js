import Review from "./model.js";

export const createReview = async (reviewData) => {
  try {
    return await Review.create(reviewData);
  } catch (error) {
    throw new Error(error);
  }
};

export const findReviewsByMedia = async (mediaType, mediaId) => {
  try {
    return await Review.find({ media_type: mediaType, media_id: mediaId });
  } catch (error) {
    throw new Error(error);
  }
};

export const findReviewsByUserId = async (userId) => {
  try {
    return await Review.find({ user_id: userId });
  } catch (error) {
    throw new Error(error);
  }
};

export const findAllReviews = async () => {
  try {
    return await Review.find();
  } catch (error) {
    throw new Error(error);
  }
};
