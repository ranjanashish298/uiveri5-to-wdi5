const promotionListPage = require('../pages/thePromotionListPage');
const launchpadPage = require('../pages/theLaunchpadPage');
const promotionDetailsPage = require('../pages/thePromotionDetailsPage');
const rulePage = require('../pages/theRulePage');

const PROMO_NAME_PREFIX = "WDI5 TEST - ";
var oppssequencecount = 0;
const year = 2050; //new Date().getFullYear()
//const year = new Date().getFullYear()

/**** BEGIN CONSTANTS FOR USECASE:3 ******/
const usecase1_StartDate = "Mar 01, " + year;
const usecase1_EndDate = "Mar 25, " + year;
const idForTQ = "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--thresholdQuantity-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--eligibilityGridList-0-input";
const idForPM = "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--priceModificationMethodCodeSingleReward";
const idForUom1 = "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--triggerUoMSelect-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--eligibilityGridList-0";
/**** END CONSTANTS FOR USECASE:3 ******/


describe("promouie2e-uc3", function () {

    it("should login and load the app", async () => {
        await launchpadPage.iShouldSeeTheConfigAndPromoUITiles();
    });

    /**** BEGIN USECASE:3 ******/
    /* Buy product P1 for threshold quantity 2 and get subsequent discount of amount 5 when it crossed the threshold quantity */
    it("***** UC3 - Buy product P1 for threshold quantity 2 and get subsequent discount of amount 5 when it crossed the threshold quantity", async () => {
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
        await rulePage.iPressTheCreateButtonWithInitialData();
        await rulePage.iShouldSeeTheInitialSavedRuleDetailsPage(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
    });

    it("should add triggers and reward", async () => {
        await rulePage.iPressTheEditButton();

        await rulePage.iAddEligibility("Product");
        await rulePage.iAddRewards("Single", "Simple Discount");
        await rulePage.iEnterTextFieldArray("Product ID", ["P1"]);

        await rulePage.iSelectPriceModification("AmountRebate"); //"Amount Discount (RS)";
        //await rulePage.iEnterDiscountAmount("10");
        await rulePage.iEnterTextFieldArray("Threshold Quantity", ["2"]);
       await rulePage.iSetCheckBoxArray("Mixing Forbidden", [ true ]);


        await rulePage.iEnterTextFieldArray("Discount Amount",["10.00"]);


        await rulePage.iSelectSubsequentDiscountPriceModification("AmountRebate");
        await rulePage.iEnterTextFieldArray("Amount for Subsequent Discount", ["5"]);

        await rulePage.iPressTheSaveRuleButton();
        await rulePage.iPressTheWarningOkControl();

        await rulePage.iShouldSeeTheFinalSavedRuleDetailsPage(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
        await rulePage.iPressVerify();

    });

    it("Should validate calculation base type added", async () =>{
        await rulePage.iPressAdvancedRuleSettingsFacet();
        await rulePage.iPressShowMoreButton();
        await rulePage.iCheckCalculationBaseType("Sales Only Or Returns Only");
    });

    it("Should update calculation base type", async () =>{
        await rulePage.iPressTheEditButton();
        await rulePage.iAddCalculationBaseType();
        await rulePage.iPressTheSaveRuleButton();
        await rulePage.iCheckCalculationBaseType("Sales Minus Returns");
    });

    it("should activate the promotion", async () => {
        await rulePage.iPressTheBackButton();
        await promotionDetailsPage.iPressTheActivateButton();
    });

    it("assert the promotion is active", async () => {
		await promotionDetailsPage.iAssertTheActiveState("Active");
	});

    /**** END USECASE:3******/

});