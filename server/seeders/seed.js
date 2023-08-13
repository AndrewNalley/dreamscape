const db = require('../config/connection');
const path = require('path')
const mongoose = require('mongoose');
const { User, Story, Scene } = require('../models');

const generateObjId = function () {
    return mongoose.Types.ObjectId().toString();
}

const users = [
    {
        username: 'Henry Morgan',
        password: 'heybro',
        stories: [],
    }
];

const story = [
    {
        title: 'Soaring',
        shared: true,
    },
];

const scenes = [
    {
        indexOrder: '1',
        imagePath: path.join(__dirname, '../../client/public/assets/ocean.jpg'),
        text: 'The vast blue ocean stretches out to the horizon.'
    },
]

db.once('open', async () => {
    try {
        await User.deleteMany({});
        const createdUsers = await User.create(users);

        story.user = createdUsers[0]._id;
        const createdStory = await Story.create(story);

        createdUsers[0].stories.push(createdStory._id); // Add the story's _id to the user's stories array
        await createdUsers[0].save();

        await Scene.deleteMany({});
        for (const scene of scenes) {
            const createdScene = await Scene.create({
                ...scene,
                storyId: createdStory._id
            });
            createdStory.scenes.push(createdScene._id);
            await createdStory.save();
        }

        console.log('Seeding completed successfully.');
    } catch (error) {
        console.error('seeding error', error)
    } finally {
        mongoose.disconnect()
    }
});