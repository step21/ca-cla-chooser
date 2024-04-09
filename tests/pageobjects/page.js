const { browser } = require('@wdio/globals')
// Page.js

class Page {

    get pageTitle () { return browser.getTitle() }
    get pageUrl () { return browser.getUrl() }

    get navBullets () { return $('ul .bullets') }
    get generalBullet () { return $('#generalBullet') }
    get copyrightBullet () { return $('#copyrightBullet') }
    get patentsBullet () { return $('#patentsBullet') }
    get reviewBullet () { return $('#reviewBullet') }
    get applyBullet () { return $('#applyBullet') }

    get nextBtn () { return $('.next a') }
    get previousBtn () { return $('.previous a') }

    open (path = '') {
        return browser.url(`http://localhost:4000${path}`)
    }
    async next () {
        await this.nextBtn.click()
        //(await this.
    }
    async previous () {
        await this.previousBtn.click()
    }
    async gotoGeneral () {
        await browser.isElementDisplayed(await this.generalBullet.selector);
        //await browser.waitUntil(this.generalBullet.isVisibleWithinViewport(), 20000, 'link not visible')
        await this.generalBullet.click()
    }
    async gotoCopyright () {
        await this.copyrightBullet.click()
    }
    async gotoPatents () {
        await this.patentsBullet.click()
    }
    async gotoReview () {
        await this.reviewBullet.click()
    }
    async gotoApply () {
        await this.applyBullet.click()
    }
    async goThroughAll () {
        await this.gotoGeneral()
        await this.gotoCopyright()
        await this.gotoPatents()
        await this.gotoReview()
        await this.gotoApply()
    }
}

module.exports = Page;
