const port = require("./configs/app.config");
const localtunnel = require("localtunnel");
//initilize database
require("./configs/db.config");
require("./schemas/index");
const app = require("./server");
// (async () => {
//   app.listen(port.SERVER_PORT, () =>
//     console.log(`service is running ${port.SERVER_PORT}`)
//   );
//   const tunnel = await localtunnel({
//     port: port.SERVER_PORT,
//     subdomain: "instagram-clone",
//   });

//   // the assigned public url for your tunnel
//   // i.e. https://abcdefgjhij.localtunnel.me
//   tunnel.url;
//   console.log(tunnel.url);

//   tunnel.on("close", () => {
//     // tunnels are closed
//   });
// })();

app.listen(port.SERVER_PORT, () =>
  console.log(`service is running ${port.SERVER_PORT}`)
);
