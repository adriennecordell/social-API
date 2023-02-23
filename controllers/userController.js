const { User, Thought } = require('../models')

const userController = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err))
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .then((user) =>
        !user
          ? res.status(404)
          : res.json(user)
      )
      .catch((err) => res.status(500),json(err))
  },
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
updateUser(req,res){
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404)
        : res.json(user)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)
    }
  )
},
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404)
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'Deleted' }))
      .catch((err) => res.status(500))
  },
  addFriend (req,res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404)
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      }
    )
  },
  deleteFriend (req,res){
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404)
          : res.json(user)
      )
      .catch((err) => {
        console.log(err)
        res.status(500)
      }
    )
  }
};

module.exports = userController