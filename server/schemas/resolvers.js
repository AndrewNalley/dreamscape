const { User, Campaign } = require('../models');

const resolvers = {
    Query: {
        user: async function (parent, args) {
            if (args.id) {
                return await User.findById(args.id)
            }
            if (context.user) {
                return await User.findById(context.user.id)
            }
        },
        users: async function () {
            return await User.find()
        },
        campaign: async function (parent, args) {
            return await Campaign.findById(args.id)
        },
        campaigns: async function () {
            return await Campaign.find()
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