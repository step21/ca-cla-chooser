// apply.page.js
const Page = require('./page');

class ApplyPage extends Page {

    // get fla text fields
    get textAgreementNameFiduciary () { return $('#apply-fla td').selectByVisibleText('Fiduciary Contributor License Agreement') }
    get textAgreementVersionFiduciary () { return $('#apply-fla td').selectByVisibleText('Fiduciary License Agreement 2.0') }
    get textAgreementNameEntityFiduciary () { return $('#apply-fla-entity td').selectByVisibleText('Enity Fiduciary Contributor License Agreement') }
    get textAgreementVersionEntityFiduciary () { return $('#apply-fla-entity td').selectByVisibleText('Fiduciary License Agreement 2.0') }
    // get custom cla text fields
    get textAgreementNameIndividual () { return $('#apply-individual td').selectByVisibleText('Individual Contributor License Agreement') }
    get textAgreementVersionIndividual () { return $('#apply-individual td').selectByVisibleText('Contributor Agreements 1.1') }
    get textAgreementNameEntity () { return $('#apply-entity td').selectByVisibleText('Entity Contributor License Agreement') }
    get textAgreementVersionEntity () { return $('#apply-entity td').selectByVisibleText('ContributorAgreements 1.1') }

    // TODO maybe add additional fields for parts of the actual agreement or preferably do that as a sub-page
    // get fla format fields and content
    get applyResultLinkFla () { return $('#btn-link-fla-indv') }
    get applyResultLinkFlaText () { return this.applyResultLinkFla.getAttribute('href') }
    get applyResultLinkFlaEntity () { return $('#btn-link-fla-entity') }
    get applyResultLinkFlaEntityText () { return this.applyResultLinkFlaEntity.getAttribute('href') }
    get applyResultHtmlFlaBtn () { return $('[href="#myHTML-fla"]') }
    // inconsistency: html version does not have the format (html) in the id
    get applyResultHtmlFlaText () { return $('#embed-agreement-fla') }
    get applyResultMkdnFlaBtn () { return $('[href="#myMKDN-fla"]') }
    get applyResultMkdnFlaText () { return $('#embed-agreement-fla-mkdn') }
    get applyResultHtmlFlaEntityBtn () { return $('[href="#myHTML-fla-entity"]') }
    get applyResultHtmlFlaEntityText () { return $('#embed-agreement-fla-entity') }
    get applyResultMkdnFlaEntityBtn () { return $('[href="#myMKDN-fla-entity"]') }
    get applyResultMkdnFlaEntityText () { return $('#embed-agreement-fla-entity-mkdn') }
    // TODO / Not really sure if accessing the correct text needs to have the button clicked first (i.e. what triggers replacement, though I think it is either always instant or happens on going to the review or apply tab)
    async openHtmlFla () { await this.applyResultHtmlFlaBtn.click() }
    async openMkdnFla () { await this.applyResultMkdnFlaBtn.click() }
    async openHtmlFlaEntity () { await this.applyResultHtmlFlaEntityBtn.click() }
    async openMkdnFlaEntity () { await this.applyResultMkdnFlaEntityBtn.click() }

    // get custom cla format fields and content
    get applyResultLinkCla () { return $('#btn-link-cla-indv') }
    get applyResultLinkClaText () { return this.applyResultLinkCla.getAttribute('href') }
    get applyResultLinkClaEntity () { return $('#btn-link-cla-entity') }
    get applyResultLinkClaEntityText () { return this.applyResultLinkClaEntity.getAttribute('href') }
    get applyResultHtmlClaBtn () { return $('[href=#myHTML]') }
    get applyResultHtmlClaText () { return $('#embed-agreement') }
    get applyResultMkdnClaBtn () { return $('[href=#myMKDN]') }
    get applyResultMkdnClaText () { return $('#embed-agreement-mkdn') }
    get applyResultHtmlClaEntityBtn () { return $('[href=#myHTML-entity]') }
    get applyResultHtmlClaEntityText () { return $('#embed-agreement-entity') }
    get applyResultMkdnClaEntityBtn () { return $('[href=#myMKDN-entity]') }
    get applyResultMkdnClaEntityText () { return $('#embed-agreement-entity-mkdn') }
    async openHtmlCla () { await this.applyResultHtmlClaBtn.click() }
    async openMkdnCla () { await this.applyResultMkdnClaBtn.click() }
    async openHtmlClaEntity () { await this.applyResultHtmlClaEntityBtn.click() }
    async openMkdnClaEntity () { await this.applyResultMkdnClaEntityBtn.click() }
    // get e-signing content
    get applyLinkEsign () { $('#link-esign').getAttribute('href') }
    get applyEmbedCodeEsign () { $('#embed-esign') }
    get applyEmbedCodeEsignValue () { this.applyEmbedCodeEsign.getValue() }
}

module.exports = ApplyPage;
