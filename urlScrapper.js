/* 

    This file is used to scrape the character list and return a .json 
    listing the urls to each character page

*/

const puppeteer = require('puppeteer');
const fs = require('fs');

const url = "https://www.prydwen.gg/star-rail/characters";

const main = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const charactersUrls = await page.evaluate(() => {
        const characterCards = document.querySelectorAll('div.avatar-card');
        return Array.from(characterCards).map((characterCards) => {
            const name = characterCards.querySelector('span.emp-name').innerText;
            const url = characterCards.querySelector('a').href;
            return {name, url};
        });
    });

    await browser.close();

    return JSON.stringify(charactersUrls);
};

main();