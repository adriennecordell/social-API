const router = require("express").Router()
const {
  getAllThought,getThoughtById,addThought,updateThought,deleteThought,createReaction,deleteReaction,
} = require("../../controllers/thought-controller")

router.route("/").get(getAllThought).post(addThought)
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

router.route("/:thoughtId/reactions").post(createReaction)
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction)

module.exports = router