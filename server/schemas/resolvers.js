const { AuthenticationError } = require('apollo-server-express');
const { User, Story, Scene } = require('../models');

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
        addUser: async function (parent, args) {
            const user = await User.create(args)
            const token = signToken(user)
            return { token, user }
        },
        createCampaign: async function (parent, args, context) {
            const campaign = await Campaign.create(args) // do same here as below
            await User.findByIdAndUpdate(args.campaignId, { campaigns: { $push: args.userId } }, { new: true })

            return campaign
        }
    }
}

module.exports = resolvers