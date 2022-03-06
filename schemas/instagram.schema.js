const mongoose = require("mongoose");
const Post = require("./post.schema");

const InstagramSchema = mongoose.Schema(
  {
    access_token: {
      type: String,
    },
    user_id: {
      type: Number,
    },
    username: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

InstagramSchema.set("toJSON", {
  transform: (doc, ret, opt) => {
    delete ret.access_token;
    return ret;
  },
});

InstagramSchema.virtual("posts", {
  ref: "post",
  localField: "_id",
  foreignField: "username",
});

module.exports = mongoose.model("instagram", InstagramSchema);
