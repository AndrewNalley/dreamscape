const { Schema, model, Types } = require('mongoose');

const sceneSchema = new Schema({
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