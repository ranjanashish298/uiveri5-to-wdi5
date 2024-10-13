const Page = require("./Page");
const idRuleNameField = 'ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--com.sap.vocabularies.UI.v1.FieldGroup::_5::ruleName::Field-input'
const idCreateButton = 'ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--save'
const idRuleNameLabelAfterSave = 'ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--com.sap.vocabularies.UI.v1.FieldGroup::_5::ruleName::Field-text'
 

class RulePage extends Page {

	async iEnterTextFieldArray(field,valueArr) {

			var allCnt = await browser.allControls({
				forceSelect: true,
				selector: {
					controlType: "sap.m.Input",
					labelFor: {
						text: field
					},
					interaction: {
						idSuffix: "inner"
					},
					visible: true,
					interactable: true
				}
			})
		for (var i = 0; i < valueArr.length; i++) {
			await allCnt[i].setValue(valueArr[i]);
		}
		
	}

	async iPressTheSeeMoreButton() {
		await browser.asControl({
			forceSelect: true,
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--PromotionRuleAdvanceSetting::SubSection--seeMore",
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();
	}
	

	
	async iSetCheckBoxArray(field,valueArr) {

			var allCnt = await browser.allControls({
				forceSelect: true,
				selector: {
					controlType: "sap.m.CheckBox",
					labelFor: {
						text: field
					},
					visible: true,
					interactable: true
				}
			})
		for (var i = 0; i < valueArr.length; i++) {
			await allCnt[i].setSelected(valueArr[i]);
		}
		
	}

	async iAssertTheRulePageInitialLoad() {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--PromotionRuleAdvanceSetting::Section",
				interaction: {
					idSuffix: "title"
				}
			}
		}).toBeDisplayed();
	}

	async iFillTheRuleNameField(text) {
		await browser.asControl({ //(A) should I remove field here ?
		forceSelect: true,
			selector: {
				controlType: 'sap.m.Input',
				id: idRuleNameField
			}
		}).enterText(text);
		// field.clear().sendKeys(text) // (A) What to do with clear here ? 
	}

	async iPressTheCreateButtonWithInitialData() {
		await browser.asControl({
		forceSelect: true,
			selector: {
				id: idCreateButton,
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();
	}

	async iShouldSeeTheInitialSavedRuleDetailsPage(text) {
		const ruleLabel = await browser.asControl({
		forceSelect: true,
			selector: {
				controlType: "sap.m.Text",
				id: idRuleNameLabelAfterSave
			}
		});
		expect(await ruleLabel.getText()).toEqual(text);

	}

	async iPressTheEditButton() {
		await browser.asControl({
		forceSelect: true,
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--edit",
				interaction: {
					idSuffix: "content"
				}
			}
		}).press();
	}

	async iAddEligibility(type) {

	    await browser.asControl({
	    forceSelect: true,
            	selector: {
                    id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--objectPage-anchBar-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--EligibilityDesigner::Section-anchor",
                    interaction: {
                            idSuffix: "BDI-content"
                    }
            }}).press();

		await browser.asControl({
		forceSelect: true,
			selector: {
				controlType: "sap.m.Button",
				viewName: "ppservice-manage-promo-ui.ext.view.EligibilityDesigner",
				properties: {
					text: "Add Eligibility"
				},
				interaction: {
					idSuffix: "content"
				}
			}
		}).press()

		await browser.asControl({
			forceSelect: true,
			selector: {
				controlType: "sap.ui.unified.MenuItem",
				viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage",
				properties: {
					text: type
				},
				searchOpenDialogs: true
			}
		}).press()
	}

	async iAddRewards(RewardParentMenu, RewardChildMenu) {
		await browser.asControl({
		forceSelect: true,
			selector: {
				controlType: "sap.m.Button",
				viewName: "ppservice-manage-promo-ui.ext.view.EligibilityDesigner",
				properties: {
					text: "Add Reward"
				},
				interaction: {
					idSuffix: "content"
				}
			}
		}).press()

		await browser.asControl({
		forceSelect: true,
			selector: {
				controlType: "sap.ui.unified.MenuItem",
				viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage",
				properties: {
					text: RewardParentMenu,
					visible: true
				},
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "txt" // Intereaction column added 
				}
			}
		}).press();

		await browser.asControl({
			forceSelect: true,
			selector: {
				controlType: "sap.ui.unified.MenuItem",
				viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage",
				properties: {
					text: RewardChildMenu
				},
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "txt" // Intereaction column added 
				}
			}
		}).press();
	}

	async iValidateEligibilityIsDisabled() {
        await browser.asControl({
        	selector: {
        		controlType: "sap.m.Button",
        		viewName: "ppservice-manage-promo-ui.ext.view.EligibilityDesigner",
        		properties: {
        			text: "Add Eligibility"
        		},
        		interaction: {
        			idSuffix: "content"
        		}
        	}
        }).press()

        const enabled = await browser.asControl({
        forceSelect: true,
             selector: {
                 controlType: "sap.ui.unified.MenuItem",
                 viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage",
                 properties: {
                       text: "Additional Price Type"
                 },
                 searchOpenDialogs: true
             }}).getEnabled();
        expect(enabled).toBeFalsy();
                }

	async iValidateRewardIsDisabled() {
        await browser.asControl({
        	selector: {
        		 controlType: "sap.m.Button",
        		 viewName: "ppservice-manage-promo-ui.ext.view.EligibilityDesigner",
        		 properties: {
        				text: "Add Reward"
        		 },
        		 interaction: {
        				idSuffix: "content"
        		 }
        			}
        }).press();

        const enabled = await browser.asControl({
        	forceSelect: true,
        	selector: {
        		 controlType: "sap.ui.unified.MenuItem",
        		 viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage",
        		 properties: {
        				text: "Additional Price Type",
        					visible: true
        		 },
        		 searchOpenDialogs: true,
        		 interaction: {
        				idSuffix: "txt" // Intereaction column added
        		 }
        	}
        }).getEnabled();
        expect(enabled).toBeFalsy();
    }

	async iSelectMerchandiseSet() {
		await browser.asControl({
			forceSelect: true,
			selector: {
				controlType: "sap.m.Input",
				viewName: "ppservice-manage-promo-ui.ext.view.EligibilityDesigner",
				labelFor: {
					text: "Merchandise Set ID"
				},
				interaction: "press"
			}
		}).press();

	    await browser.asControl({
	    forceSelect: true,
	    	selector: {
	            controlType: "sap.m.Text",
	            viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage",
	            bindingPath: {
	                    path: "/0",
	                    propertyPath: "merchandiseSetName"
	            },
	            searchOpenDialogs: true
	    }}).press();

	}
	
	async iSelectTxnGA(text) {

        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--attributeName-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--eligibilityGridList-0-vhi"
            }
        }).press();

        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--txnGenericAttributes-searchField",
                searchOpenDialogs: true,
                interaction: "focus"
            }
        }).enterText(text);

        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--txnGenericAttributes-searchField",
                searchOpenDialogs: true,
                interaction: "press"
            }
        }).press();

        await browser.asControl({
            selector: {
                controlType: "sap.m.ColumnListItem",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage",
                properties: {
                    type: "Inactive"
                },
                searchOpenDialogs: true
            }
        }).press();
    }
    
    async iSelectDiscountMethodArray(type) {
		await browser.asControl({
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--rbDiscountMethodCode",
				interaction: {
					idSuffix: "arrow"
				}
			}
		}).press()
		
		await browser.asControl({
			selector: {
				controlType: "sap.ui.core.ListItem",
				viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage",
				properties: {
					text: type
				},
				searchOpenDialogs: true
			}
		}).press();
		}

	async iSelectThresholdTypeArray(type) {
	    await browser.asControl({
	    forceSelect: true,
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--thresholdTypeSelect-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--eligibilityGridList-0",
				interaction: {
					idSuffix: "arrow"
				}
			}
		}).press()

		await browser.asControl({
		forceSelect: true,
			selector: {
				controlType: "sap.ui.core.ListItem",
				viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage",
				properties: {
					text: type
				},
				searchOpenDialogs: true
			}
		}).press();
	}
	
	async iSelectDecimalPlaces(number) {
		await browser.asControl({
			forceSelect: true,
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--com.sap.vocabularies.UI.v1.FieldGroup::_4::priceDerivationRule::decimalPlaces::Field-comboBoxEdit-arrow"
			}
		}).press();

		await browser.asControl({
			forceSelect: true,
			selector: {
				controlType: "sap.m.StandardListItem",
				viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules",
				properties: {
					title: number
				},
				searchOpenDialogs: true,
				interaction: {
					idSuffix: "content"
				}
			}
		}).press();
	}
	
	async iSelectPMA() {
		await browser.asControl({
		forceSelect: true,
			selector: {
				id: "priceModificationMethodCodeSingleReward",
				viewName: "ppservice-manage-promo-ui.ext.view.EligibilityDesigner",
				interaction: {
					idSuffix: "arrow"
				}
			}
		}).press();

		await browser.asControl({
		forceSelect: true,
			selector: {
				controlType: "sap.ui.core.ListItem",
				viewName: "ppservice-manage-promo-ui.ext.view.EligibilityDesigner",
				i18NText: {
					propertyName: "text",
					key: "PercentRebate"
				},
				searchOpenDialogs: true
			}
		}).press();
	}
	
   async iEnterTextInTheTimeRange (id, text) {
    await browser.asControl({
    	selector: {
            id: id,
            interaction: {
                    idSuffix: "inner"
            }
    }}).enterText(text);
  }

  async iClickRecurrenceTab() {
      await browser.asControl({
      	selector: {
              id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--objectPage-anchBar-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--TimeRestrictionsDesigner::Section-anchor",
              interaction: {
                      idSuffix: "BDI-content"
              }
      }}).press();
  }
  
  async iPressTheCheckboxControl (id) {
    await browser.asControl({
    	selector: {
            id: id,
            interaction: {
                    idSuffix: "CbBg"
            }
    }}).press();
}

	async iPressTheSaveRuleButton() {
		await browser.asControl({
		forceSelect: true,
			selector: {
				id: idCreateButton,
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();
	}

	async iPressTheBackButton() {
	    await browser.asControl({
	        forceSelect: true,
			selector: {
				id: "backBtn"
			}
		}).press();
	}

	async iPressTheWarningOkControl() {
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
		}).press();
	}

	async iPressVerify() {
		await browser.asControl({
		forceSelect: true,
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--action::VerifyPromoRuleButton",
				interaction: {
					idSuffix: "BDI-content"
				}
			}
		}).press();
	}

	async iSelectPriceModificationArray(stringArr) {
		var ele1 = await browser.allControls({
			forceSelect: true,
			selector: {
				controlType: "sap.m.Select",
				labelFor: {
					text: "Price Modification"
				},
				interaction: {
					idSuffix: "arrow"
				}
			}
		});

		for (var i = 0; i < stringArr.length; i++) {
			ele1[i].press();
			await browser.asControl({
				forceSelect: true,
				selector: {
					controlType: "sap.ui.core.ListItem",
		            viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage",
		            i18NText: {
		                    propertyName: "text",
		                    key: stringArr[i] //eg. "PercentRebate"
		            },
		            searchOpenDialogs: true
				}
			}).press();

		}
	}
	
	// Below function can be used when there is only one Price Modification Array in the page. Need to replace with array version.
	async iSelectPriceModification(selection) {
	    await browser.asControl({
	    	selector: {
	            id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--priceModificationMethodCodeSingleReward",
	            interaction: {
	                    idSuffix: "arrow"
	            }
	    }}).press();
	    
	    await browser.asControl({
    	selector: {
            controlType: "sap.ui.core.ListItem",
            viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage",
            i18NText: {
                    propertyName: "text",
                    key: selection
            },
            searchOpenDialogs: true
    	}}).press();
	}
	
	async iSelectPriceModificationUsingLabel(label, selection) {
	    await browser.asControl({
	    	selector: {
				viewName: "ppservice-manage-promo-ui.ext.view.EligibilityDesigner",
				labelFor: {
					text: label
				},
	            interaction: {
	                    idSuffix: "arrow"
	            }
	    }}).press();
	    
	    await browser.asControl({
    	selector: {
            controlType: "sap.ui.core.ListItem",
            viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage",
            i18NText: {
                    propertyName: "text",
                    key: selection
            },
            searchOpenDialogs: true
    	}}).press();
	}
	
  	async iEnterTxnGaValueForLogicalExpression1(text) {
       await browser.asControl({
    	selector: {
            id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--attributeExpression-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--eligibilityGridList-0",
            interaction: {
                    idSuffix: "inner"
            }
    }}).setValue(text);
   } 
 
	
	async iSelectFromDropDown(label, selection) {
	    await browser.asControl({
	    	selector: {
				viewName: "ppservice-manage-promo-ui.ext.view.EligibilityDesigner",
				labelFor: {
					text: label
				},
	            interaction: {
	                    idSuffix: "arrow"
	            }
	    }}).press();
	    
	    await browser.asControl({
    	selector: {
            controlType: "sap.ui.core.ListItem",
            viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage",
            i18NText: {
                    propertyName: "text",
                    key: selection
            },
            searchOpenDialogs: true
    	}}).press();
	}
	

	async iSelectSubsequentDiscountPriceModificationArray(stringArr) {
		var ele1 = await browser.allControls({
			forceSelect: true,
			selector: {
				controlType: "sap.m.Select",
				labelFor: {
					text: "Price Modification for Subsequent Discount"
				},
				interaction: {
					idSuffix: "arrow"
				}
			}
		});

		for (var i = 0; i < stringArr.length; i++) {
			ele1[i].press();
			await browser.asControl({
				forceSelect: true,
				selector: {
					controlType: "sap.ui.core.ListItem",
					viewName: "ppservice-manage-promo-ui.ext.view.EligibilityDesigner",
					i18NText: {
                    propertyName: "text",
                    key: stringArr[i] //eg. "PercentRebate"
            		},
					searchOpenDialogs: true
				}
			}).press();

		}
	}
	
	
	async iSelectSubsequentDiscountPriceModification(selection) {
	    await browser.asControl({
	    	selector: {
	            id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--subSeqpriceModMethodCodeSingleReward",
	            interaction: {
	                    idSuffix: "arrow"
	            }
	    }}).press();
	    
	    await browser.asControl({
			forceSelect: true,
	    	selector: {
	            controlType: "sap.ui.core.ListItem",
	            viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage",
	            i18NText: {
	                    propertyName: "text",
	                    key: selection
	            },
	            searchOpenDialogs: true
	    }}).press();
	}

	async iSelectRuleControlCode(selection) {
	    await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage--priceRuleControlCode",
                interaction: {
                        idSuffix: "arrow"
                }
        }}).press();

        await browser.asControl({
            selector: {
                controlType: "sap.ui.core.ListItem",
                viewName: "ppservice-manage-promo-ui.ext.view.EligibilityDesigner",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--RuleBuilderPage",
                i18NText: {
                        propertyName: "text",
                        key: selection
            },
            searchOpenDialogs: true
        }}).press();

	}

	async iShouldSeeTheInitialRuleDetailsPage() {
		const visible = await browser.asControl({
		forceSelect: true,
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--PromotionRuleAdvanceSetting::Section"
			}
		}).getVisible();
		expect(visible).toBeTruthy();
	}


	async iShouldSeeTheFinalSavedRuleDetailsPage(textRecieved) {
	    	const text = await browser.asControl({
	    	forceSelect: true,
			selector: {
				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--com.sap.vocabularies.UI.v1.FieldGroup::_5::ruleName::Field-text"
			}
		}).getText();
		expect(text).toEqual(textRecieved);
	}

	async iPressAdvancedRuleSettingsFacet(){
	await browser.asControl({
    			selector: {
    				id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--objectPage-anchBar-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--PromotionRuleAdvanceSetting::Section-anchor",
    				interaction: {
    					idSuffix: "BDI-content"
    				}
    			}
    		}).press();
    }


	async iValidateSequence()  {
        const text = await browser.asControl({
        forceSelect: true,
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--com.sap.vocabularies.UI.v1.FieldGroup::_2::sequence::Field-text"
        }}).getText();
        expect(text).toEqual("10");
    }//Validate Sequence value

    async iValidateResolution()  {
        const text = await browser.asControl({
        forceSelect: true,
        	selector: {
        	    id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--com.sap.vocabularies.UI.v1.FieldGroup::_2::resolution::Field-text"
        }}).getText();
        expect(text).toEqual("5");
    }//Validate Resolution Value

    async iEnterSequenceValue ()  {
        await browser.asControl({
            selector: {
        	    id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--com.sap.vocabularies.UI.v1.FieldGroup::_2::sequence::Field-input",
                interaction: {
                        idSuffix: "inner"
                }
        }}).enterText("101");
    }//input sequence value

    async iEnterResolutionValue () {
        await browser.asControl({
        selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--com.sap.vocabularies.UI.v1.FieldGroup::_2::resolution::Field-input",
                interaction: {
                        idSuffix: "inner"
                }
        }}).enterText("501");//Input Resolution Value
    }

    async iPressTheSaveButton()  {
        await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--save",
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();
    }

    async iPressGetButtonInRulePage()  {
        await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--action::GetSequenceResolutionButton",
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();
    }

    async iPressShowMoreButton() {
        await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--PromotionRuleAdvanceSetting::SubSection--seeMore",
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();
    }

    async iAddCalculationBaseType() {
        await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--com.sap.vocabularies.UI.v1.FieldGroup::_4::priceDerivationRule::calculationBase::Field-comboBoxEdit-arrow"
        }}).press(); //Open drop down

        await browser.asControl({
            selector: {
                controlType: "sap.m.StandardListItem",
                viewName: "sap.suite.ui.generic.template.ObjectPage.view.Details",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules",
                properties: {
                     title: "Sales Minus Returns"
                },
                searchOpenDialogs: true,
                interaction: {
                     idSuffix: "titleText"
                }
        }}).press();//Select calculation Base type
    }

    async iCheckCalculationBaseType(CalcBaseType) {
        const text = await browser.asControl({
        forceSelect: true,
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::PromotionPriceDerivationRules--com.sap.vocabularies.UI.v1.FieldGroup::_4::priceDerivationRule::calculationBase::Field-text"
        }}).getText();
        expect(text).toEqual(CalcBaseType);
    } //Validate Calculation Base Type


}


module.exports = new RulePage();