const handlerWrapper = (handler) => {
    return async function (req, res) {
        try {
            const result = await handler(req)
            res.status(result.status).json(result.body)
        } catch (e) {
            console.log(e)
            res.status(500).send('Internal server error')
        }
    }
}

const getURL = (url) => {
    try {
        const { origin, pathname } = new URL(url)
        return `${origin}${pathname}`
    } catch (e) {
        return ''
    }
}

module.exports = {
    handlerWrapper,
    getURL
}