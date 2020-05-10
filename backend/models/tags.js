const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    text: { type: String, required: true }
},{timestamps:true});

module.exports = mongoose.model('Tag',tagSchema);//collection:posts 