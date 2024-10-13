const {
	default: _ui5Service
} = require("wdio-ui5-service")
const ui5Service = new _ui5Service()
const Page = require("./Page");
const idCreateButton = 'ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--addEntry'
const launchpadPage = require('../pages/theLaunchpadPage');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class PromotionListPage extends Page {

	/**
	 * define actions for the page object
	 */
	async iPressTheGoButton() {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--listReportFilter-btnGo",
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


	async iEnterPromoNameInSearch(text) {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--listReportFilter-filterItemControl_BASIC-promotionName",
				interaction: {
					idSuffix: "inner"
				}
			}

		}).enterText("*" + text + "*");
	}

	async iEnterStatusInStatusSearch() {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--listReportFilter-filterItemControl_BASIC-statusCode-arrow"
			}
		}).press();

		await browser.asControl({
			selector: {
				controlType: "sap.m.CheckBox",
				viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions",
				properties: {
					editable: true
				},
				searchOpenDialogs: true,
				ancestor: {
					controlType: "sap.m.StandardListItem",
					viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions",
					properties: {
						title: "Active"
					},
					searchOpenDialogs: true
				},
				interaction: {
					idSuffix: "CbBg"
				}
			}
		}).press();
	}


	async iSelectAllResults() {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--responsiveTable-sa",
				interaction: {
					idSuffix: "CbBg"
				}
			}
		}).press();


	}



	async iPressTheCancelButton() {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--CancelPromotionButton",
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();

		browser.asControl({
			selector: {
				controlType: "sap.m.Button",
				viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
				i18NText: {
					propertyName: "text",
					key: "Yes"
				},
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "inner"
				}
			}
		}).press();
	}


	async iPressTheAdaptFiltersButton() {
		browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--listReportFilter-btnFilters",
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();
	}



	async iPressTheShowListControl() {
		browser.asControl({
			selector: {
				controlType: "sap.ui.core.Icon",
				viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
				properties: {
					src: {
						regex: {
							source: "list"
						}
					}
				},
				searchOpenDialogs: true
			}
		}).press();
	}


	async iPressTheStatusCode() {
		browser.asControl({
			selector: {
				controlType: "sap.m.Label",
				viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
				bindingPath: {
					path: "/items/7",
					propertyPath: "tooltip",
				},
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "bdi"
				}
			}
		}).press();
	}


	async iPressTheOkButton() {
		browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--listReportFilter-adapt-filters-dialog-confirmBtn",
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();
	}



	async iEnterTextInStatusCode(text) {
		browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--listReportFilter-filterItemControlA_-statusCode",
				interaction: {
					idSuffix: "inner"
				}
			}
		}).enterText(text);
	}

	async iDeActivatePromotions(text) {
		var label = await browser.asControl(({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--listReport-header",
				interaction: {
					idSuffix: "inner"
				}
			}
		})).getText();
		var count = label.split('(').pop().split(')')[0];

		for (var i = 0; i < count; i++) {
			var allCnt =  await browser.allControls({
				forceSelect: true,
				logging: false, 
				selector: {
					controlType: "sap.m.ColumnListItem",
					viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions",
			}})

			await allCnt[0].press();

			await browser.asControl({
				selector: {
					id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--action::DeactivatePromotionButton",
					interaction: {
						idSuffix: "BDI-content"
					}
				}
			}).press();

			await browser.pause(10000)

			await ui5Service.injectUI5()

			await browser.asControl({
				selector: {
					id: "shellAppTitle",
					interaction: {
							idSuffix: "button"
					}
			}}).press();

			await browser.asControl({
				forceSelect: true,
				selector: {
					controlType: "sap.m.StandardListItem",
					properties: {
							title: "Maintain Promotions"
					},
					searchOpenDialogs: true,
					interaction: {
							idSuffix: "titleText"
					}
			}}).press();

			await browser.asControl({
				selector: {
					id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--listReportFilter-filterItemControl_BASIC-promotionName",
					interaction: {
						idSuffix: "inner"
					}
				}

			}).enterText("*" + text + "*");

			await browser.asControl({
				selector: {
					id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--listReportFilter-filterItemControl_BASIC-statusCode-arrow"
				}
			}).press();
						
			await browser.asControl({
		    	selector: {
		            id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--listReportFilter-filterItemControl_BASIC-statusCode",
		            interaction: {
		                    idSuffix: "inner"
		            }
		    }}).enterText("Active");
		    
		    //await ui5Service.injectUI5()
		    
		    await browser.asControl({
		    	selector: {
		            controlType: "sap.m.StandardListItem",
		            viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions",
		            properties: {
		                    type: "Active"
		            },
		            searchOpenDialogs: true,
		            interaction: {
		                    idSuffix: "content"
		            }
		    }}).press();

			await browser.asControl({
				selector: {
					id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--listReportFilter-btnGo",
					interaction: {
						idSuffix: "BDI-content"
					}
				}
			}).press();

		}

	}




	/**
	 * define assertions for the page object
	 */


	async iShouldSeeTheTable() {
		//browser.loadUI5Dependencies();
		const promoTable = await browser.asControl({
			selector: {
				controlType: "sap.ui.comp.smarttable.SmartTable",
				properties: {
					entitySet: 'Promotions'
				}
			}
		});
		expect(promoTable.isPresent()).toBeTruthy();  // how to change isPresent() ?
	}             // Also add await promotable above ?





	async iShouldSeeEmptyTable() {
		const ele1 = await browser.allControls({
			logging: false, 
			selector: {
				controlType: "sap.ui.core.Icon",
				viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
				properties: {
					src: {
						regex: {
							source: "slim\\-arrow\\-right"
						}
					}
				},
				ancestor: {
					controlType: "sap.m.ColumnListItem",
					viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
					ancestor: {
						id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--responsiveTable"
					}
				}
			}
		});
		expect(ele1.length).toEqual(0); //Hopefully correct ! 

	}

	async iNavigateToPromoDetails()  {
        await browser.asControl({
        forceSelect: true,
        	selector: {
                controlType: "sap.ui.core.Icon",
                viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions",
                properties: {
                        src: {
                                regex: {
                                        source: "slim\\-arrow\\-right"
                                }
                        }
                }
        }}).press();
    }

    async iSelectStandardVariant(){
         await browser.asControl({
            	selector: {
                    id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--template::PageVariant-vm-trigger-img"
            }}).press();

          await browser.asControl({
             	selector: {
                     controlType: "sap.ui.core.Item",
                     viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
                     viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions",
                     bindingPath: {
                             path: "/items/0",
                             propertyPath: "key",
                             modelName: "$mVariants"
                     },
                     searchOpenDialogs: true
             }}).press();
    }

    async iEnterPromoID(promoID)  {
        await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Promotions--listReportFilter-filterItemControl_BASIC-promotionID",
                interaction: {
                        idSuffix: "inner"
                }
        }}).enterText(promoID);
    }

}

module.exports = new PromotionListPage();