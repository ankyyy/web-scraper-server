const got = jest.fn(() => {
    return { body: '<html><body><a class="bd-toc-link" href="/docs/4.5/about/overview/">About</a> \
    <a href="https://www.twilio.com/blog/4-tools-for-web-scraping-in-node-js">Twilio</a></body></html>' }
});


module.exports = got;