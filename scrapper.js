const puppeteer = require('puppeteer');
const charactersUrls = require('./charactersUrls.json');

const main = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for(let index = 0; index < 3; index++){
        let element = charactersUrls[index];
        let name = element.name;
        let build = await scrapeStats(page, element.url);
        
        console.log({name, build});
    }

    await browser.close();
};

// Function to scrape the stats of a single character
async function scrapeStats(page, url) {
    await page.goto(url);

    const build = await page.evaluate(() => {
        const buildStats = document.querySelector('div.build-stats');
        const stats = buildStats.querySelector('div.list').querySelectorAll('li');
        return Array.from(stats).map((stats) => {
            const stat = stats.querySelector('p').innerText;
            return stat;
        });
    });

    return build;
};

main();