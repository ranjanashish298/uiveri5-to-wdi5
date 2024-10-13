const Page = require("./Page");

const idAttributeNameInputField = /--attribName-input/
const idDescriptionField = /attribDescription/
const idSaveButton = 'ppservice-attribute-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::AttributeConfigurations--save'

class ConfigUiAttrDetailsPage extends Page {


    async iCreateNewAttribute(descriptionText, level, type) {
        await browser.asControl({
            selector: {
                controlType: "sap.m.Input",
                id: idAttributeNameInputField,
            }
        }).enterText(descriptionText + "_" + type.replace(" ","_").toUpperCase()) 

        await browser.asControl({
            selector: {
                controlType: "sap.ui.comp.smartfield.SmartField",
                id: idDescriptionField
            }
        }).enterText("DO NOT USE THIS IN ANY MANUAL PROMOTION. TO BE USED ONLY IN AUTOMATED TESTS");

        await browser.asControl({
            selector: {
                id: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::AttributeConfigurations--attrConfView--attribLocation",
                interaction: {
                        idSuffix: "arrow"
                }
        }}).press();

         await browser.asControl({
            forceSelect: true,
            selector: {
                controlType: "sap.ui.core.ListItem",
                viewId: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::AttributeConfigurations--attrConfView",
                properties: {
                    text: level
                },
                searchOpenDialogs: true,
            }
        }).press();

        await browser.asControl({
            selector: {
                id: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::AttributeConfigurations--attrConfView--attribType",
                interaction: {
                        idSuffix: "arrow"
                }
        }}).press()

        await browser.asControl({
            forceSelect: true,

            selector: {
                controlType: "sap.ui.core.ListItem",
                viewId: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::AttributeConfigurations--attrConfView",
                properties: {
                    text: type
                },
                searchOpenDialogs: true
            }
        }).press();

        await browser.asControl({
            selector: {
                id: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::AttributeConfigurations--save",
                interaction: {
                    idSuffix: "content"
                }
            }
        }).press();
    }


    async iCreateNewAttributeWithLogicalExpression(descriptionText, level, type) {

        await browser.asControl({
            selector: {
                controlType: "sap.m.Input",
                id: idAttributeNameInputField,
            }
        }).enterText(descriptionText + "_" + type.replace(" ","_").toUpperCase());

        await browser.asControl({
            selector: {
                controlType: "sap.ui.comp.smartfield.SmartField",
                id: idDescriptionField
            }
        }).enterText("DO NOT USE THIS IN ANY MANUAL PROMOTION. TO BE USED ONLY IN AUTOMATED TESTS");

        await browser.asControl({
            selector: {
                id: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::AttributeConfigurations--attrConfView--attribLocation",
                interaction: {
                        idSuffix: "arrow"
                }
        }}).press();

        await browser.asControl({
            selector: {
                controlType: "sap.ui.core.ListItem",
                viewId: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::AttributeConfigurations--attrConfView",
                properties: {
                    text: level
                },
                searchOpenDialogs: true,
            }
        }).press();

        await browser.asControl({
            selector: {
                id: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::AttributeConfigurations--attrConfView--exprType",
                interaction: {
                        idSuffix: "arrow"
                }
        }}).press();

        await browser.asControl({
            selector: {
                controlType: "sap.ui.core.ListItem",
                viewId: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::AttributeConfigurations--attrConfView",
                properties: {
                    text: type
                },
                searchOpenDialogs: true,
            }
        }).press();

        await browser.asControl({
            selector: {
                id: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::AttributeConfigurations--save",
                interaction: {
                    idSuffix: "content"
                }
            }
        }).press();


    }

    async iClickSave() {
        await browser.asControl({
            selector: {
                controlType: 'sap.m.Button',
                id: idSaveButton
            }
        }).press()
    }


    async iClickTheBackButton() {
        await browser.asControl({
            forceSelect: true,
            selector: {
                controlType: 'sap.ushell.ui.shell.ShellHeadItem',
                id: 'backBtn'
            }
        }).press();
    }




    //Assertions 

    async iShouldSeeEmptyEditableDetailsPage() {
        const value = await browser.asControl({
            selector: {
                id: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::AttributeConfigurations--attrConfView--attribDescription-input"
            }
        }).getValue();
        expect(value).toEqual("");

    }

    async iShouldSeeAttributeName() {
        
        const visible = await browser.asControl({
            selector: {
                id: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::AttributeConfigurations--listReport"
            }
        }).getVisible();
        expect(visible).toBeTruthy();  // After the table is created, it will be visible
    }  



}

module.exports = new ConfigUiAttrDetailsPage();