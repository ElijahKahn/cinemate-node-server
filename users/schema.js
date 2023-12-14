import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER" },
      watchlist: [{
        media_id: Number,
        media_type: String,
      }]
  },
  { collection: "users" });
export default userSchema;