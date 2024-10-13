const Page = require("./Page");

class ConfigUiAttrLaunchpadPage extends Page {

    async iClickOnTheConfigTile() {
        await browser.asControl({
            selector: {
                controlType: 'sap.m.GenericTile',
                properties: {
                    header: 'Configure Generic Attributes'
                }
            }
        }).press();
    }


    async iShouldSeeTheConfigTile() {
        const tile = await browser.allControls({
            selector: {
                controlType: 'sap.m.GenericTile'
            }
        })
        expect(tile.length).toEqual(3);
    }
}

module.exports = new ConfigUiAttrLaunchpadPage();