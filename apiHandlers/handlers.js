const { getAnchorTags } = require('./scrapper');
const scrapModel = require('../models/Scrap');

const getScrapResultHandler = async function (req) {
    const url = req.body.url
    const result = await getAnchorTags(url)
    return { status: 200, body: { url, result } };
}

const saveScrapResultHandler = async function (req) {
    const body = req.body
    const urlExists = await scrapModel.findOne({ url: body.url })
    if (urlExists) {
        await scrapModel.findOneAndUpdate({ url: body.url }, body)
        return { status: 200, body: "Resource updated" }
    } else {
        await scrapModel.create(body)
        return { status: 201, body: "Resource Created" }
    }
}

const getScrapResultByIdHandler = async function (req) {
    const result = await scrapModel.findOne({ _id: req.params.id })
    return { status: 200, body: result }
}

const getAllScrapResultHandler = async function () {
    const result = await scrapModel.find()
    return { status: 200, body: result }
}


module.exports = {
    getAllScrapResultHandler,
    getScrapResultByIdHandler,
    saveScrapResultHandler,
    getScrapResultHandler
};