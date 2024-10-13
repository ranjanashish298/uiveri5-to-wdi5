const {
	default: _ui5Service
} = require("wdio-ui5-service")
const ui5Service = new _ui5Service()
const promotionListPage = require('../pages/thePromotionListPage');
const launchpadPage = require('../pages/theLaunchpadPage');

const PROMO_NAME_PREFIX = "WDI5 TEST - ";
//const PROMO_NAME_PREFIX = "UIVeri5";

describe("promouie2e-cleanup", function () {
	
	 it("should wait till application is loaded", async () => {
        await ui5Service.injectUI5() //only now loading ui5
		await launchpadPage.iShouldSeeTheConfigAndPromoUITiles();
	 });

	/* Cleanup of previous run */
	it("Should Cancel Previous Promotions", async () => {
		await launchpadPage.iClickOnTheTile("Maintain Promotions");
		await promotionListPage.iEnterPromoNameInSearch(PROMO_NAME_PREFIX);
		await promotionListPage.iEnterStatusInStatusSearch();
		await promotionListPage.iPressTheGoButton();
		await promotionListPage.iDeActivatePromotions(PROMO_NAME_PREFIX);  
		//Then.onThePromotionListPage.iShouldSeeEmptyTable();

		
	}); 


	
});
