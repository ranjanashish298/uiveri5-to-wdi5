const promotionListPage = require('../pages/thePromotionListPage');
const launchpadPage = require('../pages/theLaunchpadPage');
const promotionDetailsPage = require('../pages/thePromotionDetailsPage');
const rulePage = require('../pages/theRulePage');


const PROMO_NAME_PREFIX = "WDI5 TEST - ";
var PROMO_NAME_TEXT = "";
var oppssequencecount = 0;
const year = 2050; //new Date().getFullYear()

/**** BEGIN CONSTANTS FOR USECASE:5 ******/
const usecase5_StartDate = "May 01, " + year;
const usecase5_EndDate = "May 25, " + year;
const idForPM = "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--priceModificationMethodCodeSelect-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--rewardMixAndMatchItemGridList-0";
const idForUom1 = "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--triggerUoMSelect-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--eligibilityGridList-0";
const idForUom2 = "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--triggerUoMSelect-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--eligibilityGridList-1";
const idForUomRew = "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--rewardUoMSelect-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--rewardMixAndMatchItemGridList-0";
const idForReqQuantity = "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--mmRequiredQuantity-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--rewardMixAndMatchItemGridList-0-input";
/**** END CONSTANTS FOR USECASE:5 ******/


describe("promouie2e-uc5", function () {

    it("should login and load the app", async () => {
        await launchpadPage.iShouldSeeTheConfigAndPromoUITiles();
    });

    /**** BEGIN USECASE:5 ******/
    /* Buy 1 P1 for discount price of 2 EUR or 4 P2 for 15% off */
    it("********* UC5 - should Buy 1 P1 for discount price of 2 EUR or 4 P2 for 15% off ************", async () => {
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
        await promotionDetailsPage.iFillTheStartDateField(usecase5_StartDate);
        await promotionDetailsPage.iFillTheEndDateField(usecase5_EndDate);
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
        await rulePage.iAddRewards("Mix and Match", "Product");
        await rulePage.iEnterTextFieldArray("Product ID", ["P1", "P2", "P1"]);
        await rulePage.iSetCheckBoxArray("Consider Non-discountable Items", [ true, true ]);
 		await rulePage.iEnterTextFieldArray("Threshold Quantity", ["1", "4"]);
 		await rulePage.iEnterTextFieldArray("Required Quantity", ["1"]);

        await rulePage.iSelectPriceModificationUsingLabel("Price Modification", "AmountRebate"); //"Amount Discount (RS)";
        await rulePage.iEnterTextFieldArray("Price Modification Amount", ["0.3"]);
        await rulePage.iPressTheSaveRuleButton();
        await rulePage.iPressTheWarningOkControl();

        await rulePage.iShouldSeeTheFinalSavedRuleDetailsPage(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
        await rulePage.iPressTheEditButton();

        await rulePage.iClickRecurrenceTab();
        await rulePage.iPressTheCheckboxControl("ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--HappyHoursSectionRulePage--Recurrent");
        await rulePage.iEnterTextInTheTimeRange("ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--HappyHoursSectionRulePage--StartTime", "0100PM");
        await rulePage.iEnterTextInTheTimeRange("ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--HappyHoursSectionRulePage--EndTime", "0200PM");
        await rulePage.iPressTheCheckboxControl("ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--HappyHoursSectionRulePage--7");
        await rulePage.iPressTheSaveRuleButton();
        //await rulePage.iPressVerify();

    });

    it("should activate the promotion", async () => {
        await rulePage.iPressTheBackButton();
        await promotionDetailsPage.iPressTheActivateButton();
    });

    it("assert the promotion is active", async () => {
		await promotionDetailsPage.iAssertTheActiveState("Active");
	});

    /**** END USECASE:5 ******/

});