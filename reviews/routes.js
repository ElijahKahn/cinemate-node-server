import Database from "../Database/index.js";

function ReviewsRoutes(app) {
  app.post("/api/reviews", (req, res) => {
    const review = { 
      ...req.body,
      _id: new Date().getTime().toString()
    };
    Database.reviews.push(review);
    res.send(review); // Send back the newly added review
  });

  app.get("/api/reviews", (req, res) => {
    const reviews = Database.reviews;
    res.send(reviews);
  });
  
}
export default ReviewsRoutes;