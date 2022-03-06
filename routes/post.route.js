const router = require("express").Router({
  caseSensitive: true,
  strict: true,
});
const { checkIsValidBody, sanitizeBody } = require("../validators/post.validator");
const { PostController } = require("../controllers/index");

router.route("/post/:id").get(PostController.getPost);
router.route("/all/:username").get(PostController.getAllPosts);

router.route("/update/:id").put(
  checkIsValidBody,
  sanitizeBody,
  (req, res, next) => {
    const id = req.params.id;
    const { body } = req;
    req.body = {
      query: {
        id: id,
      },
      condition: {
        $set: body,
      },
    };
    next();
  },
  PostController.updatePost
);

module.exports = router;
