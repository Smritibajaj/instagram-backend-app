try {
    let instaAccessToken = "XXXXXX"; // get from DB
    let resp = await axios.get(`https://graph.instagram.com/me/media?fields=media_type,permalink,media_url&access_token=${instaAccessToken}`);
    resp = resp.data;
    let instaPhotos = resp.data.filter(d => d.media_type === "IMAGE").map(d => d.media_url);
    // Got insta photos
  } catch (e) {
     console.log(e.response.data.error);
  }