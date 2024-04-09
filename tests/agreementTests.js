//const Page = require('./pageobjects/page');
//const ApplyPage = require('./pageobjects/apply.page')
const AgreementPage = require('./pageobjects/agreement.page')
const { expect } = require('chai');
const agreementPage = new AgreementPage()

/*
 * For now, these tests compare the character count of generated documents as a proxy metric for changes in the document.
 */
describe('The length of each document version should be correct', function() {

    beforeEach(async function() {
        await agreementPage.open();
        await agreementPage.goThroughAll();
    });

    it('the fla version (html) with default values should have the right length', async function() {
        await expect(agreementPage.applyResultHtmlFlaText).to.exist;
        let l = await agreementPage.getHtmlFlaTextLength();
        console.log(`The FLA length is: ${l}`)
        await expect(l).to.equal(17019);

    });

       // FIXME add other generation steps
    it('the fla entity version of the text (html) with default values should have the right length', async function() {
        await expect(agreementPage.applyResultHtmlFlaEntityText).to.exist;
        let l = await agreementPage.getHtmlFlaEntityTextLength();
        console.log(`The FLA Entity length is: ${l}`);
        await expect(l).to.equal(17015);
    });


    it('the cla version (html) with default values should have the right length', async function() {
        await expect(agreementPage.applyResultHtmlClaText).to.exist;
        let l = await agreementPage.getHtmlClaTextLength();
        console.log(`The CLA length is: ${l}`)
        await expect(l).to.equal(15531);

    });

    it('the cla entity version (html) with default values should have the right length', async function() {
        await expect(agreementPage.applyResultHtmlClaEntityText).to.exist;
        let l = await agreementPage.getHtmlClaEntityTextLength();
        console.log(`The CLA Entity length is: ${l}`)
        await expect(l).to.equal(15527);

    });
});





