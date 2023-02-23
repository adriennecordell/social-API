const { User, Thought } = require('../models');

const thoughtController = {
  getThoughts(req, res) {
    Thought.find()
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500))
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .then((thought) =>
        !thought
          ? res.status(404)
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    console.log(req.body);
    Thought.create(req.body)
        .then(thought => {
            User.findByIdAndUpdate(req.body.userId,
                {
                    $addToSet: { thoughts: thought._id }
                },
                { new: true })
                .then((user) =>
                    !user
                        ? res.status(404)
                        : res.json(thought)

                )
                .catch((err) => res.status(500).json(err));
        })
},
    
updateThought(req,res){
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404)
        : res.json(thought)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
  )
},
 
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>{
        if (!thought) {
          res.status(404)
          return;
        }
        return User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { thoughts: req.params.Id } },
          { new: true }
        )
      })
      .then(userData => {
        if (!userData) {
          res.status(404)
          return;
        }
        res.json(userData);
      })
      .catch(err => res.json(err));
  },

  addReaction (req,res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body} },
      {  new: true }
    )
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404)
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500)
      }
    )
  },

  deleteReaction({params}, res){
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$pull: {reactions: {_id : params.reactionId}}},
        { new: true, runValidators: true }
    )
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(404)
            return;
        }
        res.json(thoughtData);
    })
    .catch(err => res.json(err));
}
}

module.exports = thoughtController