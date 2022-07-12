const { Schema, model } = require('mongoose');

const activitySchema = new Schema({
    // contains the date and the time
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    park: {
        type: Schema.Types.ObjectId,
        ref: 'Park'
    }
});

activitySchema.virtual('duration').get(function() {
    return this.endTime - this.startTime;
})

const Activity = model('Activity', activitySchema);

module.exports = Activity;