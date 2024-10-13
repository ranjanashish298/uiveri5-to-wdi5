const Page = require("./Page");

const idGoButton = 'ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--listReportFilter-btnGo'
const idTable = 'ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--responsiveTable-_tab0-sa'
const idDeleteButton = 'ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--deleteEntry-_tab0'
const idCreateButton = 'ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--addEntry-_tab0'
const idExpandButton = 'ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--template:::ListReportPage:::DynamicPageTitle-expandBtn'

class ConfigUiListPage extends Page {

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
				controlType: 'sap.m.Button',
				id: idGoButton
			}
		}).press();
	}


	async iSelectAllAndPressDeleteIfAny() {


		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--responsiveTable-_tab0-sa",
				interaction: {
					idSuffix: "CbBg"
				}
			}
		}).press();

		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--deleteEntry-_tab0",
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();

		await browser.asControl({
			selector: {
				controlType: "sap.m.Button",
				viewId: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations",
				i18NText: {
					propertyName: "text",
					key: "DELETE"
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


	async iPresstab(text) {
		await browser.asControl({
			selector: {
				id: text,
				interaction: {
					idSuffix: "text"
				}
			}
		}).press();
	}


	async iSelectEntryAndDelete2() {
		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--responsiveTable-_tab1-sa",
				interaction: {
					idSuffix: "CbBg"
				}
			}
		}).press();

		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--deleteEntry-_tab1",
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();

		await browser.asControl({
			selector: {
				controlType: "sap.m.Button",
				viewId: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations",
				i18NText: {
					propertyName: "text",
					key: "DELETE"
				},
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "content"
				}
			}
		}).press();
	}


	async iAddEntityName(textRecieved) {
		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--CreateNumberRange-_tab1",
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();

		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--entityName",
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
				properties: {
					text: textRecieved
				},
				searchOpenDialogs: true
			}
		}).press();

		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--startRange",
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "inner"
				}
			}
		}).enterText("5000");

		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--endRange",
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "inner"
				}
			}
		}).enterText("100000");

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


	async iSelectAllAndPressDeleteIfAnyPaddingConfig() {
		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--responsiveTable-_tab2-sa",
				interaction: {
					idSuffix: "CbBg"
				}
			}
		}).press();

		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--deleteEntry-_tab2",
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();

		await browser.asControl({
			selector: {
				controlType: "sap.m.Button",
				viewId: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations",
				i18NText: {
					propertyName: "text",
					key: "DELETE"
				},
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();

	}


	async iPressCreateUOM() {
		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--CreateUnitOfMeasure-_tab3",
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();
	}

	async iEnterText(idCode) {
		await browser.asControl({
			selector: {
				id: idCode,
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "inner"
				}
			}
		}).enterText("ABC");
	}

	async iFindAndDelete(text) {
		await browser.asControl({
            	selector: {
                    id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--listReport-_tab3-btnPersonalisation-img"
        }}).press();

        await browser.asControl({
            	selector: {
                    controlType: "sap.m.IconTabFilter",
                    viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
                    viewId: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations",
                    properties: {
                            text: "Filter"
                    },
                    searchOpenDialogs: true,
                    interaction: {
                            idSuffix: "text"
                    }
        }}).press();

        await browser.asControl({
            	selector: {
                    controlType: "sap.ui.core.Icon",
                    viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
                    viewId: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations",
                    properties: {
                            src: {
                                    regex: {
                                            source: "slim\\-arrow\\-down"
                                    }
                            }
                    },
                    searchOpenDialogs: true
        }}).press();

        await browser.asControl({
            	selector: {
                    controlType: "sap.m.StandardListItem",
                    viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
                    viewId: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations",
                    properties: {
                            title: "Internal Code"
                    },
                    searchOpenDialogs: true,
                    interaction: {
                            idSuffix: "titleText"
                    }
        }}).press();

        await browser.asControl({
            	selector: {
                    id: "FilterPanel-filterItemControlUnitOfMeasurementGeneralInfo-ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--listReport-_tab3-code",
                    searchOpenDialogs: true,
                    interaction: {
                            idSuffix: "inner"
                    }
        }}).enterText(text);

         await browser.asControl({
            	selector: {
                    controlType: "sap.m.Button",
                    viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
                    viewId: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations",
                    properties: {
                            text: "OK"
                    },
                    searchOpenDialogs: true,
                    interaction: {
                            idSuffix: "BDI-content"
                    }
         }}).press();

         await browser.asControl({
             	selector: {
                     id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--responsiveTable-_tab3-sa",
                     interaction: {
                             idSuffix: "CbBg"
                     }
         }}).press();

         await browser.asControl({
             	selector: {
                     id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--deleteEntry-_tab3",
                     interaction: {
                             idSuffix: "BDI-content"
                     }
         }}).press();

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



	async iSelectLangauage() {
		await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--languageCode",
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "arrow"
				}
			}
		}).press();

		await browser.asControl({
			selector: {
				controlType: "sap.m.StandardListItem",
				viewId: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations",
				properties: {
					title: "English"
				},
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "content"
				}
			}
		}).press();
	}

	async iPressAddUOM() {
		await browser.asControl({
			forceSelect: true,
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



	// assertions

	async iShouldSeeTheTable() {
		var promoTable = await browser.asControl({
			selector: {
				controlType: "sap.ui.comp.smarttable.SmartTable",
				properties: {
					entitySet: 'Configurations'
				}
			}
		});
		expect(promoTable.isInitialized()).toBeTruthy();
	}

	async iShouldSeeEmptyTable() {
		var showNoData = await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--responsiveTable-_tab0"
			}
		});
		expect(showNoData.isInitialized()).toBeTruthy();
		// Checking here if the isInitialised() method returns a truthy value, which indicates that 
		// the object is correctly initialised. If the method returns a falsy value, the test case will fail
	}

	async iFindTheNewlyCreatedEntryUOM(descriptionToBeChecked) {
		const text = await browser.asControl({
			selector: {
				controlType: "sap.m.Text",
				viewId: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations",
				bindingPath: {
					path: "/UnitOfMeasurement(code='ABC',languageCode='en')",
					propertyPath: "code"
				}
			}
		}).getText();
		expect(text).toEqual(descriptionToBeChecked); 

	}
	async iShouldSeeOneRowInTheTable() {
		const visible = await browser.asControl({
			selector: {
				controlType: "sap.m.ColumnListItem",
				viewId: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations",
				bindingPath: {
					value: true
				}
			}
		}).getVisible();
		expect(visible).toBeTruthy();

	}


	async iFindTheNewlyCreatedEntry(descriptionToBeChecked) {

		const text = await browser.asControl({
			selector: {
				controlType: "sap.m.Text",
				viewId: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations",
				bindingPath: {
					//path: "/Configurations(tenant='fb305e26-a466-4e73-bca0-81e9ad317cb2',validFrom=datetime'9999-01-23T00%3A00%3A00')",
					propertyPath: "description"
				}
			}
		}).getText();
		expect(text).toEqual(descriptionToBeChecked);


	}

	async iFindTheNewlyCreatedEntry2() {
		const text = await browser.asControl({
			selector: {
				id: "ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--listReport-_tab2-header"
		}}).getText();
		expect(text).toEqual("Identifier Formats (3)");
	}
}



module.exports = new ConfigUiListPage();