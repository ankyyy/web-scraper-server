// https://www.twilio.com/blog/4-tools-for-web-scraping-in-node-js

const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const isValidLink = (anchorTag) => anchorTag.href && (anchorTag.href.startsWith('http') || anchorTag.href.startsWith('/'))

function extractData(anchorTags, origin) {
  return anchorTags.filter(isValidLink).map((anchorTag) => {
    const isRelativeToWebPage = anchorTag.href.startsWith('/') || anchorTag.href.startsWith(origin);
    const url = anchorTag.href.startsWith('/') ? origin + anchorTag.href : anchorTag.href;
    return { url, caption: anchorTag.text, isRelativeToWebPage, href: anchorTag.href };
  })
}

let domCache = {}
async function getDom(url) {
  if (domCache[url]) {
    return domCache[url]
  }
  const response = await got(url);
  domCache[url] = new JSDOM(response.body);
  return domCache[url]
}

function extractLinksData(links) {
  return Promise.all(links.map(async (link) => {
    try {
      const dom = await getDom(link.url)
      const document = dom.window.document
      return {
        // contentSize: document.scrollHeight,
        lastModified: document.lastModified,
        characterSet: document.characterSet,
        ...link
      }
    }
    catch (e) {
      return link
    }
  }))
}

let resultCache = {}
async function getAnchorTags(url) {
  if (resultCache[url]) return resultCache[url]
  const dom = await getDom(url)
  const nodeList = [...dom.window.document.querySelectorAll('a')];
  const origin = (new URL(url)).origin
  const anchorData = extractData(nodeList, origin)
  resultCache[url] = await extractLinksData(anchorData)
  return resultCache[url]
}
module.exports = {
  getAnchorTags
}