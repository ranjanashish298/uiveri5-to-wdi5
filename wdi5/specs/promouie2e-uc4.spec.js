const promotionListPage = require('../pages/thePromotionListPage');
const launchpadPage = require('../pages/theLaunchpadPage');
const promotionDetailsPage = require('../pages/thePromotionDetailsPage');
const rulePage = require('../pages/theRulePage');

const PROMO_NAME_PREFIX = "WDI5 TEST - ";
var oppssequencecount = 0;
const year = 2050; //new Date().getFullYear()


/**** BEGIN CONSTANTS FOR USECASE:4 ******/
const usecase4_StartDate = "Apr 01, " + year;
const usecase4_EndDate = "Apr 25, " + year;
const idForPriceModificationSingleReward = "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--priceModificationMethodCodeSelect-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--rewardMixAndMatchItemGridList-0"
/**** END CONSTANTS FOR USECASE:4 ******/


describe("promouie2e-uc4", function () {

    it("should login and load the app", async () => {
        await launchpadPage.iShouldSeeTheConfigAndPromoUITiles();
    });

    /**** BEGIN USECASE:4 ******/
    /* Buy 3 products P1 for 0.30 Euros off */
    it("********* UC4 - should Buy 3 products P1 for 0.30 Euros off ************", async () => {
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
        await promotionDetailsPage.iFillTheStartDateField(usecase4_StartDate);
        await promotionDetailsPage.iFillTheEndDateField(usecase4_EndDate);
        await promotionDetailsPage.iClickCreateButton();
    });

    });

    describe("promouie2e-uc4: Search for Customers with Customer Name", function () {

    it("should create new business unit of customer type", async () => {
        await promotionDetailsPage.iClickBusinessUnitsCreateButton();
        await promotionDetailsPage.iSelectBusinessUnitsType();
        await promotionDetailsPage.iSearchCustomer("rajkumar/12345 waldorf");
        await promotionDetailsPage.iAddBusinessUnitsType();
        await promotionDetailsPage.iPressOKButton();
        await promotionDetailsPage.iShouldSeeTheInitialPromotionDetailsPage();
    });

    });

    describe("promouie2e-uc4", function () {

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
        await rulePage.iAddEligibility("Generic Attribute");
        await rulePage.iAddEligibility("Product");
        await rulePage.iAddRewards("Mix and Match", "Product");
        await rulePage.iSelectTxnGA("UIVERI5_TRANSACTION_STRING");
        //await rulePage.iEnterTxnGaValue("ADIDAS");
        await rulePage.iEnterTextFieldArray("Value", ["ADIDAS"]);

        await rulePage.iEnterTextFieldArray("Product ID", ["P1","P1"]);
        await rulePage.iEnterTextFieldArray("Required Quantity", ["1"]);
        await rulePage.iSelectPriceModificationUsingLabel("Price Modification", "AmountRebate"); //"Amount Discount (RS)";
        await rulePage.iEnterTextFieldArray("Price Modification Amount", ["15"]);
        await rulePage.iPressTheSaveRuleButton();
        await rulePage.iPressTheWarningOkControl();

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


    /**** END USECASE:4 ******/

});