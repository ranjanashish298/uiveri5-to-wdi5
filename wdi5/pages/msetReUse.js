const Page = require("./Page");


class MsetReUse extends Page {

    async iCheckReferenceTypeValue (RefType)  {
        const text = await browser.asControl({
        forceSelect: true,
    	    selector: {
            id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--MSetGeneralInformation::referenceTypeText::Field-text"
        }}).getText();
    expect(text).toEqual(RefType);
    }

    async iShouldSeeReferrableMsets()  {
        const text = await browser.asControl({
        forceSelect: true,
    	    selector: {
            controlType: "sap.m.Title",
            viewName: "ppservice-manage-promo-ui.ext.canvas.reusableMsets.view.ReusableMsetsTable",
            viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.Canvas.view.Canvas::reusableMsets--template::ImplementingComponentContent---app--beginView",
            i18NText: {
                    propertyName: "text",
                    key: "ReferableMerchandiseSets"
            }
        }}).getText();
    expect(text).toEqual("Referable Merchandise Sets");
    }

    async iSearchReferrableMset (ParentMset)  {
        await browser.asControl({
        forceSelect: true,
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.Canvas.view.Canvas::reusableMsets--template::ImplementingComponentContent---app--beginView--searchField",
                interaction: {
                        idSuffix: "I"
                }
        }}).enterText(ParentMset);
    }

    async iOpenReferPage()  {
        await browser.asControl({
        forceSelect: true,
        	selector: {
                controlType: "sap.ui.core.Icon",
                viewName: "ppservice-manage-promo-ui.ext.canvas.reusableMsets.view.ReusableMsetsTable",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.Canvas.view.Canvas::reusableMsets--template::ImplementingComponentContent---app--beginView",
                properties: {
                        src: {
                                regex: {
                                        source: "slim\\-arrow\\-right"
                                }
                        }
                }
        }}).press();
    }

    async iPressRefer() {
        await browser.asControl({
        forceSelect: true,
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.Canvas.view.Canvas::reusableMsets--template::ImplementingComponentContent---app--detailView--referButton",
                interaction: {
                        idSuffix: "content"
                }
        }}).press();
    }

    async iVerifyReferredPromotion (PromoID,PromoDesc)  {
        const text = await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--MSetGeneralInformation::referredFrom::Field-text"
        }}).getText();
        expect(text).toEqual(PromoID+"-"+PromoDesc);
    }

    async iVerifyPropagationStatus (PropStatus) {
        const text = await browser.asControl({
         forceSelect: true,
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--MSetGeneralInformation::propagationStatus::Field-text"
        }}).getText();
        expect(text).toEqual(PropStatus);
    }

    async iPressViewReference() {
        await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--action::viewReferenceButton",
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();
    }

    async iPressPropagate()  {
        await browser.asControl({
        	selector: {
                controlType: "sap.m.Button",
                viewName: "ppservice-manage-promo-ui.ext.canvas.referredMsets.view.ReferredMsetsPage",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.Canvas.view.Canvas::referredMsets--template::ImplementingComponentContent---app--beginView",
                properties: {
                        text: "Propagate"
                },
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();
    }

    async iPressPropagateAll()  {
        await browser.asControl({
        	selector: {
                controlType: "sap.ui.unified.MenuItem",
                viewName: "ppservice-manage-promo-ui.ext.canvas.referredMsets.view.ReferredMsetsPage",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.Canvas.view.Canvas::referredMsets--template::ImplementingComponentContent---app--beginView",
                properties: {
                        text: "All"
                },
                searchOpenDialogs: true,
                interaction: {
                        idSuffix: "txt"
                }
        }}).press();
    }

    async iDeleteReference(){
        await browser.asControl({
            	selector: {
                    id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--action::deleteReferenceButton-img"
            }}).press();

        const text = await browser.asControl({
            	selector: {
                    controlType: "sap.m.Text",
                    properties: {
                            text: "You are about to permanently delete the merchandise set reference. Do you want to proceed? "
                    },
                    searchOpenDialogs: true
            }}).getText();
            expect(text).toEqual("You are about to permanently delete the merchandise set reference. Do you want to proceed? ");

        await browser.asControl({
            	selector: {
                    controlType: "sap.m.Button",
                    properties: {
                            text: "Delete"
                    },
                    searchOpenDialogs: true,
                    interaction: {
                            idSuffix: "BDI-content"
                    }
            }}).press();
    }



}


module.exports = new MsetReUse();