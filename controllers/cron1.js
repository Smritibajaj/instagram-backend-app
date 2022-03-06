const cron =require('node-cron');
//import instaCacheCron from "./crons/instaCache.cron";

// run immediately after server starts
//instaCacheCron();

// update instaPhotos Cache every 3 hours
cron.schedule('0 0 */3 * * *', async () => {
  // this method fetches updated Insta images and saves to DB.
	//await instaCacheCron();
});