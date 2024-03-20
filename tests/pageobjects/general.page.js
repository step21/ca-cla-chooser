// general.page.js
const { $ } = require('@wdio/globals')
const Page = require('./page')
//import Page from './page'

class GeneralPage extends Page {

    get btnFsfeCompliance () { return $('#fsfe-compliance') }
    get btnNonFsfeCompliance () { '#non-fsfe-compliance' }
    get fieldBeneficiaryName () { '#beneficiary-name' }
    get fieldProjectName () { '#project-name' }
    get fieldProjectWebsite () { '#project-website' }
    get fieldProjectEmail () { '#project-email' }
    get fieldContributorSigningProcessWebsite () { '#contributor-process-url' }
    get fieldJurisdiction () { '#project-jurisdiction' }


}

module.exports = new GeneralPage()
//export default new GeneralPage()
