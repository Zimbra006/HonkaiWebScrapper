const puppeteer = require('puppeteer');

const name = "topaz"
const url = "https://www.prydwen.gg/star-rail/characters/".concat('', name);

async function scrapeStats(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const characterName = await page.evaluate(() => {
        const info = document.querySelector('div.left-info');
        return info.querySelector('strong').innerText;
    });

    const build = await page.evaluate(() => {
        const buildStats = document.querySelector('div.build-stats');
        const stats = buildStats.querySelector('div.list').querySelectorAll('li');
        return Array.from(stats).map((stats) => {
            const stat = stats.querySelector('p').innerText;
            return stat;
        });
    });

    console.log({characterName, build});

    await browser.close();
}

scrapeStats(url)