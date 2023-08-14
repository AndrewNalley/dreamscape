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
        imagePath: '/assets/ocean.jpg',
        text: 'The vast blue ocean stretches out to the horizon.'
    },
    {
        indexOrder: '2',
        imagePath: '/assets/redOcean.avif',
        text: 'The vast red ocean stretches out to the Skyline.'
    }
]

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Story.deleteMany({});
        await Scene.deleteMany({});
        const createdUsers = await User.create(users);

        story.forEach(storyOb => {
            storyOb.user = createdUsers[0]._id; // Use the _id of the first user
        });
        const createdStory = await Story.create(story);

        createdUsers[0].stories.push(createdStory[0]._id); // Add the story's _id to the user's stories array
        await createdUsers[0].save();

        scenes.forEach(scene => {
            scene.storyId = createdStory[0]._id
        })
        const createdScene = await Scene.create(scenes)

        createdScene.forEach(created => {
            createdStory[0].scenes.push(created._id);
        })
        await createdStory[0].save();

        console.log('Seeding completed successfully.');
    } catch (error) {
        console.error('seeding error', error)
    } finally {
        mongoose.disconnect()
    }
});