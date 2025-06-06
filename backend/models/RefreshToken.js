import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, unique: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now, expires: "7d" },
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export default RefreshToken;
