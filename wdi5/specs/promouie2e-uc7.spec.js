const promotionListPage = require('../pages/thePromotionListPage');
const launchpadPage = require('../pages/theLaunchpadPage');
const promotionDetailsPage = require('../pages/thePromotionDetailsPage');
const rulePage = require('../pages/theRulePage');

const PROMO_NAME_PREFIX = "WDI5 TEST - ";
var PROMO_NAME_TEXT="";
var oppssequencecount = 0;
const year = 2050;

/**** BEGIN CONSTANTS FOR USECASE:7 ******/
const usecase7_StartDate = "Jul 01, " + year;
const usecase7_EndDate = "Jul 25, " + year;
const idForUom1 = "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--triggerUoMSelect-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--eligibilityGridList-0";
const idForUom2 = "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--triggerUoMSelect-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--eligibilityGridList-1";
const idForTQ1 = "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--thresholdQuantity-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--eligibilityGridList-0-input";
const idForTQ2 = "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--thresholdQuantity-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--eligibilityGridList-1-input";
const idForLM1 = "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--limitQuantity-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--eligibilityGridList-0-input";
const idForLM2 = "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--limitQuantity-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--eligibilityGridList-1-input"
/**** END CONSTANTS FOR USECASE:7 ******/



describe("promouie2e-uc7", function () {

    it("should login and load the app", async () => {
        await launchpadPage.iShouldSeeTheConfigAndPromoUITiles();
    });

    /**** BEGIN USECASE:7 ******/
    /* Buy 1 product X and 1 product Y for a set price of 20 EUR */
    it("********* UC7 - should Buy 1 product X and 1 product Y for a set price of 20 EUR ************", async () => {
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
        await promotionDetailsPage.iFillTheStartDateField(usecase7_StartDate);
        await promotionDetailsPage.iFillTheEndDateField(usecase7_EndDate);
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
        await rulePage.iAddEligibility("Product");
        await rulePage.iAddRewards("Single", "Coupon");

        await rulePage.iEnterTextFieldArray("Product ID", ["P1","P2"]);
        //await rulePage.iSelectFromDropDown("Unit of Measure", "EA");

        
        await rulePage.iSelectPriceModificationUsingLabel("Price Modification", "TotalPercentRebate");
        await rulePage.iEnterTextFieldArray("Discount Percentage", ["20"]);
        await rulePage.iEnterTextFieldArray("Printout Coupon ID", ["COUPON_ID_1"]);
        await rulePage.iSelectFromDropDown("Printout Coupon Rule", "PrintAsExtraReceipt");
        await rulePage.iEnterTextFieldArray("Coupon Validity in Days", ["365"]);

        
        await rulePage.iPressTheSaveRuleButton();
        await rulePage.iPressTheWarningOkControl();
        await rulePage.iShouldSeeTheFinalSavedRuleDetailsPage(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
        //await rulePage.iPressVerify();

    });

    it("should activate the promotion", async () => {
        await rulePage.iPressTheBackButton();
        await promotionDetailsPage.iPressTheActivateButton();
    });
    
    it("assert the promotion is active", async () => {
		await promotionDetailsPage.iAssertTheActiveState("Active");
	});

    /**** END USECASE:7 ******/
});