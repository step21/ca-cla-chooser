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
    get optionExclusiveNonExclusiveLicense () { return $('#agreement-exclusivity') }
    get optionOutboundSameOnDate () { return $('#outbound-option-same') }
    get optionOutboundNoCommitment () { return $('#outbound-option-no-commitment') }
    get optionDocumentationLicenses () { return $('#medialist') }

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
    async setInboundExclusiveLicense () {
        await this.optionExclusiveNonExclusiveLicense.selectByAttribute('value', 'exclusive')
    }
    async setInboundNonExclusiveLicense () {
        await this.optionExclusiveNonExclusiveLicense.selectByAttribute('value', 'non-exclusive')
    }

    // This function only accepts a string of a license from the list, so only can select one license for now
    // Also passing licenses not in the list will fail // alternative: selectByVisibleText('GNU General Public License v3.0')
    async setOutboundListItems(outboundlicenses = 'GPL-3.0') {
        await this.sameLicensesList.selectByAttribute('value', outboundLicenses)
    }
    async setOutboundListCustom(outboundlicenses = 'The Best License Ever, TBLEL') {
        await this.sameLicensesText.setValue(outboundLicenses)
    }
    async setLicensePolicyLocation(licensePolicyLocation = 'https://sourceproject.org/license-policy') {
        await this.fieldLicensePolicyLocation(licensePolicyLocation)
    }
    // can select one license from the documentation license list
    async setDocumentationLicense(documentationLicense = 'CC0-1.0') { // alternative: selectByVisibleText('Creative Commons Zero v1.0 Universal')
        await this.optionDocumentationLicense.selectByAttribute('value', documentationLicense)
    }
}

module.exports = new CopyrightPage()
