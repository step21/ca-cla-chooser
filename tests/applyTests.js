//applyTests.js

const ApplyPage = require('./pageobjects/apply.page')
const { expect } = require('chai');
const applyPage = new ApplyPage()

describe('texts should exist', function() {

    it('all the tabs should function', async function() {
        // FIXME add other generation steps
        await applyPage.open();
        await applyPage.goThroughAll();
        expect(applyPage.applyResultHtmlFlaText).to.exist;
        console.log(await applyPage.applyResultHtmlFlaText.getValue());
    })
});



