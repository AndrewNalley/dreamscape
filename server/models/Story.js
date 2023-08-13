const { Schema, model, Types } = require('mongoose');
const Scene = require('./Scene');

const storySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    scenes: [{
        type: Types.ObjectId,
        ref: 'Scene',
        required: true,
    }],
    shared: {
        type: Boolean,
        default: false,
        required: true,
    }
});

const Story = model('Story', storySchema);

module.exports = Story;