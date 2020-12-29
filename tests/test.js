const got = require('got');
const { getScrapResultHandler } = require('../apiHandlers/handlers')
jest.mock('got')

describe('getScrapResultHandler', () => {

    it('should return scrap data', async () => {
        const url = 'https://getbootstrap.com/docs/4.5/utilities/spacing/#how-it-works'
        const req = { body: { url } }
        const response = await getScrapResultHandler(req)
        const result = {
            "status": 200,
            "body": {
                "url": "https://getbootstrap.com/docs/4.5/utilities/spacing/#how-it-works",
                "result": [
                    {
                        "lastModified": expect.any(String),
                        "characterSet": "UTF-8",
                        "url": "https://getbootstrap.com/docs/4.5/about/overview/",
                        "caption": "About",
                        "isRelativeToWebPage": true
                    },
                    {
                        "caption": "Twilio",
                        "characterSet": "UTF-8",
                        "isRelativeToWebPage": false,
                        "lastModified": expect.any(String),
                        "url": "https://www.twilio.com/blog/4-tools-for-web-scraping-in-node-js",
                    }
                ]
            }
        }
        expect(got).toHaveBeenCalledTimes(2)
        expect(response).toMatchObject(result)
    });
    it('should return scrap data from cache ', async () => {
        const url = 'https://react-bootstrap.netlify.app/components/table/#tables'
        const req = { body: { url } }
        await getScrapResultHandler(req)
        await getScrapResultHandler(req)
        expect(got).toHaveBeenCalledTimes(3)
    });
});