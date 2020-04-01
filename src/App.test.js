const puppeteer = require('puppeteer');


describe('App Load', () => {
  test('App with data loads correctly', async () => {
    let browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
      devtools: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 768,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.App-title');
    await page.waitForSelector('.Page-title');
    await page.waitForSelector('.navbar');
    await page.waitForSelector('.search-group');
    await page.waitForSelector('.chart-container');
    await page.waitForSelector('.table');
    await page.waitForSelector('.chart-row')
    await page.waitForSelector('.button-websockets');

    const appTitle = await page.$eval('.App-title', e => e.innerHTML);
    const navbar = await page.$eval('.navbar', el => el ? true : false)  
    const chartRow = await page.$eval('.chart-row', el => el ? true : false)  
    expect(appTitle).toBe('Binance Market App');
    expect(navbar).toBe(true) 
    expect(chartRow).toBe(true) 
    browser.close();
  }, 20000);
});

describe('BNB', () => {
    test('Navigate to BNB, add to favorites, close Websockets', async () => {
      let browser = await puppeteer.launch({
        headless: true,
        slowMo: 100,
        devtools: false
      });
      let page = await browser.newPage();
      let testString = 'bnb/btc'
  
      page.emulate({
        viewport: {
          width: 768,
          height: 2400
        },
        userAgent: ''
      });
  
      await page.goto('http://localhost:3000/');
      await page.click('.nav-bnb');
      await page.click('.input');
      await page.type('.input', testString) 
      const rowContents = await page.$eval('.chart-row-contents', e => e.textContent);
      expect(rowContents).toBe("★BNB/BTC");
      await page.click('.fav-button');
      await page.click('.nav-fav');
      const favContents = await page.$eval('.chart-row-contents', e => e.textContent);
      expect(favContents).toBe("★BNB/BTC");
      await page.click('.button-websockets');
 

      browser.close();
    }, 20000);
  });