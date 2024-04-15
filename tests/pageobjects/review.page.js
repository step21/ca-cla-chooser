// review.page.js
import Page from './page'

class ReviewPage extends Page {

    // review page
    get reviewBeneficiaryName () { return $('#review-beneficiary-name') }  // FIXME On the page, this is calledn entity name - make consistent!
    get reviewProjectName () { return $('#review-project-name') }
    get reviewProjectWebsite () { return $('#review-project-website') }
    get reviewProjectEmail () { return $('#review-project-email') }
    get reviewContributorSigningProcessWebsite () { return $('#review-contributor-process-url') }
    get reviewProjectJurisdiction () {return $('#review-project-jurisdiction') }
    get reviewAgreementExclusivity () { return $('#review-agreement-exclusivity') }
    get reviewOutboundLicenses () { return $('#review-outbound-licenses') }
    // no media licenses for fsfe fla - (and why is it called 'line' at the end?
    get reviewDocumentationLicenses () { return $('#review-media-licenses-line') }
    get reviewPatentType () { return $('#review-patent-type') }
    get reviewTextFla () { return $('#review-text-fla') }
    get reviewTextFlaEntity () { return $('#review-text-fla-entity') }
    // get non-fsfe review Texts
    get reviewText () { return $('#review-text') }
    get reviewTextEntity () { return $('#review-text-entity' ) }
}

module.exports = new ReviewPage()
//export default new ReviewPage()
