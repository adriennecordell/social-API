const { Schema, model, Types } = require("mongoose")

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId,
        },

        reactionBody: {
            type: String,
            required: true,
            maxLength: 350,
        },

        username: {
            type: String,
            required: true,
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }

)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true,
            maxLength: 300,
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
            getters: true,
        },
        id: false,
    }
)

ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length
})

const Thought = model("Thought", ThoughtSchema)

module.exports = Thought