// apply.page.js
const ApplyPage = require('./apply.page');

// cheerio is used to parse the html in the textarea, as this cannot be parsed normally via webdriverio or jquery I think
const cheerio = require('cheerio');

class AgreementPage extends ApplyPage {
    // FIXME are lengths here based on the correct text, or do they count hidden things?
    // These are used to get the lengths, then before each, actual wizard steps are performed to get the various versions
    async getHtmlFlaTextLength () {
        var text = await this.applyResultHtmlFlaText.getValue();
        return text.length
    }

    async getHtmlFlaEntityTextLength () {
        var text = await this.applyResultHtmlFlaEntityText.getValue();
        return text.length
    }

    async getHtmlClaTextLength () {
        var text = await this.applyResultHtmlClaText.getValue();
        return text.length
    }

    async getHtmlClaEntityTextLength () {
        var text = await this.applyResultHtmlClaEntityText.getValue();
        return text.length
    }

    async getLinkFlaLength () {
        var link = await this.applyResultLinkFlaText;
        console.log(`fla link: ${link}`);
        return link.length
    }


    //$$$fla = cheerio.load(this.applyResultHtmlFlaText);
//    get agreementFlaTitle () { $$$fla('#tmp-title') 
    //get agreementFlaSubtitle

}
module.exports = AgreementPage;
