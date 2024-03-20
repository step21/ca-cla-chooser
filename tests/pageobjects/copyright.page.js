// copyright.page.js
import Page from './page'

class CopyrightPage extends Page {

    // fsfe copyright options
    get optionOutboundFsf () { return $('#outbound-option-fsfe') }
    get optionOutboundListedLicenses () { return $('#outbound-option-same-licenses') }
    get sameLicensesList () { return $('#outboundlist') }
    get sameLicensesText () { return $('#outboundlist-custom') }
    get optionOutboundLicensePolicy () { return $('#outbound-option-license-policy') }
    get fieldLicensePolicyLocation () { return $('#license-policy-location') }
    // extra options for non-fsfe
    get optionOutboundSameOnDate () { return $('#outbound-option-same') }
    get optionOutboundNoCommitment () { return $('#outbound-option-no-commitment') }
    get optionDocumentationLicense () { return $('#medialist') }

    async selectOutboundFsf () {
        await this.optionOutboundFsf.click()
    }
    async selectOutboundListedLicenses () {
        await this.optionOutboundListedLicenses.click()
    }
    async selectOutboundLicensePolicy () {
        await this.optionOutboundLicensePolicy.click()
    }
    async selectOutboundSameOnDate () {
        await this.optionOutboundSameOnDate.click()
    }
    async selectOutboundNoCommitment () {
        await this.optionOutboundNoCommitment.click()
    }
}

module.exports = new CopyrightPage()
//export default new CopyrightPage()
