const mongoose = require('mongoose');

const mentionSchema = mongoose.Schema({
    text: { type: String, required: true }
},{timestamps:true});

module.exports = mongoose.model('Mention',mentionSchema);//collection:mentions 