const Page = require('./pageobjects/page');
const { expect } = require('chai');
const page = new Page();


beforeEach(async function () {
    await page.open();
    await page.goThroughAll();
})

describe('Basic Page load testing', async function() {

        it('should show the right page title', async function() {
            await page.open();
            const title = await page.pageTitle;
            expect(title).to.include('Contributor License Agreement Chooser')
        });
    it('should get and log the url', async function() {
        const url = await page.pageUrl;
        console.log(url);
        await expect(url).to.exist;
    });

});

// chai does not allow for arrow functions because of some binding of the test
describe('Contributoragreements.org tests', async function() {
    before(async function() {
        await browser.url('https://contributoragreements.org/ca-cla-chooser/');
    });

    it('should show contributoragreements title', async function () {
        let title2 = await browser.getTitle();
        //await expect(title2).toBeExisting();
        await expect(title2).equal('Contributor License Agreement Chooser');
    });

});

describe('the url and query should be correct', async function () {
    describe('without any changes (default versions)', async function () {
        it('should have the correct length', async function () {
            console.log('STUB: testing if the url query has the correct length')
        });
        it('should have the correct number of parameters', async function () {
            console.log('STUB: testing the correct number of url parameters')
        });
        it('should have the correct parameters', async function () {
            console.log('STUB: testing the correct url + query parameters')
        });
    })
})



