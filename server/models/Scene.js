const { Schema, model, Types } = require('mongoose');

const sceneSchema = new Schema({
    storyId: {
        type: Types.ObjectId,
        required: true,
        ref: 'Story'
    },
    indexOrder: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    audio: {
        data: Buffer,
        contentType: String,
    }
});

const Scene = model('Scene', sceneSchema);

module.exports = Scene;