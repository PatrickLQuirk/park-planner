const { Schema, model } = require('mongoose');

const parkSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        // the name of the image file for the park
        img: {
            type: String
        },
        activities: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Activity'
            }
        ]
    }
);

const Park = model('Park', parkSchema);

module.exports = Park;