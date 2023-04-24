const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskpend = new Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        completed: {
            type: Boolean,
            default: false
        },
        prioridad: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        },
    },
    {
        collection: "Taskpend",
    }
);

module.exports = mongoose.model("taskpend", taskpend);