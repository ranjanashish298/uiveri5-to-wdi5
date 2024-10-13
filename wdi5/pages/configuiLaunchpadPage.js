const Page = require("./Page");

class ConfigUiLaunchpadPage extends Page {

	async iClickOnTheConfigTile() {
		await browser.asControl({
			selector: {
				controlType: 'sap.m.GenericTile',
				properties: {
					header: 'Configure Omnichannel Promotion Pricing'
				}
			}
		}).press();
	}


	//assertions

	async iShouldSeeTheConfigTile() {

		const tiles = await browser.allControls({
			selector: {
				controlType: 'sap.m.GenericTile'
			}
		});
		expect(tiles.length).toEqual(3);
		
	}
}

module.exports = new ConfigUiLaunchpadPage();