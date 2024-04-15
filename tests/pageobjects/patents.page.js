// patents.page.js
import Page from './page'

class PatentsPage extends Page {

    // non-fsfe patent options
    get patentLicenseType () { return $('#patent-option') }
    // FIXME these should be functions not getters...
    //get patentLicense () {return this.patentType.selectByVisibleText('Traditional Patent License') }
    //get patentPledge () {return this.patentType.selectByVisibleText('Identified Patent Pledge') }
    async clickPatentOption () {
        await this.patentType.click()
    }
    async selectTraditionalPatentLicense () {
        // FIXME convert to selectByAttribute after switching patent stuff to lowercase everywhere
        this.patentLicenseType.selectByVisibleText('Traditional Patent License')
    }
    async selectPatentPledge () {
        await this.patentLicenseType.selectByVisibleText('Identified Patent Pledge')
    }
    
}

module.exports = new PatentsPage()
//export default new PatentsPage()
