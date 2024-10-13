const promotionListPage = require('../pages/thePromotionListPage');
const launchpadPage = require('../pages/theLaunchpadPage');
const promotionDetailsPage = require('../pages/thePromotionDetailsPage');
const rulePage = require('../pages/theRulePage');

const PROMO_NAME_PREFIX = "WDI5 TEST - ";
var PROMO_NAME_TEXT = "";
var oppssequencecount = 0;
const year = 2050; // new Date().getFullYear()

/**** BEGIN CONSTANTS FOR USECASE:12 ******/
const usecase12_StartDate = "Dec 01, " + year;
const usecase12_EndDate = "Dec25, " + year;
/**** END CONSTANTS FOR USECASE:6 ******/

describe("promouie2e-uc12", function () {

    it("should login and load the app", async () => {
        await launchpadPage.iShouldSeeTheConfigAndPromoUITiles();
    });


    /**** BEGIN USECASE:12 ******/
    /* Additional Price type */
    it("********* UC12 - Additional Price Type", async () => {
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
        await promotionDetailsPage.iFillTheStartDateField(usecase12_StartDate);
        await promotionDetailsPage.iFillTheEndDateField(usecase12_EndDate);
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
        await rulePage.iAddEligibility("Additional Price Type");
        await rulePage.iAddRewards("Additional Price Type");
    });

    it("should validate if eligibility and reward is disabled now", async () => {
        await rulePage.iValidateEligibilityIsDisabled();
        await rulePage.iValidateRewardIsDisabled();
    });

    it("should save the promo rule", async () => {
        await rulePage.iPressTheSaveRuleButton();
        await rulePage.iShouldSeeTheFinalSavedRuleDetailsPage(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
    });

    it("should activate the promotion", async () => {
        await rulePage.iPressTheBackButton();
        await promotionDetailsPage.iPressTheActivateButton();
    });

    it("assert the promotion is active", async () => {
		await promotionDetailsPage.iAssertTheActiveState("Active");
	});

    /**** END USECASE:12 ******/
});