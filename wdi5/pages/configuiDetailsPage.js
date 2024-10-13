const Page = require("./Page");

const idDescriptionField = 'ppservice-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Configurations--HeaderData::description::Field'
const idValidFromField = 'ppservice-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Configurations--HeaderData::validFrom::Field-datePicker'
const idSaveButton = 'ppservice-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Configurations--save'

class ConfigUiDetailsPage extends Page {


	async iFillTheTwoHeaderFields(descriptionText) {
		await browser.asControl({
			selector: {
				controlType: 'sap.m.DatePicker',
				id: idValidFromField
			}
		}).enterText('Jan 23, 9999');

		await browser.asControl({
			selector: {
				controlType: 'sap.ui.comp.smartfield.SmartField',
				id: idDescriptionField
			}
		}).enterText(descriptionText)
	}

	async iEnableExternalActionElis() {
		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Configurations--ConfigurationData::enableExternalActionEligibilities::Field-cBoxBool",
				interaction: {
					idSuffix: "CbBg"
				}
			}
		}).press();
	}

	async iVerifyEnablePriceHandlingValue(PriceHandling)  {
        const text = await browser.asControl({
        forceSelect: true,
        	selector: {
                id: "ppservice-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Configurations--ConfigurationData::missingSalesAndOverlappingHandling::Field-text"
        }}).getText();
        expect(text).toEqual(PriceHandling);
    }

    async iClickEdit ()  {
        await browser.asControl({
        	selector: {
                id: "ppservice-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Configurations--edit",
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();
    }

    async iEnableTolerantPriceHandling()  {
        await browser.asControl({
        	selector: {
                id: "ppservice-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Configurations--ConfigurationData::missingSalesAndOverlappingHandling::Field-cBoxBool",
                interaction: {
                        idSuffix: "CbBg"
                }
        }}).press();
    }

	async iClickSave() {
		await browser.asControl({
			selector: {
				controlType: 'sap.m.Button',
				id: idSaveButton
			}
		}).press()
	}


	async iAddPaddingConfig(FIELD_ID, totalSize, totalNumericSize, displayLength, extIDtemp) {
		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--CreatePaddingConfiguration-_tab2",
				interaction: {
					idSuffix: "content"
				}
			}
		}).press();

		await browser.asControl({
			forceSelect: true,
			selector: {
				controlType: "sap.m.Button",
				properties: {
					text: "OK"
				},
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press(); // Click the warning OK- button 

		await browser.asControl({
			forceSelect: true,
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--fieldId",
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "arrow"
				}
			}
		}).press();

		await browser.asControl({
			selector: {
				controlType: "sap.ui.core.ListItem",
				viewId: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations",
				i18NText: {
					propertyName: "text",
					key: FIELD_ID
				},
				searchOpenDialogs: true
			}
		}).press();

		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--totalSize",
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "inner"
				}
			}
		}).enterText(totalSize);

		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--totalNumericSize",
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "inner"
				}
			}
		}).enterText(totalNumericSize);

		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--removeLeadingZerosFlag",
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "CbBg"
				}
			}
		}).press(); // Clicks the box to remove leading zeroes

		await browser.asControl({
		 forceSelect: true,
                     	selector: {
                             controlType: "sap.m.Button",
                             properties: {
                                     text: "OK"
                             },
                             searchOpenDialogs: true,
                             interaction: {
                                     idSuffix: "inner"
                             }
                         }
                 }).press(); //Click confirmation message

                 const isAdditionalSettingEnabled = await browser.asControl({
                 forceSelect: true,
                     	selector: {
                             id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--displayLength",
                             searchOpenDialogs: true
                         }
                 }).getEnabled();
                 expect(isAdditionalSettingEnabled).toBeFalsy(); //Verify Additional setting is disabled

                 await browser.asControl({
                 			selector: {
                 				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--removeLeadingZerosFlag",
                 				searchOpenDialogs: true,
                 				interaction: {
                 					idSuffix: "CbBg"
                 				}
                 			}
                 }).press(); // Uncheck the box to add leading zeroes

                 await browser.asControl({
                     	selector: {
                             id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--displayLength",
                             searchOpenDialogs: true,
                             interaction: {
                                     idSuffix: "inner"
                             }
                         }
                 }).enterText(displayLength); //Enter Display length

                  await browser.asControl({
                     	selector: {
                             id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--template",
                             searchOpenDialogs: true,
                             interaction: {
                                     idSuffix: "inner"
                             }
                         }
                  }).enterText(extIDtemp); //Enter external ID template

                 await browser.asControl({
                     	selector: {
                             id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--onlyUppercaseFlag",
                             searchOpenDialogs: true,
                             interaction: {
                                     idSuffix: "CbBg"
                             }
                         }
                 }).press(); //Check Only Uppercase

                  await browser.asControl({
                     	selector: {
                             id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--displayLeadingZerosFlag",
                             searchOpenDialogs: true,
                             interaction: {
                                     idSuffix: "CbBg"
                             }
                         }
                  }).press(); //Check display leading zeroes

                  await browser.asControl({
                     	selector: {
                             id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--lexicographicalFlag",
                             searchOpenDialogs: true,
                             interaction: {
                                     idSuffix: "CbBg"
                             }
                         }
                  }).press(); //Check lexicographical

         		 await browser.asControl({
                     	selector: {
                             controlType: "sap.m.Button",
                             viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
                             viewId: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations",
                             i18NText: {
                                     propertyName: "text",
                                     key: "Add"
                             },
                             searchOpenDialogs: true,
                             interaction: {
                                     idSuffix: "BDI-content"
                             }
                         }
                  }).press(); //Click Create button
	}

	async iPressWarningOKButton() {
		await browser.asControl({
			forceSelect: true,
			selector: {
				controlType: "sap.m.Button",
				properties: {
					text: "OK"
				},
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "content"
				}
			}
		}).press();
	}

	async iAddNumberRange() {
		await browser.asControl({
			selector: {
				controlType: "sap.m.Button",
				viewId: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations",
				i18NText: {
					propertyName: "text",
					key: "Add"
				},
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();
	}

	async iClickTheBackButton() {
		await browser.asControl({
			selector: {
				controlType: 'sap.ushell.ui.shell.ShellHeadItem',
				id: 'backBtn'
			}
		}).press();
	}


	//assertions: 

	async iShouldSeeEmptyEditableDetailsPage() {
		const editable = await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Configurations--HeaderData::description::Field-input"
			}
		}).getEditable();
		expect(editable).toBeTruthy();

	}

	async iShouldSeeSelectedCheckboxForExternalAction() {

		const value = await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Configurations--ConfigurationData::enableExternalActionEligibilities::Field-text"
			}
		}).getText()
		expect(value).toBe("Yes")
	}

}

module.exports = new ConfigUiDetailsPage();
