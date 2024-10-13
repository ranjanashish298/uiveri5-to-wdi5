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


/**** BEGIN CONSTANTS FOR USECASE:10 ******/
const usecase1_StartDate = "Oct 01, " + year;
const usecase1_EndDate = "Oct 25, " + year;
/**** END CONSTANTS FOR USECASE:10 ******/

describe("promouie2e-uc10", function () {


	it("should login and load the app", async () => {
        await launchpadPage.iShouldSeeTheConfigAndPromoUITiles();
	});


	/**** BEGIN USECASE:10 ******/
	/* Buy 3 products from a Merchandise group and get  19% discount. The discount is granted as Gift Certificate  */


	it("***** UC10 - Buy 3 products from a Merchandise group and get  19% discount. The discount is granted as Gift Certificate", async () => {
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


	it("should create new rule on click of create button", async () => {
		await promotionDetailsPage.iClickPromoRulesCreateButton();
		await rulePage.iShouldSeeTheInitialRuleDetailsPage();
	});

	it("should fill initial rule fields and create", async () => {
		oppssequencecount++;
		await rulePage.iFillTheRuleNameField(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
		await rulePage.iEnterTextFieldArray("Rule Condition Code", ["1234"]);
		await rulePage.iPressTheCreateButtonWithInitialData();
		await rulePage.iShouldSeeTheInitialSavedRuleDetailsPage(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
	});

 it("should add trigger and reward", async () => {
        await rulePage.iPressTheEditButton();
        await rulePage.iAddEligibility("Merchandise Hierarchy Node");
        await rulePage.iAddRewards("Single", "Simple Discount");

        //await rulePage.iEnterMHN("Merchandise Hierarchy Node ID/Name");
        await rulePage.iEnterTextFieldArray("Merchandise Hierarchy Node ID",["0000100001"]);
		await rulePage.iEnterTextFieldArray("Qualifier ID",["Z"]);
		await rulePage.iSelectThresholdTypeArray("Quantity Interval (QUTI)");
        await rulePage.iEnterTextFieldArray("Threshold Quantity", ["3"]);
        await rulePage.iEnterTextFieldArray("Interval Quantity", ["3"]);
        
        await rulePage.iSelectPMA();
        await rulePage.iEnterTextFieldArray("Discount Percentage",["19.00"]);
        await rulePage.iSelectDiscountMethodArray("Gift Certificate (01)");
        await rulePage.iEnterTextFieldArray("Gift Certificate Validity in Days", ["5"]);
        
        await rulePage.iPressTheSaveRuleButton();
        await rulePage.iPressTheWarningOkControl();
        
        await rulePage.iShouldSeeTheFinalSavedRuleDetailsPage(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
        
        await rulePage.iPressTheSeeMoreButton();
        await rulePage.iPressTheEditButton();
        await rulePage.iSelectDecimalPlaces("4");
        await rulePage.iPressTheSaveRuleButton();
        
        await rulePage.iPressVerify();
    });
    
	it("should activate the promotion", async () => {
		await rulePage.iPressTheBackButton();
		await promotionDetailsPage.iPressTheActivateButton();

	});

	it("assert the promotion is active", async () => {
		await promotionDetailsPage.iAssertTheActiveState("Active");
	});


	/**** END USECASE:10******/

});
