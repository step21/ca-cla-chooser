// apply.page.js
const ApplyPage = require('./apply.page');

// cheerio is used to parse the html in the textarea, as this cannot be parsed normally via webdriverio or jquery I think
const cheerio = require('cheerio');

class AgreementPage extends ApplyPage {

    
    get htmlFlaTextLength () { return this.applyResultHtmlFlaText.getValue().length  }
    get htmlFlaEntityTextLength () { return this.applyResultHtmlFlaEntityText.getValue().length }

    get htmlClaTextLength () { return this.applyResulthtmlClaText.getValue().length }
    get htmlClaEntityTextLength () {}
    //$$$fla = cheerio.load(this.applyResultHtmlFlaText);
//    get agreementFlaTitle () { $$$fla('#tmp-title') 
    //get agreementFlaSubtitle
    
    //get applyResultHtmFlaText () { return $('#embed-agreement-fla') }

    //get applyResultMkdnFlaText () { return $('#embed-agreement-fla-mkdn') }
    //get applyResultHtmlFlaEntityText () { return $('#embed-agreement-fla-entity') }
    //get applyResultMkdnFlaEntityText () { return $('#embed-agreement-fla-entity-mkdn') }

    /*
     * get applyResultLinkFla () { return $('#btn-link-fla-indv') }
 19     get applyResultLinkFlaText () { return this.applyResultLinkFla.getAttribute('href') }
 20     get applyResultLinkFlaEntity () { return $('#btn-link-fla-entity') }
 21     get applyResultLinkFlaEntityText () { return this.applyResultLinkFlaEntity.getAttribute('href') }
 22     get applyResultHtmlFlaBtn () { return $('[href="#myHTML-fla"]') }
 23     // inconsistency: html version does not have the format (html) in the id
 24     get applyResultHtmlFlaText () { return $('#embed-agreement-fla') }
 25     get applyResultMkdnFlaBtn () { return $('[href="#myMKDN-fla"]') }
 26     get applyResultMkdnFlaText () { return $('#embed-agreement-fla-mkdn') }
 27     get applyResultHtmlFlaEntityBtn () { return $('[href="#myHTML-fla-entity"]') }
 28     get applyResultHtmlFlaEntityText () { return $('#embed-agreement-fla-entity') }
 29     get applyResultMkdnFlaEntityBtn () { return $('[href="#myMKDN-fla-entity"]') }
 30     get applyResultMkdnFlaEntityText () { return $('#embed-agreement-fla-entity-mkdn') }
 31     // TODO / Not really sure if accessing the correct text needs to have the button clicked
    */

}
module.exports = AgreementPage;
