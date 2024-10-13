const Page = require('./Page');

const idGoButton = 'ppservice-attribute-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::AttributeConfigurations--listReportFilter-btnGo'
const idTable = 'ppservice-attribute-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::AttributeConfigurations--responsiveTable-sa'
const idDeleteButton = 'ppservice-attribute-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::AttributeConfigurations--deleteEntry'
const idCreateButton = 'ppservice-attribute-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::AttributeConfigurations--addEntry'
const idExpandButton = 'ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--template:::ListReportPage:::DynamicPageTitle-expandBtn'
const idFilterInputF4 = 'ppservice-attribute-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::AttributeConfigurations--listReportFilter-filterItemControl_BASIC-attributeName-vhi'


class ConfigUiAttrListPage extends Page {

    async iExpandTheHeader() {
        await browser.asControl({
            selector: {
                controlType: 'sap.m.Button',
                id: idExpandButton
            }
        }).press();
    }

    async iClickGoButton() {
        await browser.asControl({
            selector: {
                id: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::AttributeConfigurations--listReportFilter-btnGo",
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press();
    }

    async iDeleteAllTestAttributes() {
        await browser.asControl({
            selector: {
                id: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::AttributeConfigurations--listReportFilter-btnGo",
                interaction: {
                    idSuffix: "content"
                }
            }
        }).press();

        await browser.asControl({
            selector: {
                id: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::AttributeConfigurations--responsiveTable-sa",
                interaction: {
                    idSuffix: "CbBg"
                }
            }
        }).press();

        await browser.asControl({
            selector: {
                id: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::AttributeConfigurations--deleteEntry",
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press();

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
            }
        }).press();



    }

    async iClickCreateButton() {
        await browser.asControl({
            selector: {
                controlType: 'sap.m.Button',
                id: idCreateButton
            }
        }).press();
    }



    async iShouldSeeTheTable() {
        var promoTable = await browser.asControl({
            selector: {
                controlType: "sap.ui.comp.smarttable.SmartTable",
                properties: {
                    entitySet: 'AttributeConfigurations'
                }
            }
        })
        expect(promoTable.isInitialized()).toBeTruthy();
    }

    async iCountRowsInTheTable() {
        const visible = await browser.asControl({
            selector: {
                id: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::AttributeConfigurations--responsiveTable"
            }
        }).getVisible();
        expect(visible).toBeTruthy();
    }


    async iFindOneOfTheNewlyCreatedEntries(levelToBeChecked, typeToBeChecked) {

        const text = await browser.asControl({
            selector: {
                controlType: "sap.m.Text",
                viewId: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::AttributeConfigurations",
                bindingPath: {
                    propertyPath: "location/description"
                }
            }
        }).getText();
        expect(text).toEqual(levelToBeChecked);

        const text2 = await browser.asControl({
            selector: {
                controlType: "sap.m.Text",
                viewId: "ppservice-attribute-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::AttributeConfigurations",
                bindingPath: {
                    propertyPath: "type/description"
                }
            }
        }).getText();
        expect(text2).toEqual(typeToBeChecked);
    }

}
module.exports = new ConfigUiAttrListPage();