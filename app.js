const puppeteer = require('puppeteer');

const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res) => {
  (async () => {
    let some = [];
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
  
    await page.goto('https://m.oliveyoung.co.kr/m/mtn/liveshop');
  
    const allResultsSelector = '.LiveCommentBubble_bubble-text__I7oBA';
    await page.waitForSelector(allResultsSelector);
    const evaluate = await page.evaluate(() => {
      var lst = document.querySelectorAll('.LiveCommentBubble_bubble-text__I7oBA');
      return Array.from(lst).map(x => x.textContent);
    });
  
    some = evaluate;
  
    await browser.close();
    res.send(some);
  })();
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
