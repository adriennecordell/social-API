const { Schema, model } = require('mongoose')
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()

        },
        reactionBody: {
            type: String,
            required:true,
            maxlength: 185

        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtDate => moment(createdAtDate).format('MMM DD, YYYY [at] hh:mm a')

        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtDate => moment(createdAtDate).format('MMM DD, YYYY [at] hh:mm a')

        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual(`reactionCount`).get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema)

module.exports = Thought