//const { expect } = require('@wdio/globals');
//const page = require('./pageobjects/page.js')
const Page = require('./pageobjects/page');
//const generalpage = require('./pageobjects/general.page')
const { expect } = require('chai');
const page = new Page();


describe('Basic Page load testing', function() {

        it('should show the right page title', async function() {
            await page.open();
            const title = await page.pageTitle;
            expect(title).to.include('Contributor License Agreement Chooser')
        });
    it('should get and log the url', async function() {
        const url = page.pageUrl;
        await console.log(url);
        await expect(url).to.exist;
    });

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



