// apply.page.js
import ApplyPage from './apply.page'

class AgreementPage extends ApplyPage {

    get agreementFlaTitle () { this.applyResultHtmlFlaText() }
    //get agreementFlaSubtitle
    
    //get applyResultHtmFlaText () { return $('#embed-agreement-fla') }

    //get applyResultMkdnFlaText () { return $('#embed-agreement-fla-mkdn') }
    //get applyResultHtmlFlaEntityText () { return $('#embed-agreement-fla-entity') }
    //get applyResultMkdnFlaEntityText () { return $('#embed-agreement-fla-entity-mkdn') }


}
module.exports = new AgreementPage()
//export default new AgreementPage()
