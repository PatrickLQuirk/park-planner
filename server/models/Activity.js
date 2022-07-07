const { Schema, model } = require('mongoose');

const activitySchema = new Schema({
    // contains the date and the time
    startTime: {
        type: Date,
        required: true
    },
    // // I am leaving this part commented out for now because 
    // // I am not entirely sure how to store the duration/ending time
    // // I currently think the best course of action is to store the ending
    // // time in the database and have a virtual for calculating the duration.
    // // For now, I have written out code for storing the duration as a number of milliseconds
    // // and separately the ending time as a Date object.
    // duration: {
    //     type: Number,
    //     required: true
    // },
    // endingTime: {
    //     type: Date,
    //     required: true
    // },
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

const Activity = model('Activity', activitySchema);

module.exports = Activity;