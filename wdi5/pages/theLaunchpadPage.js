const Page = require("./Page");
const {
	default: _ui5Service
} = require("wdio-ui5-service")
const ui5Service = new _ui5Service()

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LaunchpadPage extends Page {

    /**
     * define actions for the page object
     */
    async iClickOnTheTile(tileToClick) {
        await browser.asControl({
            selector: {
                controlType: 'sap.m.GenericTile',
                properties: {
                    header: tileToClick //"Maintain Promotions", "Configure Generic Attributes", "Configure Omnichannel Promotion Pricing"
                }
            }

        }).press();
    }


    async iPressTheLogo() {
        await browser.asControl({
            selector: {
                id: "shell-header",
                interaction: {
                    idSuffix: "icon"
                }
            }
        }).press();
    }

    /**
     * define assertions for the page object
     */


    async iShouldSeeTheConfigAndPromoUITiles() {
	    await ui5Service.injectUI5() //only now loading ui5

        const tiles = await browser.allControls({
            selector: {
                controlType: 'sap.m.GenericTile'
            }
        });
        expect(tiles.length).toEqual(3);

    }



}

module.exports = new LaunchpadPage();