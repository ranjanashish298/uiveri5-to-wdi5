const Page = require("./Page");

const idTitleText = 'ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--template::ObjectPage::ObjectPageDynamicHeaderTitle'
const idPromoNameField = 'ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--GeneralInformation::promotionName::Field-input'
const idPromoDescriptionField = 'ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--GeneralInformation::promoDescription::Field-textArea'
const idStartDateField = 'ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--GeneralInformation::startDate::Field-datePicker'
const idEndDateField = 'ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--GeneralInformation::endDate::Field-datePicker'
const idCreateButton = 'ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--save'
const idPromoEditButton = 'ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--edit'
const idPromoRulesCreateButton = 'ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--PromotionalRulesFacet::addEntry'
// const wait = require('../common/baseWait')
const {
	default: _ui5Service
} = require("wdio-ui5-service")
const ui5Service = new _ui5Service()

class PromotionDetailsPage extends Page {



	async iFillThePromoNameField(text) {
		await browser.asControl({
			selector: {
				controlType: 'sap.m.Input',
				id: idPromoNameField,
				interaction: {
					idSuffix: "inner"
				}
			}
		}).enterText(text)
	}

	async iFillThePromoDescriptionField(text) {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--GeneralInformation::promoDescription::Field-textArea",
				interaction: {
					idSuffix: "inner"
				}
			}
		}).enterText(text);
	}

	async iFillTheStartDateField(text) {
		await browser.asControl({
			selector: {
				controlType: 'sap.m.DatePicker',
				id: idStartDateField
			}
		}).enterText(text)
	}

	async iFillTheEndDateField(text) {
		await browser.asControl({
			selector: {
				controlType: 'sap.m.DatePicker',
				id: idEndDateField
			}
		}).enterText(text)
	}

	async masterdataSS(test) {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--GeneralInformation::logicalSystem::Field-input",
				interaction: {
					idSuffix: "inner"
				}
			}
		}).enterText(test);
	}

	async iClickCreateButton() {
		await browser.asControl({
			selector: {
				controlType: 'sap.m.Button',
				id: idCreateButton
			}
		}).press()
	}

	async iClickEditButton() {
		await browser.asControl({
			selector: {
				controlType: 'sap.m.Button',
				id: idPromoEditButton
			}
		}).press()
	}

	async iClickPromoRulesCreateButton() {
		await browser.asControl({
		forceSelect: true,
			selector: {
				controlType: 'sap.m.Button',
				id: idPromoRulesCreateButton
			}
		}).press();
	}


	//From here normal mp


	async iClickMerchandiseSetsCreateButton() {
		 await browser.asControl({
		        forceSelect: true,
            	selector: {
                    id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--createMsetMenuButton-internalBtn",
                    interaction: {
                            idSuffix: "BDI-content"
                    }
                }
         }).press(); //Click create button

         await browser.asControl({
         	    selector: {
                     id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--createNewMsetButton-unifiedmenu",
                     searchOpenDialogs: true,
                     interaction: {
                             idSuffix: "txt"
                     }
                }
         }).press(); //Click create-New button
	}

	async iClickMerchandiseSetsCreateRefButton() {
    		 await browser.asControl({
    		        forceSelect: true,
                	selector: {
                        id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--createMsetMenuButton-internalBtn",
                        interaction: {
                                idSuffix: "BDI-content"
                        }
                    }
             }).press(); //Click create button

             await browser.asControl({
                 	selector: {
                         id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--createWithReferenceMsetButton-unifiedmenu",
                         searchOpenDialogs: true,
                         interaction: {
                                 idSuffix: "txt"
                         }
                    }
             }).press(); //Click create with ref button

    	}



	async iClickBusinessUnitsCreateButton() {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--CreateBusinessUnit",
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();
	}

	async iEnterBusinessUnits(text) {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--businessUnitID",
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "inner"
				}
			}
		}).enterText(text);
	}

	// async iClickVHForBusinessUnitId() {
	//     await browser.asControl({
	//         selector: {
	//             id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--businessUnitID-vhi",
	//             searchOpenDialogs: true
	//         }
	//     }).press();
	// }

	async iSearchCustomer(text) {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--businessUnitID-vhi",
				searchOpenDialogs: true
			}
		}).press(); // Create press is correct 

		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--CustomerVHDialog-searchField",
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "I"
				}
			}
		}).enterText(text); // 1 was typed !


		await browser.asControl({
			selector: {
				controlType: "sap.m.ColumnListItem",
				viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions",
				properties: {
					type: "Inactive"
				},
				searchOpenDialogs: true,
				descendant: {
					controlType: "sap.m.ObjectIdentifier",
					viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions",
					bindingPath: {
						path: "/results/0",
						propertyPath: "customerId",
						modelName: "CustomersModel"
					},
					searchOpenDialogs: true
				}
			}
		}).press();


		// await browser.asControl({
		//     selector: {
		//         id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--includedProducts-ok",
		//         searchOpenDialogs: true,
		//         interaction: {
		//             idSuffix: "BDI-content"
		//         }
		//     }
		// }).press();
	}



	async iAddBusinessUnitsType() {
		await browser.asControl({
			selector: {
				controlType: "sap.m.Button",
				viewName: "sap.suite.ui.generic.template.ObjectPage.view.Details",
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

	async iSearchVendor(text) {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--VendorVHDialog-searchField",
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "I"
				}
			}
		}).enterText(text);

		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--VendorVHDialog-searchField",
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "search"
				}
			}
		}).press();
	}

	async iSelectTheVendor() {
		await browser.asControl({
			selector: {
				controlType: "sap.m.ObjectIdentifier",
				viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions",
				bindingPath: {
					path: "/results/0",
					propertyPath: "vendorId",
					modelName: "VendorsModel"
				},
				searchOpenDialogs: true
			}
		}).press();
	}

	async iSelectBusinessUnitsType() {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--businessType",
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "arrow"
				}
			}
		}).press();

		await browser.asControl({
			selector: {
				controlType: "sap.ui.core.ListItem",
				viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions",
				i18NText: {
					propertyName: "text",
					key: "Customer"
				},
				searchOpenDialogs: true
			}
		}).press();
	}




	async iPressOKButton() {
		await browser.asControl({
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
		}).press();

	}

	async iCreatePromotionText() {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--objectPage-vertSB",
				interaction: {
					idSuffix: "sb"
				}
			}
		}).press();

		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--AddPromotionTexts",
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();
	}

	async iSelectLanguage() {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--Spras-arrow",
				searchOpenDialogs: true
			}
		}).press();

		await browser.asControl({
			selector: {
				controlType: "sap.m.StandardListItem",
				viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions",
				properties: {
					title: "German"
				},
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "content"
				}
			}
		}).press();
	}

	async iEnterText(parentid, text) {
		await browser.asControl({
			selector: {
				id: parentid,
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "inner"
				}
			}
		}).enterText(text);
	}

	async iAddPromotionText() {
		await browser.asControl({
			selector: {
				controlType: "sap.m.Button",
				viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions",
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

	// No idea what's happening beneath

	async iPressTheVerifyButton() {
		await browser.asControl({
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
		}).press(); //then(wait.short); //REomove after press()

		// (wth is this ) browser.loadUI5Dependencies();
	}

	async iPressTheActivateButton() {

	    await browser.pause(10000)
        await ui5Service.injectUI5()
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--action::ActivatePromotionButton",
				interaction: {
					idSuffix: "content"
				}
			}
		}).press()

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
        }}).press();
	}

	async iPressTheActivateButton_NoExtesnion() {
    		await browser.asControl({
    			selector: {
    				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--action::ActivatePromotionButton",
    				interaction: {
    					idSuffix: "content"
    				}
    			}
    		}).press()
    		}

   	async iPressTheValidateButton() {
        await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--action::ValidatePromotionButton",
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();
    }

    async iAssertValidateAction () {
        const msg1 = await browser.asControl({
        	selector: {
                controlType: "sap.m.MessageListItem",
                properties: {
                        title: "Promotion validated"
                },
                searchOpenDialogs: true
        }}).getTitle();
        expect(msg1).toEqual("Promotion validated");

         const msg2 = await browser.asControl({
            selector: {
                controlType: "sap.m.MessageListItem",
                properties: {
                        title: "Warning message is coming back from Kyma"
                },
                searchOpenDialogs: true
         }}).getTitle();
         expect(msg2).toEqual("Warning message is coming back from Kyma");

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
         }}).press();
    }
	//Assertions

	async iShouldSeeTheInitialPromotionDetailsPage() {
		const visible = await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--template::ObjectPage::ObjectPageDynamicHeaderTitle"
			}
		}).getVisible();
		expect(visible).toBeTruthy();
	}

	async iShouldSeeTheBasicPromotionPage(text) {
		const promoTableTitle = await browser.asControl({
			selector: {
				controlType: "sap.m.Title",
				id: idTitleText
			}
		});
		expect(await promoTableTitle.getText()).toEqual(text);
	}

	async iShouldSeePromotionState(activationtext) {
		const text = await browser.asControl({
			selector: {
				controlType: "sap.m.Text",
				viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions",
				bindingPath: {
					path: "",
					propertyPath: "/objectPage/headerInfo/objectSubtitle",
					modelName: "_templPriv"
				}
			}
		}).getText();
		expect(text).toEqual(activationtext);
	}

	async iShouldSeeCorrectTitle(title) {
		const text = await browser.asControl({
			forceSelect: true,
			selector: {
				controlType: "sap.m.Text",
				viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions",
				bindingPath: {
					path: "",
					propertyPath: "/objectPage/headerInfo/objectSubtitle",
					modelName: "_templPriv"
				}
			}
		}).getText();
		expect(text).toEqual(title);

	}

	async iAssertTheActiveState(state) {
		await browser.pause(10000)

		await ui5Service.injectUI5()

		const text = await browser.asControl({
			forceSelect: true,
			selector: {
				controlType: "sap.m.Text",
				viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions",
				bindingPath: {
					path: "",
					propertyPath: "/objectPage/headerInfo/objectSubtitle",
					modelName: "_templPriv"
				}
			}
		}).getText();
		expect(text).toEqual(state);
	}


    async iGetButtonDisabled() {
        const enabled = await browser.asControl({
            selector: {
                controlType: "sap.m.Button",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions",
                i18NText: {
                        propertyName: "text",
                        key: "GetSeqResolution"
                }
        }}).getEnabled();
        expect(enabled).toBeFalsy();
    } //Verify Get Button is disabled in display mode

    async iClickGetButton() {
        await browser.asControl({
            selector: {
                controlType: "sap.m.Button",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions",
                i18NText: {
                        propertyName: "text",
                        key: "GetSeqResolution"
                },
                interaction: {
                        idSuffix: "content"
                }
        }}).press();
    } //Click Get Button

    async iSavePromotion()  {
        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--save",
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();
    } //Save Promotion

    async iNavigateToPromoRulePage() {
     await browser.asControl({
            selector: {
                controlType: "sap.ui.core.Icon",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions",
                properties: {
                        src: {
                                regex: {
                                        source: "slim\\-arrow\\-right"
                                }
                        }
                }
        }}).press();
    }//Navigate to promo Rule page

    async iNavigatetoMsetPage()  {
        await browser.asControl({
        forceSelect: true,
        	selector: {
                controlType: "sap.ui.core.Icon",
                viewName: "sap.suite.ui.generic.template.ObjectPage.view.Details",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions",
                properties: {
                        src: {
                                regex: {
                                        source: "slim\\-arrow\\-right"
                                }
                        }
                }
        }}).press();
    }

    async iSelectAllBU()  {
     await browser.asControl({
    	    selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--BusinessUnitsFacet::responsiveTable-sa",
                interaction: {
                    idSuffix: "CbBg"
                }
      }}).press();
    }//Select all BUs

    async iClickDeleteBU()  {
        await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--BusinessUnitsFacet::deleteEntry",
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();
    }//Click Delete button in Business Unit facet

    async iVerify2RowsSelected ()  {
        const text = await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--deleteConfirmationDialog-title",
                searchOpenDialogs: true
        }}).getText();
        expect(text).toEqual("Delete (2)");
    }//Verify 2 rows are selected to delete

    async iPressDeleteButton()  {
        await browser.asControl({
        	selector: {
                controlType: "sap.m.Button",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions",
                i18NText: {
                        propertyName: "text",
                        key: "DELETE"
                },
                searchOpenDialogs: true,
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();
    }//Delete selected BUs.

    async iGetPromoID()  {
        var promoID = await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::Promotions--GeneralInformation::promotionID::Field-text"
        }}).getText();
        promoID = promoID.replace( /,/g, "" );
        return promoID;
    }

    async reloadPage()  {
        await browser.asControl({
        	selector: {
                controlType: "sap.m.Button",
                properties: {
                        text: "Reload"
                },
                searchOpenDialogs: true,
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();
    }

}



module.exports = new PromotionDetailsPage();