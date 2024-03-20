//const { expect } = require('@wdio/globals');
//const page = require('./pageobjects/page.js')
const Page = require('./pageobjects/page');
//const generalpage = require('./pageobjects/general.page')
const { expect } = require('chai');
const page = new Page();


describe('Basic Page load testing', function() {
    // maybe change to beforeEach?
    //before(async function() {
    //    await browser.url('http://localhost:4000/');
    //});

    //it('should load the page correctly', async function() {
        it('should show the right title', async function() {
            await page.open();
            const title = await page.pageTitle;
            // expect... ?
            //await expect(title).toBeExisting();
            expect(title).to.include('Contributor License Agreement Chooser')
//            await expect(title).toHaveTextContaining('Contributor License Agreement Chooser')
        });
    it('should get and log the url', async function() {
        const url = page.pageUrl;
        await console.log(url);
        await expect(url).to.exist;
        //expect(url).
    });

   // });
});

// chai does not allow for arrow functions because of some binding of the test
describe('Contributoragreements.org tests', function() {
    before(async function() {
        await browser.url('https://contributoragreements.org/ca-cla-chooser/');
    });

    it('should show contributoragreements title', async function () {
        let title2 = await browser.getTitle();
        //await expect(title2).toBeExisting();
        await expect(title2).equal('Contributor License Agreement Chooser');
    });

});

/*describe('DuckDuckGo search', function()  {

    before(async function() {
    await browser.url('https://duckduckgo.com');
    });
    it('Searches for WebdriverIO', async () => {
        await browser.url('https://duckduckgo.com/?t=h_&q=WebdriverIO&ia=web')

//        await driver.findElement(By.id("search_form_input")).sendKeys('WebdriverIO'); //, Key.RETURN);
        //await driver.findElement(By.id("searchbox_input")).sendKeys(Keys.ENTER);
        await $('#search_button').click();

        let title = await browser.getTitle()
        expect(title).to.equal('WebdriverIO at DuckDuckGo')
        // or just
        //await expect(driver).toHaveTitle('WebdriverIO at DuckDuckGo')
    });

})*/


