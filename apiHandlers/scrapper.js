// https://www.twilio.com/blog/4-tools-for-web-scraping-in-node-js

const got = require('got');
const jsdom = require('jsdom');
const { domCache, tagResultCache } = require('./cache');
const { JSDOM } = jsdom;

const isValidLink = (anchorTag) =>
  anchorTag.href &&
  (anchorTag.href.startsWith('http') || anchorTag.href.startsWith('/'));

function extractData(anchorTags, origin) {
  return anchorTags.filter(isValidLink).map((anchorTag) => {
    const isRelativeToWebPage =
      anchorTag.href.startsWith('/') || anchorTag.href.startsWith(origin);
    const url = anchorTag.href.startsWith('/')
      ? origin + anchorTag.href
      : anchorTag.href;
    return { url, caption: anchorTag.text, isRelativeToWebPage };
  });
}

async function getDom(url) {
  if (domCache.get(url)) {
    return domCache.get(url);
  }
  const response = await got(url);
  const domObj = new JSDOM(response.body);
  domCache.set(url, domObj);
  return domObj;
}

function extractDestinationLinksData(links) {
  return Promise.all(
    links.map(async (link) => {
      try {
        if (link.isRelativeToWebPage) {
          return link;
        }
        const dom = await getDom(link.url);
        const document = dom.window.document;
        return {
          // contentSize: document.scrollHeight,
          lastModified: document.lastModified,
          characterSet: document.characterSet,
          ...link,
        };
      } catch (e) {
        console.log('error', e);
        return link;
      }
    })
  );
}

async function getAnchorTags(url) {
  if (tagResultCache.get(url)) return tagResultCache.get(url);
  const dom = await getDom(url);
  const nodeList = [...dom.window.document.querySelectorAll('a')];
  const origin = new URL(url).origin;
  const anchorTags = extractData(nodeList, origin);
  const currentPageData = {
    lastModified: dom.window.document.lastModified,
    characterSet: dom.window.document.characterSet,
  };
  const anchorTagsWithCurrentPageData = anchorTags.map((tag) => {
    if (tag.isRelativeToWebPage) {
      return { ...currentPageData, ...tag };
    }
    return tag;
  });
  const response = await extractDestinationLinksData(
    anchorTagsWithCurrentPageData
  );
  tagResultCache.set(url, response);
  return response;
}
module.exports = {
  getAnchorTags,
};
