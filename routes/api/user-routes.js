const router = require("express").Router()
const {
  getAllUser,getUserById,createUser,updateUser,addFriend,removeFriend,
} = require("../../controllers/user-controller")

router.route("/").get(getAllUser).post(createUser)
router.route("/:id").get(getUserById).put(updateUser)
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend)

module.exports = router