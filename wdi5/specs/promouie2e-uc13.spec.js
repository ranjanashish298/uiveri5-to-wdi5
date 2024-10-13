const promotionListPage = require('../pages/thePromotionListPage');
const launchpadPage = require('../pages/theLaunchpadPage');
const promotionDetailsPage = require('../pages/thePromotionDetailsPage');
const productGroupPage = require('../pages/theProductGroupPage');
const rulePage = require('../pages/theRulePage');
const msetReUse = require('../pages/msetReUse');

const PROMO_NAME_PREFIX = "WDI5 TEST - ";
var PROMO_ID1 = 0;
var PROMO_ID2 = 0;
const PROMO_NAME_TEXT1 = PROMO_NAME_PREFIX + new Date().getTime();
var oppssequencecount = 0;
//var year = browser.testrunner.config.oppsParams.validityYear;
const year = 2000 //new Date().getFullYear()


/**** BEGIN CONSTANTS FOR USECASE:1 ******/
const usecase13Parent_StartDate = "Jan 01, " + year;
const usecase13Parent_EndDate = "Jan 25, " + year;
const usecase13Child_StartDate = "Feb 01, " + year;
const usecase13Child_EndDate = "Feb 25, " + year;
/**** END CONSTANTS FOR USECASE:1 ******/

describe("promouie2e-uc13", function () {


	it("should login and load the app", async () => {
        await launchpadPage.iShouldSeeTheConfigAndPromoUITiles();
	});


	/**** BEGIN USECASE:13 ******/
	/* Buy product P1 from a Merchandise set and get a 5% Discount on P1 */


	it("***** UC13 - should Buy product P1 for a discount price of 1 EUR or any product from the merchandise category hierarchy MCH1 for a discount price of 1 EUR", async () => {
		await launchpadPage.iPressTheLogo();
		await launchpadPage.iClickOnTheTile("Maintain Promotions");

	});


	it("should create new promotion", async () => {
//		await promotionListPage.iSelectStandardVariant();
		await promotionListPage.iClickCreateButton();
		await promotionDetailsPage.iShouldSeeTheInitialPromotionDetailsPage();
	});


	it("should fill initial promotion fields and save", async () => {
		await promotionDetailsPage.iFillThePromoNameField(PROMO_NAME_TEXT1);
		await promotionDetailsPage.iFillThePromoDescriptionField(PROMO_NAME_TEXT1);
		await promotionDetailsPage.iFillTheStartDateField(usecase13Parent_StartDate);
		await promotionDetailsPage.iFillTheEndDateField(usecase13Parent_EndDate);
		await promotionDetailsPage.iClickCreateButton();
		await promotionDetailsPage.iShouldSeeTheBasicPromotionPage(PROMO_NAME_TEXT1);
		PROMO_ID1 = await promotionDetailsPage.iGetPromoID();
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

	it("should Include a Product", async () => {
		await productGroupPage.iPressTheAddIncludedProductButton("NIKE_MENS_TRACKPANT_40");
//		await productGroupPage.iAddMultipleProductsInMerchandiseSet("PUMA_TEES PUMA_TSHIRT_BLUE_COLOR");
	});

	it("should add Excluded Product", async () => {
		await productGroupPage.iPressTheAddExcludedProductButton("AB_TSHIRT");
		await productGroupPage.iPressTheAddExcludedHierarchyNodeButton();
		await productGroupPage.iEnterExcludedMHN("1000");

	});

	it("should verify reference type", async () => {
    		await msetReUse.iCheckReferenceTypeValue("Independent");
    });

	it("should press verify and goBack", async () => {
		await productGroupPage.iPressVerify();
		await productGroupPage.iPressTheBackButton();

	});

	const PROMO_NAME_TEXT2 = PROMO_NAME_PREFIX + new Date().getTime();

	it("should create a new promotion", async () =>{
	    await rulePage.iPressTheBackButton();
//	    await rulePage.iPressTheBackButton();
	    await promotionListPage.iClickCreateButton();
        await promotionDetailsPage.iShouldSeeTheInitialPromotionDetailsPage();
    });

	it("should fill initial promotion fields and save", async () => {
    	await promotionDetailsPage.iFillThePromoNameField(PROMO_NAME_TEXT2);
    	await promotionDetailsPage.iFillThePromoDescriptionField(PROMO_NAME_TEXT2);
    	await promotionDetailsPage.iFillTheStartDateField(usecase13Child_StartDate);
    	await promotionDetailsPage.iFillTheEndDateField(usecase13Child_EndDate);
    	await promotionDetailsPage.iClickCreateButton();
    	await promotionDetailsPage.iShouldSeeTheBasicPromotionPage(PROMO_NAME_TEXT2);
    	PROMO_ID2 = await promotionDetailsPage.iGetPromoID();
    });

    it("should create new business units", async () => {
    	await promotionDetailsPage.iClickBusinessUnitsCreateButton();
    	await promotionDetailsPage.iEnterBusinessUnits("1001");
    	await promotionDetailsPage.iAddBusinessUnitsType();
    	await promotionDetailsPage.iShouldSeeTheInitialPromotionDetailsPage();
    });

    it("should create child merchandise sets", async () => {
    	await promotionDetailsPage.iClickMerchandiseSetsCreateRefButton();
    	await msetReUse.iShouldSeeReferrableMsets();
    	await msetReUse.iSearchReferrableMset(PROMO_NAME_TEXT1);
    	await msetReUse.iOpenReferPage();
    	await msetReUse.iPressRefer();
    });

    it("should verify refered fields", async () =>{
        await promotionDetailsPage.iNavigatetoMsetPage();
        await msetReUse.iCheckReferenceTypeValue("Child");
        await msetReUse.iVerifyReferredPromotion(PROMO_ID1,PROMO_NAME_TEXT1)
        //check mset name
    });

   it("should open parent mset", async() =>{
        await rulePage.iPressTheBackButton();
        await rulePage.iPressTheBackButton();
        await promotionListPage.iEnterPromoNameInSearch(PROMO_NAME_TEXT1);
        await promotionListPage.iPressTheGoButton();
        await promotionListPage.iNavigateToPromoDetails();
        await promotionDetailsPage.iNavigatetoMsetPage();
   });

   it("should check if reference type is parent", async() =>{
        await msetReUse.iCheckReferenceTypeValue("Parent");
   });

   it("should add a By Attribute", async () => {
   		await productGroupPage.iPressAddByAttribute();
   		await productGroupPage.iSelectByAttribute("UIVERI5_LINE_ITEM_STRING");
   		await productGroupPage.iEnterByAttribute("1.2");
   		await productGroupPage.iPressTheEditButton();
   		await productGroupPage.iPressTheGlobalSaveButton();
   });

   it("should propagate change to child", async () =>{
       await msetReUse.iPressViewReference();
       await msetReUse.iPressPropagate();
       await msetReUse.iPressPropagateAll();
       await rulePage.iPressTheBackButton();
   });

   it("should create new rule on click of create button", async () => {
        await rulePage.iPressTheBackButton();
   		await promotionDetailsPage.iClickPromoRulesCreateButton();
   		await rulePage.iShouldSeeTheInitialRuleDetailsPage();
   	});

   	it("should fill initial rule fields and create", async () => {
   		oppssequencecount++;
   		await rulePage.iFillTheRuleNameField(PROMO_NAME_TEXT1 + "-Rule-" + oppssequencecount);
   		await rulePage.iPressTheCreateButtonWithInitialData();
   		await rulePage.iShouldSeeTheInitialSavedRuleDetailsPage(PROMO_NAME_TEXT1 + "-Rule-" + oppssequencecount);
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

   		await rulePage.iShouldSeeTheFinalSavedRuleDetailsPage(PROMO_NAME_TEXT1 + "-Rule-" + oppssequencecount);
   		await rulePage.iPressVerify();
   	});

   it("should activate the promotion", async () => {
   		await rulePage.iPressTheBackButton();
   		await promotionDetailsPage.iPressTheActivateButton();

   	});

   it("assert the promotion is active", async () => {
   		await promotionDetailsPage.iAssertTheActiveState("Active");
   });

  it("should open child mset", async() =>{
        await rulePage.iPressTheBackButton();
        await promotionListPage.iEnterPromoID(PROMO_ID2);
        await promotionListPage.iPressTheGoButton();
        await promotionListPage.iNavigateToPromoDetails();
   });

   it("should create new rule on click of create button", async () => {
    //            await rulePage.iPressTheBackButton();
        await promotionDetailsPage.iClickPromoRulesCreateButton();
        await rulePage.iShouldSeeTheInitialRuleDetailsPage();
    });

    it("should fill initial rule fields and create", async () => {
        oppssequencecount++;
        await rulePage.iFillTheRuleNameField(PROMO_NAME_TEXT2 + "-Rule-" + oppssequencecount);
        await rulePage.iPressTheCreateButtonWithInitialData();
        await rulePage.iShouldSeeTheInitialSavedRuleDetailsPage(PROMO_NAME_TEXT2 + "-Rule-" + oppssequencecount);
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

        await rulePage.iShouldSeeTheFinalSavedRuleDetailsPage(PROMO_NAME_TEXT2 + "-Rule-" + oppssequencecount);
        await rulePage.iPressVerify();
    });

    it("should validate propagation status for child", async () =>{
        await rulePage.iPressTheBackButton();
        await promotionDetailsPage.iNavigatetoMsetPage();
        await msetReUse.iVerifyPropagationStatus("In Sync");
    });

    it("should delete reference to parent mset", async () =>{
        await msetReUse.iDeleteReference();
        await msetReUse.iCheckReferenceTypeValue("Independent");
    });

    it("should create a new child merchandise sets", async () => {
        await rulePage.iPressTheBackButton();
        await promotionDetailsPage.iClickMerchandiseSetsCreateRefButton();
        await msetReUse.iShouldSeeReferrableMsets();
        await msetReUse.iSearchReferrableMset(PROMO_NAME_TEXT1);
        await msetReUse.iOpenReferPage();
        await msetReUse.iPressRefer();
    });

    it("should activate the promotion", async () => {
        await promotionDetailsPage.iPressTheActivateButton_NoExtesnion();
        await promotionDetailsPage.reloadPage();
        await promotionDetailsPage.iPressTheActivateButton();
    });

     it("assert the promotion is active", async () => {
     		await promotionDetailsPage.iAssertTheActiveState("Active");
     });

	/**/




	/**** END USECASE:13******/

});
