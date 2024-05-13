const puppeteer = require('puppeteer');
const charactersUrls = require('./charactersUrls.json');

const main = async (name) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // for(let index = 0; index < 3; index++){
    //     let element = charactersUrls[index];
    //     let name = element.name;
    //     let build = await scrapeStats(page, element.url);

    //     console.log({name, build});
    // }

    const character = charactersUrls.find((element) => element.name == name);

    let build = await scrapeStats(page, character.url);
    console.log({ build });

    await browser.close();
};

// Function to scrape the stats of a single character
async function scrapeStats(page, url) {
    await page.goto(url);

    const build = await page.evaluate(() => {
        try {
            const buildStats = document.querySelector('div.build-stats');
            const stats = buildStats.querySelector('div.list').querySelectorAll('li');
            return Array.from(stats).map((stats) => {
                const stat = stats.querySelector('p').innerText;
                return stat;
            });
        } catch (err) { return "Sorry, could not find any info."};
    });

    return build;
};

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Enter a character name: ', name => {
    console.log(`Looking for information on ${name}`);
    main(name);
    readline.close();
});