
const mongoose = require('mongoose');

const ScrapRecordSchema = new mongoose.Schema({
    url: String,
    lastModified: String,
    characterSet: String,
    caption: String,
    isRelativeToWebPage: Boolean
});


const ScrapSchema = new mongoose.Schema({
    url: { type: String, unique: true },
    subLinks: [ScrapRecordSchema]
});


module.exports = mongoose.model('Scrap', ScrapSchema);