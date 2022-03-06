const cron= require('node-cron');
const instaRefreshCron =require("./instaRefresh.cron");

// run immediately after server starts
instaRefreshCron();

// refresh instaAccessToken eg: weekly(every Sat)
cron.schedule('* * * * * 7', async () => {
    await instaRefreshCron();
});