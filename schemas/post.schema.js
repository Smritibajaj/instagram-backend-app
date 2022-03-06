const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  caption: {
    type: String,
  },
  id: {
    type: String,
  },
  media_type: {
    type: String,
  },
  media_url: {
    type: String,
  },
  thumbnail_url: {
    type: String,
  },
  timestamps: {
    type: Date,
  },
  username: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = mongoose.model("post", PostSchema);
