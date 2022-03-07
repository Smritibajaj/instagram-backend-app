const httpStatus = require("http-status");
const InstagramService = require("../services/instagram.service");
const InstagramConfig = require("../configs/instagram.config");
const PostService  = require("../services/post.service");

const InstagramController = {
  getUser: async (req, res, next) => {
    try {
      console.log('coming in service');
      const { redirect_uri, code } = req.body;
      const client_id = InstagramConfig.INSTAGRAM_APP;
      const client_secret = InstagramConfig.INSTAGRAM_SECRET;
      const grant_type = InstagramConfig.GRANT_TYPE;
      const fields = InstagramConfig.FIELDS;
      let shortTimeAccessToken = await InstagramService.getShortTimeAccessToken(
        client_id,
        client_secret,
        grant_type,
        redirect_uri,
        code
      );
      let longTimeAccessToken = await InstagramService.getLongTimeAccessToken(
        client_secret,
        shortTimeAccessToken.access_token
      );
      const user = await InstagramService.getUserProfile(longTimeAccessToken.access_token)
      const existingUser = await InstagramService.getUserByUserName(user[0].username);
      console.log(user);
      if(existingUser){
        const posts = await PostService.getAllPosts(user[0].username);
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            response: {
                posts: posts,
                username: existingUser.username,
                user_id: existingUser.user_id,    
            }
          });
      }else{
          let data = await InstagramService.getUserMedia(
            fields,
            longTimeAccessToken.access_token
          );
         
          await InstagramService.createNewInstaramUser({
            access_token: longTimeAccessToken.access_token,
            user_id: shortTimeAccessToken.user_id,
            username: user[0].username
          });
          await PostService.createMany(data);
          const posts = await PostService.getAllPosts(user[0].username);
          return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            response: {
                posts: posts,
                username: user[0].username,
                user_id: shortTimeAccessToken.user_id,  
            }
          });
      }
    } catch (err) {
      console.log({ err });
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        response: err || httpStatus["500_MESSAGE"],
      });
    }
  },
};

module.exports = InstagramController;
