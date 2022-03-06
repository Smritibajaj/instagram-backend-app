const mongoose = require('mongoose');
const Post = mongoose.model('post');


exports.readByKey = async (query, sortBy = null, limit = null) => {
    const blog= await Post.find(query, sortBy, limit).lean();
    return blog;
};

exports.readSelectedByKey = async(query, select = [], populate = []) => {
    const posts = await Post.find(query)
        .populate(populate)
        .select(select)
        .lean();
    return posts;
};

exports.createMany = async(array) => {
    console.log("coming here in post model");
    console.log(array)
    const records = await Post.insertMany([...array]);
    return records
}

exports.readOneByKey = async(query, select = [], populate = []) => {
    const blog= await Post.findOne(query)
        .populate(populate)
        .select(select)
        .lean();
    return blog;
};

exports.readSelectedByKey = async(query, select = [], populate = []) => {
    const blogs = await Post.find(query)
        .populate(populate)
        .select(select)
        .lean();
    console.log('in model')
    return blogs;
};

exports.update = async(query, condition, options = { new: false }) => {
    console.log(query, 'in model');
    const post = await Post.findOne(query);
    console.log(post,'hahahhah')
    const updatedPost = await Post.findOneAndUpdate(query, condition, options)
    .lean()
    console.log(updatedPost, 'in model');
    return  updatedPost;
}