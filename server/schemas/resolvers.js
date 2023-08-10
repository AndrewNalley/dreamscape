const { AuthenticationError } = require('apollo-server-express');
const { User, Story, Scene } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async function (parent, args, context) {
            if(context.user) {
                return User.findOne({ _id: context.user._id })
            }
            throw new AuthentificationError('Must log in!')
        },
        communityStories: async function () {
            return await Story.find()
        },
        story: async function (parent, args) {
            return await Story.findById(args.id)
        },
        stories: async function (parent, args, context) {
            if(context.user) {
                const user = await User.findOne({ _id: context.user._id })
                if (user) {
                    return Story.find({ _id: { $in: user.stories } })
                }
            }
        },

    },
    Mutation: {
        createUser: async function (parent, args) {
            const user = await User.create(args)
            const token = signToken(user)
            return { token, user }
        },
        updateUser: async function (parent, args, context) { 
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                args,
                { new: true }
            )
        },
        login: async function (parent, { username, password }) { 
            const user = await User.findOne({ username })

            if(!user) {
                throw new AuthenticationError('No user found with this username!')
            }

            const correctPass = await user.isCorrectPassword(password)

            if(!correctPass) {
                throw new AuthenticationError('Incorrect password!')
            }

            const token = signToken(user)
            return { token, user }
        },
        createStory: async function (parent, args, context) {
            const story = await Story.create(args) // do same here as below
            await User.findByIdAndUpdate(context.user._id, { $push: { stories: story._id } }, { new: true })
            return story
        },
        updateStory: async function (parent, args) { 
            return await Story.findOneAndUpdate(
                { _id: args._id },
                args,
                { new: true }
            )
        },
        createScene: async function (parent, args) { 
            const scene = await Scene.create(args)

            await Story.findOneAndUpdate(
                { _id: args.storyId },
                { $push: { scenes: scene._id }},
                { new: true }
            )
        },
        updateScene: async function (parent, args) { 
            return await Scene.findOneAndUpdate(
                { _id: args._id },
                args,
                { new: true }
            )
        },

    }
}

module.exports = resolvers