const router = require('express').Router();
const { handlerWrapper,getURL } = require('../util');
const {
    getAllScrapResultHandler,
    getScrapResultByIdHandler,
    saveScrapResultHandler,
    getScrapResultHandler
} = require('../apiHandlers/handlers')

const urlValidator = (req, res, next) => {
    const body = req.body
    const url = getURL(body.url)
    if (!url) {
        return res.status(400).json('Invalid URL')
    }
    req.body.url = url
    next()
}

router.post('/api/getScrapResult', urlValidator, handlerWrapper(getScrapResultHandler));

router.post('/api/scrapResult', urlValidator, handlerWrapper(saveScrapResultHandler));

router.get('/api/scrapResult/:id', handlerWrapper(getScrapResultByIdHandler));

router.get('/api/scrapResult', handlerWrapper(getAllScrapResultHandler));

module.exports = router;