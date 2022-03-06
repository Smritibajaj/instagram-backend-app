const httpStatus = require("http-status-codes");
const { PostService } = require("../services/index");

const PostController = {

    getAllPosts: async(req,res) => {
        try{
            const { username } = req.params;
            console.log(username, 'username');
            const posts = await PostService.getAllPosts(username);
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response: posts
            })
        }catch{
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)
            }) 
        }
    },
    
    getPost: async(req, res) => {
        try {
            const query = {_id: req.params.id}
            const posts = await PostService.getPostById(query);
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response: posts
            })
        } catch(error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)
            })
        }
    }, 
    updatePost: async(req,res) => {
        try {
            const { body: { query, condition } } = req;
            console.log(query, condition);
            const response = await PostService.updatePost(query, condition);
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                response: response
            })
        } catch(error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                response: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)
            })
        } 
    },
};
module.exports = PostController;
