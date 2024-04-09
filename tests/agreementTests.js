//const Page = require('./pageobjects/page');
//const ApplyPage = require('./pageobjects/apply.page')
const AgreementPage = require('./pageobjects/agreement.page')
const { expect } = require('chai');
const agreementPage = new AgreementPage()


describe('The length of each document version should be correct', function() {
    it('the fla version with default values should have the right length', async function() {
        // FIXME add other generation steps
        await agreementPage.open();
        await expect(agreementPage.applyResultHtmlFlaText).to.exist;
        await expect(agreementPage.htmlFlaTextLength).to.exist;
        await expect(agreementPage.htmlFlaTextLength).toEqual(17071);
    })
    it('the fla entity version of the text with default version should have the right length', async function() {
        await agreementPage.open();
        await expect(agreementPage.htmlFlaTextEntityLength).to.exist;
    })
});

describe('Basic Page load testing', function() {

        it('should show the right agreement title', async function() {
            await agreementPage.open();
            const title = await agreementPage.pageTitle;
            expect(title).to.include('Contributor License Agreement Chooser')
        });
    it('should get and log the url', async function() {
        const url = agreementPage.pageUrl;
        await console.log(url);
//        await expect(browser).toHaveUrlContaining('localhost')
        await expect(url).to.exist;
    });

});




