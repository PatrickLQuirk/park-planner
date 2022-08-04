const faker = require('faker');

const db = require('../config/connection');
const { Park, Activity } = require('../models');

db.once('open', async () => {
    await Park.deleteMany({});
    await Activity.deleteMany({});

    const parkData = [
        {
            name: 'Arches National Park',
            description: 'Discover a landscape of contrasting colors, land forms, and textures unlike any other. The park has over 2,000 natural stone arches, hundreds of soaring pinnacles, massive rock fins, and giant balanced rocks. This red-rock wonderland will amaze you with its formations, refresh you with its trails, and inspire you with its sunsets.',
            img: "arches.png"
        },
        {
            name: 'Badlands National Park',
            description: 'The rugged beauty of the Badlands draws visitors from around the world. These striking geologic deposits contain one of the world’s richest fossil beds. Ancient horses and rhinos once roamed here. The park’s 244,000 acres protect an expanse of mixed-grass prairie where bison, bighorn sheep, prairie dogs, and black-footed ferrets live today.',
            img: "badlands.png"
        },
        {
            name: 'Glacier National Park',
            description: 'A showcase of melting glaciers, alpine meadows, carved valleys, and spectacular lakes. With over 700 miles of trails, Glacier is a paradise for adventurous visitors seeking wilderness steeped in human history. Relive the days of old through historic chalets, lodges, and the famous Going-to-the-Sun Road.',
            img: "glacier.png"
        },
        {
            name: 'Roosevelt National Park',
            description: 'When Theodore Roosevelt came to Dakota Territory to hunt bison in 1883, he was a skinny, young, spectacled dude from New York. He could not have imagined how his adventure in this remote and unfamiliar place would forever alter the course of the nation. The rugged landscape and strenuous life that TR experienced here would help shape a conservation policy that we still benefit from today.',
            img: "roosevelt.png"
        }
    ]

    const createdParks = await Park.collection.insertMany(parkData);

    // for now, the activities will be created randomly
    for (let i = 0; i < 20; i++) {
        const title = faker.lorem.words(Math.round(Math.random() * 6) + 1);
        const description = faker.lorem.words(Math.round(Math.random() * 80) + 20);
        // start time is set to a random date and time
        // The dates range from August 3rd to August 18th 2022, and the times are in increments of half an hour
        const startTime = (Math.floor(Math.random() * (1296000000 / 1800000)) * 1800000)  + 1659502800000;
        // duration is set to a random amount less than a day, in increments of half an hour
        const duration = Math.floor(Math.random() * (86400000 / 1800000)) * 1800000;
        const endTime = startTime + duration;
        const randomParkIndex = Math.floor(Math.random() * createdParks.insertedCount);
        const parkId = createdParks.insertedIds[randomParkIndex];

        const activityInput = { startTime, endTime, title, description, park: parkId};
        const createdActivity = await Activity.create(activityInput);
        
        await Park.updateOne(
            { _id: parkId },
            { $push: { activities: createdActivity._id } }
        );
    }

    console.log('all done!');
    process.exit(0);
});