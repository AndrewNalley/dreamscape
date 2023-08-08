const { Schema, model, Types } = require('mongoose');
const User = require('./User');

const campaignSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // set up validation
    },
    users: [{
        type: Types.ObjectId,
        ref: User
    }]
});

const Campaign = model('Campaign', campaignSchema);

module.exports = Campaign;