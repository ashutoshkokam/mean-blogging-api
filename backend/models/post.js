const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: false },
    content: { type: String, required: false },
    imagePath: { type: String, required: false },
    postVolumeInfo: {
      volumeId: { type: String },
      volumeTitle: { type: String },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tags: [String],
    mentions: [String],
    rating: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema); //collection:posts
