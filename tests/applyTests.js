//applyTests.js

const ApplyPage = require('./pageobjects/apply.page')
const { expect } = require('chai');
const applyPage = new ApplyPage()

describe('texts should exist', async function() {

    beforeEach(async function() {
        await applyPage.open();
        await applyPage.goThroughAll();
    });

    it('all the tabs should function', async function() {
        // FIXME add other generation steps
        var text = await applyPage.applyResultHtmlFlaText.getValue();
        expect(applyPage.applyResultHtmlFlaText).to.exist;
    })
    it('the length of the text should exist', async function() {
        var text = await applyPage.applyResultHtmlFlaText.getValue();
        console.log(`ApplyPage: The length is: ${text.length}`);
        expect(text.length).to.exist;
    })
});



