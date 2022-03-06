const { InstagramController } = require("../controllers/index");


const router = require("express").Router({
  caseSensitive: true,
  strict: true,
});

router.route("/me").post(InstagramController.getUser);

module.exports = router;
