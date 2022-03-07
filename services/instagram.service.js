const axios = require('axios');
const { InstagramModel } = require('../models');
const InstagramService = {

    getShortTimeAccessToken: async(client_id, client_secret, grant_type,redirect_uri, code) => {

        try {
          console.log('its', redirect_uri)
            const params = new URLSearchParams();
            params.append("client_id", client_id);
            params.append("client_secret", client_secret);
            params.append("grant_type", grant_type);
            params.append("redirect_uri", redirect_uri);
            params.append("code", code);
        
            // send form based request to Instagram API
            let result = await axios.post(
              "https://api.instagram.com/oauth/access_token",
              params
            );
            console.log(result.data, "res");
            return result.data
          } catch (e) {
            console.log("Error=====", e);
            return {
                type: 'no short time token',
                message: 'check application'
            }
          }
    },

    getLongTimeAccessToken: async(client_secret, accessToken) => {
        try {
            console.log(
              `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${client_secret}&access_token=${accessToken}`
            );
            let resp = await axios.get(
              `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${client_secret}&access_token=${accessToken}`
            );
            //accessToken = resp.data.access_token;
            console.log(resp.data, "haha");
            return resp.data
            // save accessToken  to Database
          } catch (e) {
            console.log("Error=====", e.data);
            return  {
                type: 'no long time token',
                message: 'check application'
            }
          }
    },

    getUserProfile: async(accessToken) => {
        try {
            let media = await axios.get(
              `https://graph.instagram.com/me/media?fields=id,username&access_token=${accessToken}`
            );
            console.log(media.data.data, "haha");
            return media.data.data;
          } catch (e) {
            console.log("Error===== in get request", e.data);
            return {
                type: 'no user found',
                message: 'check application'
            }
          }

    },

    getUserMedia: async(fields, accessToken) => {
        try {
            let media = await axios.get(
              `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`
            );
            //console.log(media.data.data, "haha");
            return media.data.data;
          } catch (e) {
            console.log("Error===== in get request", e.data);
            return {
                type: 'no media',
                message: 'check application'
            }
          }
    },
    createNewInstaramUser: async (instagramUser) => {
        return InstagramModel.create(instagramUser);
    },
    getUserByUserName: async(username, select = [], populate = []) => {
        return InstagramModel.readOneByKey({username}, select, populate)
    }
};

module.exports = InstagramService;