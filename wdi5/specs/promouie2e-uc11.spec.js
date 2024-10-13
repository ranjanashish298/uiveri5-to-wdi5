const promotionListPage = require('../pages/thePromotionListPage');
const launchpadPage = require('../pages/theLaunchpadPage');
const promotionDetailsPage = require('../pages/thePromotionDetailsPage');
const rulePage = require('../pages/theRulePage');

const PROMO_NAME_PREFIX = "WDI5 TEST - ";
var PROMO_NAME_TEXT = "";
var oppssequencecount = 0;
const year = 2050; // new Date().getFullYear()

/**** BEGIN CONSTANTS FOR USECASE:6 ******/
const usecase11_StartDate = "Nov 01, " + year;
const usecase11_EndDate = "Nov 25, " + year;
/**** END CONSTANTS FOR USECASE:6 ******/

describe("promouie2e-uc11", function () {

    it("should login and load the app", async () => {
        await launchpadPage.iShouldSeeTheConfigAndPromoUITiles();
    });


    /**** BEGIN USECASE:11 ******/
    /* Buy 1.5 non-countable products for 10% off */
    it("********* UC11 - should Buy 1.5 non-countable products for 10% off ************", async () => {
        PROMO_NAME_TEXT = PROMO_NAME_PREFIX + new Date().getTime();
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
        await promotionDetailsPage.iFillTheStartDateField(usecase11_StartDate);
        await promotionDetailsPage.iFillTheEndDateField(usecase11_EndDate);
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
        await rulePage.iPressTheCreateButtonWithInitialData();
        await rulePage.iShouldSeeTheInitialSavedRuleDetailsPage(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
    });

    it("should add triggers and reward", async () => {
        await rulePage.iPressTheEditButton();
        await rulePage.iAddEligibility("Product");
        await rulePage.iAddRewards("Mix and Match", "Product");
        await rulePage.iEnterTextFieldArray("Product ID", ["P1", "P1"]);

        await rulePage.iSelectThresholdTypeArray("Quantity (QUT)");
        await rulePage.iEnterTextFieldArray("Threshold Quantity", ["1.5"]);

        await rulePage.iSelectPriceModificationUsingLabel("Price Modification", "PercentRebate"); //"Amount Discount (RS)";

        await rulePage.iEnterTextFieldArray("Price Modification Amount Percentage", ["10"]);
    });

    it("should click GET button to get sequence and Resolution values in Rule Page ", async () => {
        await rulePage.iPressGetButtonInRulePage();
    });

    it("should save the rule page",async()=>{
        await rulePage.iPressTheSaveRuleButton();
        await promotionDetailsPage.iPressOKButton();
        await rulePage.iShouldSeeTheFinalSavedRuleDetailsPage(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
        await rulePage.iPressVerify();
    });

    it("should validate Sequence and Resolution Values after updating in rule page", async () => {
        await rulePage.iPressAdvancedRuleSettingsFacet();
        await rulePage.iValidateSequence();
        await rulePage.iValidateResolution();
    });

    it("should update Sequence and Resolution Values in rule page", async () => {
        await rulePage.iPressTheEditButton();
        await rulePage.iEnterResolutionValue();
        await rulePage.iEnterSequenceValue();
        await rulePage.iPressTheSaveButton();
    });

    it("should validate if the Get is disabled in display mode of promo page", async () => {
        await rulePage.iPressTheBackButton();
        await promotionDetailsPage.iGetButtonDisabled();
    });

    it("should display Promo page in Edit Mode", async () => {
        await promotionDetailsPage.iClickEditButton();
    });

    it("should click GET button to get sequence and Resolution values", async () => {
        await promotionDetailsPage.iClickGetButton();
    });

    it("should save Promotion Page", async () => {
        await promotionDetailsPage.iSavePromotion();
    });

    it("should navigate to Promo Rule page", async () => {
        await promotionDetailsPage.iNavigateToPromoRulePage();
    });

    it("should validate Sequence and Resolution Values", async () => {
        await rulePage.iPressAdvancedRuleSettingsFacet();
        await rulePage.iValidateSequence();
        await rulePage.iValidateResolution();
    });

    });

    describe("promouie2e-uc11: Extensibility: Customer Specific Validations", function () {

     it("should validate the promotion", async () => {
        await rulePage.iPressTheBackButton();
        await promotionDetailsPage.iPressTheValidateButton();
        await promotionDetailsPage.iAssertValidateAction();
     });

    it("should activate the promotion", async () => {
//        await rulePage.iPressTheBackButton();
        await promotionDetailsPage.iPressTheActivateButton();
    });

    it("assert the promotion is active", async () => {
		await promotionDetailsPage.iAssertTheActiveState("Active");
	});

    /**** END USECASE:11 ******/
});