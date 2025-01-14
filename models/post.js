const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        require: false,
    },
    content: {
        type: String,
        required: true,
    },
    creator: {
        type: Object,
        required: false,
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("Post",postSchema);