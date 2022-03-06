const PostModel = require("../models/post.model");
const PostService = {
  getAllPosts: async(username) => {
    const $toSelect = ['username']
    console.log('coming here in service')
    const posts = await PostModel.readSelectedByKey({
      username: username
    });
    return posts;
  },
  createMany: async (array) => {
    console.log("coming here", PostModel);
    const posts = await PostModel.createMany(array);
    console.log(posts);
    return posts;
  },
  getPostById: async (query, toSelect, toPopulate) => {
    const blog = await PostModel.readOneByKey(query, toSelect, toPopulate);
    return blog;
  },
  updatePost: async (query, condition) => {
    console.log(query, condition, "in service");
    const update = await PostModel.update(query, condition, { new: true });
    console.log(update);
    return update;
  },
};

module.exports = PostService;
