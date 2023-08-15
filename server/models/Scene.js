const { Schema, model, Types } = require('mongoose');

const sceneSchema = new Schema({
    storyId: {
        type: Types.ObjectId,
        required: true,
        ref: 'Story'
    },
    imagePath: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
});

const Scene = model('Scene', sceneSchema);

module.exports = Scene;