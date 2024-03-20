// patents.page.js
import Page from './page'

class PatentsPage extends Page {

    // non-fsfe patent options
    get patentType () { return $('#patent-option') }
    get patentLicense () {return this.patentType.selectByVisibleText('Traditional Patent License') }
    get patentPledge () {return this.patentType.selectByVisibleText('Identified Patent Pledge') }
    async selectPatentOption () {
        await this.patentType.click()
    }

}

module.exports = new PatentsPage()
//export default new PatentsPage()
