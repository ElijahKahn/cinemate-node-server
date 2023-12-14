import * as reviewDao from "./dao.js";
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

function ReviewsRoutes(app) {
  app.post("/api/reviews", async (req, res) => {
    try {
      const newReview = await reviewDao.createReview(req.body);
      res.status(201).json(newReview);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/reviews", async (req, res) => {
    try {
        const reviews = await reviewDao.findAllReviews();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/api/reviews/user/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const userReviews = await reviewDao.findReviewsByUserId(userId);
    res.json(userReviews);
  } catch (error) {
    console.error("Error fetching user reviews: ", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

  app.get("/api/reviews/:media_type/:media_id", async (req, res) => {
    try {
      const media_type = req.params.media_type;
      const media_id = req.params.media_id;
      const reviews = await reviewDao.findReviewsByMedia(media_type, media_id);
      res.json(reviews);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
}
export default ReviewsRoutes;