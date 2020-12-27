// https://www.twilio.com/blog/4-tools-for-web-scraping-in-node-js

const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const vgmUrl= 'https://www.amazon.in/';

// const isMidi = (link) => {
//   // Return false if there is no href attribute.
//   if(typeof link.href === 'undefined') { return false }

//   return link.href.includes('.mid');
// };


(async () => {
  const response = await got(vgmUrl);
  const dom = new JSDOM(response.body);

  // Create an Array out of the HTML Elements for filtering using spread syntax.
  const nodeList = [...dom.window.document.querySelectorAll('a')];

  nodeList.
//   .filter(isMidi).
  forEach(link => {
    console.log(link.href);
  });
})();