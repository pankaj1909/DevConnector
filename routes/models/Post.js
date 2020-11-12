const moongoose = require('mongoose')

const PostSchema = new moongoose.Schema({
    user: {
        type: moongoose.Schema.Types.ObjectID,
        ref: 'user'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: moongoose.Schema.Types.ObjectID,
                ref: 'user'
            }
        }
    ],
    comments: [
        {
            user: {
                type: moongoose.Schema.Types.ObjectID,
                ref: 'user'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
})

module.exports = Post = moongoose.model('post', PostSchema)