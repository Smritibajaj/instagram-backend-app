const mongoose = require('mongoose');
const Instagram = mongoose.model('instagram');

exports.create = async (blog) => {
    console.log(blog);
    const newBlog = await Instagram.create(blog);
    return newBlog;
};

exports.readByKey = async (query, sortBy = null, limit = null) => {
    const blog= await Instagram.find(query, sortBy, limit).lean();
    return blog;
};

exports.readOneByKey = async(query, select = [], populate = []) => {
    const blog= await Instagram.findOne(query)
        .populate(populate)
        .select(select)
        .lean();
    return blog;
};

exports.readSelectedByKey = async(query, select = [], populate = []) => {
    const blogs = await Instagram.find(query)
        .populate(populate)
        .select(select)
        .lean();
    console.log('in model')
    return blogs;
};

exports.update = async(query, condition, options = { new: false }) => {
    console.log(query, 'in model');
    const updatedBlog = await Instagram.findOneAndUpdate(query, condition, options)
    .lean()
    console.log(updatedBlog, 'in model');
    return  updatedBlog;
}

exports.delete = async(query) => {
    console.log(query, 'in model');
    const deleteBlog = await Instagram.findOneAndDelete(query)
    console.log(deleteBlog, 'in model');
    return  deleteBlog;
}