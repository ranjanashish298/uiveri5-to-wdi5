const promotionListPage = require('../pages/thePromotionListPage');
const launchpadPage = require('../pages/theLaunchpadPage');
const promotionDetailsPage = require('../pages/thePromotionDetailsPage');
const productGroupPage = require('../pages/theProductGroupPage');
const rulePage = require('../pages/theRulePage');

const PROMO_NAME_PREFIX = "WDI5 TEST - ";
const PROMO_NAME_TEXT = PROMO_NAME_PREFIX + new Date().getTime();
var oppssequencecount = 0;
//var year = browser.testrunner.config.oppsParams.validityYear;
const year = 2050 //new Date().getFullYear()


/**** BEGIN CONSTANTS FOR USECASE:1 ******/
const usecase1_StartDate = "Jan 01, " + year;
const usecase1_EndDate = "Jan 25, " + year;
/**** END CONSTANTS FOR USECASE:1 ******/

describe("promouie2e-uc1", function () {


	it("should login and load the app", async () => {
        await launchpadPage.iShouldSeeTheConfigAndPromoUITiles();
	});


	/**** BEGIN USECASE:1 ******/
	/* Buy product P1 from a Merchandise set and get a 5% Discount on P1 */


	it("***** UC1 - should Buy product P1 for a discount price of 1 EUR or any product from the merchandise category hierarchy MCH1 for a discount price of 1 EUR", async () => {
		await launchpadPage.iPressTheLogo();
		await launchpadPage.iClickOnTheTile("Maintain Promotions");

	});


	it("should create new promotion", async () => {
		await promotionListPage.iClickCreateButton();
		await promotionDetailsPage.iShouldSeeTheInitialPromotionDetailsPage();
	});


	it("should fill initial promotion fields and save", async () => {
		await promotionDetailsPage.iFillThePromoNameField(PROMO_NAME_TEXT);
		await promotionDetailsPage.iFillThePromoDescriptionField(PROMO_NAME_TEXT);
		await promotionDetailsPage.iFillTheStartDateField(usecase1_StartDate);
		await promotionDetailsPage.iFillTheEndDateField(usecase1_EndDate);
		await promotionDetailsPage.iClickCreateButton();
		await promotionDetailsPage.iShouldSeeTheBasicPromotionPage(PROMO_NAME_TEXT);
	});

	it("should create new business units", async () => {
		await promotionDetailsPage.iClickBusinessUnitsCreateButton();
		await promotionDetailsPage.iEnterBusinessUnits("1001");
		await promotionDetailsPage.iAddBusinessUnitsType();
		await promotionDetailsPage.iShouldSeeTheInitialPromotionDetailsPage();
	});

	it("should create new merchandise sets", async () => {
		await promotionDetailsPage.iClickMerchandiseSetsCreateButton();
		await productGroupPage.iShouldSeeMSetName();
	});
});

describe("promouie2e-uc1: Search product by product description", function () {

	it("should search product by product description", async () => {
    	await productGroupPage.iPressTheAddIncludedProductButtonByDesc("NIKE_MENS_TRACKPANT_50","NIKE_MENS_TRACKPANT_001")
    });
});

describe("promouie2e-uc1: Mass Deletion in Mset object page facets", function () {

	it("should delete all products included", async () => {
    	await productGroupPage.iAddMultipleProductsInMerchandiseSet("P1 P2 P3 P4 P5 P6 P7 P8 P9 P10 P11");
    	await productGroupPage.iPressTheEditButton();
        await productGroupPage.iEnterUomForInclusions("EA");
        await productGroupPage.iPressTheGlobalSaveButton();
    	await productGroupPage.iPressDeleteAllIncludeProductButton();
    	await productGroupPage.iPressDeleteAllPopUpButton();
    	await productGroupPage.iValidateNoDataIncludeProduct();
    });

    it("should delete all MHNs included", async () => {
        await productGroupPage.iPressTheAddInludedHierarchyNodeButton();
        await productGroupPage.iEnterIncludedMHN("1000");
        await productGroupPage.iPressDeleteAllIncludeMHNButton();
       	await productGroupPage.iPressDeleteAllPopUpButton();
        await productGroupPage.iValidateNoDataIncludeMHN();
    });

    it("should delete all GAs included", async () => {
        await productGroupPage.iPressAddByAttribute();
       	await productGroupPage.iSelectByAttribute("UIVERI5_LINE_ITEM_STRING");
       	await productGroupPage.iEnterByAttribute("1.2");
       	await productGroupPage.iPressAddByAttribute();
        await productGroupPage.iSelectByAttribute("UIVERI5_LINE_ITEM_LONG");
        await productGroupPage.iEnterByAttribute("1.2");
        await productGroupPage.iPressDeleteAllIncludeGAButton();
        await productGroupPage.iPressDeleteAllPopUpButton();
        await productGroupPage.iValidateNoDataIncludeGA();
    });

    it("should delete all products excluded", async () => {
		await productGroupPage.iPressTheAddExcludedProductButton("AB_TSHIRT");
        await productGroupPage.iPressDeleteAllExcludeProductButton();
        await productGroupPage.iPressDeleteAllPopUpButton();
        await productGroupPage.iValidateNoDataExcludeProduct();
    });

     it("should delete all GAs excluded", async () => {
		await productGroupPage.iPressAddExcludedGenericAttribute();
        await productGroupPage.iSelectByExcludedAttribute("UIVERI5_LINE_ITEM_STRING");
        await productGroupPage.iEnterByExcludedAttribute("1.2");
		await productGroupPage.iPressDeleteAllExcludeGAButton();
        await productGroupPage.iPressDeleteAllPopUpButton();
        await productGroupPage.iValidateNoDataExcludeGA();
     });

	 it("should delete all MHNs excluded", async () => {
        await productGroupPage.iPressTheAddExcludedHierarchyNodeButton();
        await productGroupPage.iEnterExcludedMHN("1000");
		await productGroupPage.iPressDeleteAllExcludeMHNButton();
        await productGroupPage.iPressDeleteAllPopUpButton();
        await productGroupPage.iValidateNoDataExcludeMHN();
     });

	 it("should show info message when no item to delete", async () =>{
		await productGroupPage.iPressIncludeButton();
		await productGroupPage.iPressDeleteAllIncludeProductButton();
		await productGroupPage.iValidateNoDataAvailablePopUp();
	 })

	});

describe("promouie2e-uc1", function () {

	it("should Include a Product", async () => {
		await productGroupPage.iPressTheAddIncludedProductButton("NIKE_MENS_TRACKPANT_40");
		await productGroupPage.iAddMultipleProductsInMerchandiseSet("PUMA_TEES PUMA_TSHIRT_BLUE_COLOR");

	});

	it("should add a By Attribute", async () => {
		await productGroupPage.iPressAddByAttribute();
		await productGroupPage.iSelectByAttribute("UIVERI5_LINE_ITEM_STRING");
		await productGroupPage.iEnterByAttribute("1.2");
		
		//use/add uom feature
		await productGroupPage.iPressTheEditButton();
		await productGroupPage.iEnterUomForInclusions("EA");
		await productGroupPage.iPressTheGlobalSaveButton();
	});

	it("should add Excluded Product", async () => { 
		await productGroupPage.iPressTheAddExcludedProductButton("AB_TSHIRT");
		await productGroupPage.iPressTheAddExcludedHierarchyNodeButton();
		await productGroupPage.iEnterExcludedMHN("1000");

	});

	it("should press verify and goBack", async () => {
		await productGroupPage.iPressVerify();
		await productGroupPage.iPressTheBackButton();

	});


	it("should create new rule on click of create button", async () => {
		await promotionDetailsPage.iClickPromoRulesCreateButton();
		await rulePage.iShouldSeeTheInitialRuleDetailsPage();
	});

	it("should fill initial rule fields and create", async () => {
		oppssequencecount++;
		await rulePage.iFillTheRuleNameField(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
		await rulePage.iPressTheCreateButtonWithInitialData();
		await rulePage.iShouldSeeTheInitialSavedRuleDetailsPage(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
	});

	it("should add triggers and reward", async () => {
		await rulePage.iPressTheEditButton();
		await rulePage.iAddEligibility("Merchandise Set");
		await rulePage.iAddRewards("Single", "Buy N Get M Discounted");

		await rulePage.iSelectMerchandiseSet();
		await rulePage.iSelectThresholdTypeArray("Quantity (QUT)");

		await rulePage.iSelectPMA();
		await rulePage.iEnterTextFieldArray("Discount Percentage",["5.00"]);
		await rulePage.iEnterTextFieldArray("Quantity to Be Discounted",["10.00"]);
		await rulePage.iPressTheSaveRuleButton();
		
		await rulePage.iShouldSeeTheFinalSavedRuleDetailsPage(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
		await rulePage.iPressVerify();
	});


	it("should activate the promotion", async () => {
		await rulePage.iPressTheBackButton();
		await promotionDetailsPage.iPressTheActivateButton();

	});

	it("assert the promotion is active", async () => {
		await promotionDetailsPage.iAssertTheActiveState("Active");
	});




	/**** END USECASE:1******/

});
