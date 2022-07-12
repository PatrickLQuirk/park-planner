const { Schema, model } = require('mongoose');

const parkSchema = new Schema(
    {
        name: {
            type: String,
            required: true
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