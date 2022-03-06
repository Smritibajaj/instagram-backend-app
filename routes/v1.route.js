const router = require("express").Router({
  caseSensitive: true,
  strict: true,
});

const InstagramRouter = require('./instagram.route');
const PostRouter = require('./post.route');

router.use("/instagram",InstagramRouter);
router.use("/post",PostRouter);

module.exports = router;
