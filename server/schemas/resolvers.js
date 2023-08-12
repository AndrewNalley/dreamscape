const { AuthenticationError } = require('apollo-server-express');
const { User, Story, Scene } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async function (parent, args, context) {
            if(context.user) {
                return User.findOne({ _id: context.user._id }).populate('stories')
            }
            throw new AuthentificationError('Must log in!')
        },
        communityStories: async function () {
            return await Story.find()
        },
        story: async function (parent, args) {
            return await Story.findById(args.id).populate('scenes')
        },
        scene: async function (parent, args) {
            return await Scene.findById(args.id)
        }

    },
    Mutation: {
        createUser: async function (parent, args) {
            const user = await User.create(args)
            const token = signToken(user)
            return { token, user }
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
            await User.findByIdAndUpdate(
                context.user._id,
                { $addToSet: { stories: story._id } }, 
                { new: true })
            return story
        },
        // updateStory: async function (parent, args) { 
        //     return await Story.findOneAndUpdate(
        //         { _id: args._id },
        //         args,
        //         { new: true }
        //     )
        // },
        createScene: async function (parent, args) { 
            const scene = await Scene.create(args)

            await Story.findOneAndUpdate(
                { _id: args.storyId },
                { $addToSet: { scenes: scene._id }},
                { new: true }
            )

            return scene
        },
        removeStory: async function (parent, args) {
            const story = await Scene.findOneAndDelete({_id: args.storyId})

            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { stories: args.storyId}}
            )

            return story
        },
        removeScene: async function (parent, args) {
            const scene = await Scene.findOneAndDelete({_id: args.sceneId})

            await Story.findOneAndUpdate(
                { _id: args.storyId },
                { $pull: { scenes: args.sceneId}}
            )

            return scene
        }
        

    }
}

module.exports = resolvers