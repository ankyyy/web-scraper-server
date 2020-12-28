const router = require('express').Router();
const { handlerWrapper } = require('../util');
const {
    getAllScrapResultHandler,
    getScrapResultByIdHandler,
    saveScrapResultHandler,
    getScrapResultHandler
} = require('../apiHandlers/handlers')

router.post('/api/getScrapResult', handlerWrapper(getScrapResultHandler));

router.post('/api/scrapResult', handlerWrapper(saveScrapResultHandler));

router.get('/api/scrapResult/:id', handlerWrapper(getScrapResultByIdHandler));

router.get('/api/scrapResult', handlerWrapper(getAllScrapResultHandler));

module.exports = router;