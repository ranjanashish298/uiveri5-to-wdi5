const promotionListPage = require('../pages/thePromotionListPage');
const launchpadPage = require('../pages/theLaunchpadPage');
const promotionDetailsPage = require('../pages/thePromotionDetailsPage');
const rulePage = require('../pages/theRulePage');


const PROMO_NAME_PREFIX = "WDI5 TEST - ";
var oppssequencecount = 0;
//var year = browser.testrunner.config.oppsParams.validityYear;
const year = 2050; //new Date().getFullYear()


/**** BEGIN CONSTANTS FOR USECASE:2 ******/
const usecase1_StartDate = "Feb 01, " + year;
const usecase1_EndDate = "Feb 25, " + year;
/**** END CONSTANTS FOR USECASE:1 ******/


describe("promouie2e-uc2", function () {

    it("should login and load the app", async () => {
        await launchpadPage.iShouldSeeTheConfigAndPromoUITiles();
    });


    /**** BEGIN USECASE:2 ******/
    /* Buy product P1 for 10% off or any product from the merchandise category hierarchy MCH1 for 20% off */


    it("******** UC2 - Buy product P1 for 10% off or any product from the merchandise category hierarchy MCH1 for 20% off ******", async () => {
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

    it("should create 2 new business units", async () => {
            await promotionDetailsPage.iClickBusinessUnitsCreateButton();
            await promotionDetailsPage.iEnterBusinessUnits("1001 1002");
            await promotionDetailsPage.iAddBusinessUnitsType();
            await promotionDetailsPage.iShouldSeeTheInitialPromotionDetailsPage();
        });

    it("should delete 2 business units added", async () => {
                await promotionDetailsPage.iSelectAllBU();
                await promotionDetailsPage.iClickDeleteBU();
                await promotionDetailsPage.iVerify2RowsSelected();
                await promotionDetailsPage.iPressDeleteButton();
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

    it("should add Trgigger and reward", async () => {
        await rulePage.iPressTheEditButton();
        await rulePage.iAddEligibility("Product");
        await rulePage.iAddEligibility("Merchandise Hierarchy Node");
        await rulePage.iAddRewards("Single", "Simple Discount");

        //await rulePage.iEnterProduct("Product ID");
        await rulePage.iEnterTextFieldArray("Product ID", ["NIKE_MENS_TRACKPANT_40"]);
        //await rulePage.iEnterMHN("Merchandise Hierarchy Node ID/Name");
        await rulePage.iEnterTextFieldArray("Merchandise Hierarchy Node ID",["0000100001"]);
		await rulePage.iEnterTextFieldArray("Qualifier ID",["Z"]);
        
        
        await rulePage.iSelectPMA();
        //await rulePage.iEnterDiscountPercentage1("20.000");
        await rulePage.iEnterTextFieldArray("Discount Percentage",["20.00"]);

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
    /**** END USECASE:2******/

});