const { AuthenticationError } = require('apollo-server-express');
const { User, Story, Scene } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async function (parent, { id }) {
            return await User.findOne({ _id: id }).populate('stories').populate({
                path: 'stories',
                populate: 'scenes'
            })
        },
        me: async function (parent, args, context) {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id }).populate('stories').populate({
                    path: 'stories',
                    populate: 'scenes'
                })


                const storiesToDelete = user.stories.filter((story) => story.scenes.length === 0)
                await Promise.all(storiesToDelete.map(async (story) => {
                    await Story.findOneAndDelete({ _id: story._id });
                }))
                return user
            }
            throw new AuthenticationError('Must log in!')
        },
        communityStories: async function () {
            return await Story.find({ shared: true }).populate('scenes')
        },
        story: async function (parent, args) {
            return await Story.findById(args.storyId).populate('scenes')
        },
        scene: async function (parent, args) {
            return await Scene.findById(args.sceneId)
        },
        allUsers: async function (parent, args) {
            return await User.find({}).populate('stories').populate({
                path: 'stories',
                populate: 'scenes'
            })
        },
        allStory: async function (parent, args) {
            return await Story.find({}).populate('scenes')
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

            if (!user) {
                throw new AuthenticationError('No user found with this username!')
            }

            const correctPass = await user.comparePassword(password);

            if (!correctPass) {
                throw new AuthenticationError('Incorrect password!')
            }

            const token = signToken(user)
            return { token, user }
        },
        createStory: async function (parent, { title }, context) {
            const story = await Story.create({ title, user: context.user._id }) // do same here as below
            await User.findByIdAndUpdate(
                context.user._id,
                { $addToSet: { stories: story._id } },
                { new: true })
            return story
        },
        createScene: async function (parent, args) {
            const scene = await Scene.create(args)
            console.log('begin story update')
            await Story.findOneAndUpdate(
                { _id: args.storyId },
                { $addToSet: { scenes: scene._id } },
                { new: true }
            )
            console.log('finish story update')

            return scene
        },
        removeStory: async function (parent, args, context) {
            await Story.findOneAndDelete({ _id: args.storyId })

            await Scene.deleteMany({ storyId: args.storyId })

            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { stories: args.storyId } }
            )

            return user
        },
        removeScene: async function (parent, args) {
            const scene = await Scene.findOneAndDelete({ _id: args.sceneId })

            const story = await Story.findOneAndUpdate(
                { _id: scene.storyId },
                { $pull: { scenes: args.sceneId } }
            )

            return story
        }


    }
}

module.exports = resolvers