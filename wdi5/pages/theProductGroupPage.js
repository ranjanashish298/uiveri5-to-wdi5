const Page = require("./Page");

class ProductGroup extends Page {


    async iPressTheAddIncludedProductButton(text) {

        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--AddIncludedProduct",
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press(); // Add is also working 

        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--includedItemID-vhi",
                searchOpenDialogs: true
            }
        }).press(); // square search to open box is also working

        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--includedProducts-searchField",
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "I"
                }
            }
        }).enterText(text); // Pant was typed !





        // await browser.asControl({
        //     selector: {
        //         id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--includedProducts-searchField",
        //         searchOpenDialogs: true,
        //         interaction: {
        //             idSuffix: "search"
        //         }
        //     }
        // }).press();


        await browser.asControl({
            forceSelect:true,
            selector: {
                controlType: "sap.m.Text",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                properties: {
                    text: text
                },
                searchOpenDialogs: true,
                ancestor: {
                    controlType: "sap.m.ObjectIdentifier",
                    viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                    bindingPath: {
                        path: "/Products('"+text+"')",
                        propertyPath: "product"
                    },
                    searchOpenDialogs: true
                }
            }
        }).press();


        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--includedProducts-ok",
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press(); //included a product somehow xD

    }

    async iPressTheAddIncludedProductButtonByDesc(ID,text) {

        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--AddIncludedProduct",
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press(); // Add is also working 

        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--includedItemID-vhi",
                searchOpenDialogs: true
            }
        }).press(); // square search to open box is also working

        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--includedProducts-searchField",
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "I"
                }
            }
        }).enterText(text); // Pant was typed !

        const desc = await browser.asControl({
            selector: {
                controlType: "sap.m.Text",
                viewName: "sap.suite.ui.generic.template.ObjectPage.view.Details",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                bindingPath: {
                        path: "/Products('"+ID+"')",
                        propertyPath: "description"
                },
                searchOpenDialogs: true
        }}).getText();
        expect(desc).toEqual(text); //Check if search displays correct data

        await browser.asControl({
            forceSelect:true,
        	selector: {
                controlType: "sap.m.Text",
                viewName: "sap.suite.ui.generic.template.ObjectPage.view.Details",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                bindingPath: {
                        path: "/Products('"+ID+"')",
                        propertyPath: "description"
                },
                searchOpenDialogs: true
        }}).press(); //Select the row

        await browser.pause(1000);
        
        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--includedProducts-ok",
                searchOpenDialogs: true,
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();//included a product somehow xD

        await browser.pause(1000);

    }


    async iAddMultipleProductsInMerchandiseSet(text){
        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--AddIncludedProduct",
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press();
        
        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--includedItemID",
                searchOpenDialogs: true,
                interaction: {
                        idSuffix: "inner"
                }
        }}).enterText(text);
        await browser.asControl({
            forceSelect : true,
            selector: {
                controlType: "sap.m.Button",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                i18NText: {
                        propertyName: "text",
                        key: "Add"
                },
                searchOpenDialogs: true,
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();
    }



    async iPressAddGA() {
        await browser.asControl({
            selector: {
                controlType: "sap.m.Button",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                i18NText: {
                    propertyName: "text",
                    key: "AddButton"
                },
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "inner"
                }
            }
        }).press();
    }

    async iPressSaveButton() {
        await browser.asControl({
            selector: {
                controlType: "sap.m.Button",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                i18NText: {
                    propertyName: "text",
                    key: "SaveButton"
                },
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press();
    }


    async iSelectGenericAttributes() {
        await browser.asControl({
            selector: {
                controlType: "sap.ui.core.Icon",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                properties: {
                    src: {
                        regex: {
                            source: "value\\-help"
                        }
                    }
                },
                searchOpenDialogs: true
            }
        }).press();

        await browser.asControl({
            selector: {

                controlType: "sap.m.Text",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                properties: {
                    text: "BOOLEAN"
                },
                searchOpenDialogs: true
            }
        }).press();

        await browser.asControl({
            selector: {
                controlType: "sap.m.Select",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                properties: {
                    type: "Default"
                },
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "arrow"
                }
            }
        }).press();

        await browser.asControl({
            selector: {
                controlType: "sap.ui.core.Item",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                i18NText: {
                    propertyName: "text",
                    key: "false"
                },
                searchOpenDialogs: true
            }
        }).press();
    }

    async iPressTheBackButton() {
        await browser.asControl({
            selector: {
                id: "backBtn"
            }
        }).press();
    }

    async iPressAddByAttribute() {
        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--AddIncludedAttributes",
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press();
    }

    async iPressAddExcludedGenericAttribute() {
        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--AddExcludedAttributes",
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press();
    }

    async iSelectByAttribute(attribName) {
        await browser.asControl({
        forceSelect: true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--includedMerchandiseLineItemAttributeName",
                searchOpenDialogs: true,
                interaction: "press"
            }
        }).press();


        await browser.asControl({
        forceSelect: true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--includedGenericAttributes-searchField",
                searchOpenDialogs: true,
                interaction: "focus"
            }
        }).enterText(attribName);


        await browser.asControl({
        forceSelect: true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--includedGenericAttributes-searchField",
                searchOpenDialogs: true,
                interaction: "press"
            }
        }).press();

        await browser.asControl({
        forceSelect: true,
            selector: {
                controlType: "sap.m.ColumnListItem",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                properties: {
                    type: "Inactive"
                },
                searchOpenDialogs: true
            }
        }).press();

    }

    async iEnterByAttribute(text) {

        await browser.asControl({
        forceSelect: true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--inclMerchLineItemAttributeValue",
                searchOpenDialogs: true,
                interaction: "focus"
            }
        }).enterText(text);
        
        await browser.asControl({
			forceSelect: true,
    		selector: {
	            controlType: "sap.m.Button",
	            viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
	            i18NText: {
	                    propertyName: "text",
	                    key: "Add"
	            },
	            searchOpenDialogs: true,
	            interaction: {
	                    idSuffix: "BDI-content"
            }
    	}}).press();
    }

    async iSelectByExcludedAttribute(attribName){
        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--excludedMerchandiseLineItemAttributeName-vhi",
                searchOpenDialogs: true
        }}).press();

        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--excludedGenericAttributes-searchField",
                searchOpenDialogs: true,
                interaction: {
                        idSuffix: "I"
                }
        }}).enterText(attribName);

        await browser.asControl({
            selector: {
                controlType: "sap.m.ColumnListItem",
                viewName: "sap.suite.ui.generic.template.ObjectPage.view.Details",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                properties: {
                        type: "Inactive"
                },
                searchOpenDialogs: true,
                interaction: {
                        idSuffix: "cell1"
                }
        }}).press();

    }

    async iEnterByExcludedAttribute(value){
        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--exclMerchLineItemAttributeValue",
                searchOpenDialogs: true,
                interaction: {
                        idSuffix: "inner"
                }
        }}).enterText(value);

        await browser.asControl({
            forceSelect:true,
            selector: {
                controlType: "sap.m.Button",
                viewName: "sap.suite.ui.generic.template.ObjectPage.view.Details",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                i18NText: {
                        propertyName: "text",
                        key: "Add"
                },
                searchOpenDialogs: true,
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();

    }

    async iPressTheAddInludedHierarchyNodeButton(){
         await browser.asControl({
            	selector: {
                    id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--AddIncludedHierarchyNodeButton",
                    interaction: {
                            idSuffix: "BDI-content"
                    }
            }}).press();

          await browser.asControl({
             	selector: {
                     id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--includedMerchandiseHierarchyGroupID-vhi",
                     searchOpenDialogs: true
             }}).press();
    }

    async iEnterIncludedMHN(id) {
        await browser.asControl({
               	selector: {
                    id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--MHNSearchField",
                    searchOpenDialogs: true,
                    interaction: {
                            idSuffix: "I"
                    }
            }}).enterText(id); //input id for search

        await browser.asControl({

                selector: {
                    id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--includedHierarchyNodesTable-sa",
                    searchOpenDialogs: true,
                    interaction: {
                            idSuffix: "CbBg"
                    }
            }}).press(); //Click Select all

        await browser.asControl({

                selector: {
                     controlType: "sap.m.Button",
                     viewName: "sap.suite.ui.generic.template.ObjectPage.view.Details",
                     viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                     i18NText: {
                             propertyName: "text",
                             key: "Select"
                     },
                     searchOpenDialogs: true,
                     interaction: {
                             idSuffix: "content"
                     }
             }}).press(); // Click select
    }

    async iEnterExcludedMHN(text) {
           await browser.asControl({
                    forceSelect:true,
                	selector: {
                        id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--ExMHNSearchField",
                        searchOpenDialogs: true,
                        interaction: {
                                idSuffix: "I"
                        }
                }}).enterText(text); //Input search field

           await browser.pause(10000);//As it take time to load data

           await browser.asControl({
                    forceSelect:true,
                   	selector: {
                           controlType: "sap.m.CheckBox",
                           viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                           properties: {
                                   editable: true
                           },
                           searchOpenDialogs: true,
                           ancestor: {
                                   controlType: "sap.m.ColumnListItem",
                                   viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                                   bindingPath: {
                                           path: "/MerchHierarchies('0000100002')"
                                   },
                                   ancestor: {
                                           id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--excludedHierarchyNodesTable",
                                           searchOpenDialogs: true
                                   }
                           },
                           interaction: {
                                   idSuffix: "CbBg"
                           }
                   }}).press();//Select Row

           await browser.asControl({
                forceSelect:true,
               	selector: {
                       controlType: "sap.m.Button",
                       viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                       i18NText: {
                               propertyName: "text",
                               key: "Select"
                       },
                       searchOpenDialogs: true,
                       interaction: {
                               idSuffix: "BDI-content"
                       }
               }}).press(); //Click Select
    }

    async iEnterExcludeQualifierId(text) {
        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--excludedMerchandiseHierarchyGroupIDQualifier",
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "inner"
                }
            }
        }).enterText("Z");


        await browser.asControl({
            selector: {
                controlType: "sap.m.Button",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                i18NText: {
                    propertyName: "text",
                    key: "Add"
                },
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "inner"
                }
            }
        }).press();
    }

    async iPressAddConstraint() {
        await browser.asControl({
            selector: {
                controlType: "sap.m.Link",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                properties: {
                    text: "0"
                }
            }
        }).press();
    }

    async iPressTheAddIncludedHierarchyNodeButton() {

        await browser.asControl({
            selector: {
                id: "AddIncludedHierarchyNodeButton",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press();
    }

    async iPressTheAddExcludedProductButton(text) {
		await browser.asControl({
            forceSelect:true,
    		selector: {
            id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--objectPage-anchBar-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--ExclusionsFacet::Section-anchor-internalSplitBtn-textButton",
            interaction: {
                    idSuffix: "BDI-content"
            }
    	}}).press();
        await browser.asControl({
            forceSelect:true,
            selector: {
                controlType: "sap.m.Button",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                properties: {
                    text: "Exclusions"
                },
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press();

        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--AddExcludedProduct",
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press();

        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--excludedItemID-vhi",
                searchOpenDialogs: true
            }
        }).press();


        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--excludedProducts-searchField",
                searchOpenDialogs: true,
                interaction: "focus"
            }
        }).enterText(text);


        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--excludedProducts-searchField",
                searchOpenDialogs: true,
                interaction: "press"
            }
        }).press();


        await browser.asControl({
            forceSelect:true,
            selector: {
                controlType: "sap.m.ColumnListItem",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                properties: {
                    type: "Inactive"
                },
                searchOpenDialogs: true,
                descendant: {
                    controlType: "sap.m.ObjectIdentifier",
                    viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                    bindingPath: {
                        path: "/Products('AB_TSHIRT')",
                        propertyPath: "product"
                    },
                    searchOpenDialogs: true
                }
            }
        }).press();


        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--excludedProducts-ok",
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press();
    }

    async iEnterExcludedProduct(text) {

        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--excludedItemID",
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "inner"
                }
            }
        }).enterText("Shirt");

        await browser.asControl({
            selector: {
                controlType: "sap.m.Button",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
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

    async iPressTheAddExcludedHierarchyNodeButton() {

        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "AddExcludedHierarchyNodeButton",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                interaction: {
                    idSuffix: "content"
                }
            }
        }).press();

        await browser.asControl({
            forceSelect:true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--excludedMerchandiseHierarchyGroupID-vhi",
                searchOpenDialogs: true
            }
        }).press();

    }


    async iSelectExcludedByAttributes(attribName) {
        await browser.asControl({
            forceSelect: true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--excludedMerchandiseLineItemAttributeName",
                searchOpenDialogs: true,
                interaction: "press"
            }
        }).press();


        await browser.asControl({
            forceSelect: true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--excludedGenericAttributes-searchField",
                searchOpenDialogs: true,
                interaction: "focus"
            }
        }).enterText(attribName);


        await browser.asControl({
            forceSelect: true,
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--excludedGenericAttributes-searchField",
                searchOpenDialogs: true,
                interaction: "press"
            }
        }).press();

        await browser.asControl({
            forceSelect: true,
            selector: {
                controlType: "sap.m.ColumnListItem",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                properties: {
                    type: "Inactive"
                },
                searchOpenDialogs: true
            }
        }).press();


        await browser.asControl({
            forceSelect: true,
            selector: {
                controlType: "sap.m.Button",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
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

    async iPressTheCreateButton() {
        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--save",
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press();
    }

    async iPressTheMerchandiseHierarchyNodesAddButton() {
        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--AddIncludedHierarchyNodeButton",
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press();
    }


    async iPressTheMHNPopupSearchButton() {
        await browser.asControl({
            selector: {
                id: "addIncludedHierarchyNodesDialog--includedHierarchyNodes-searchField",
                searchOpenDialogs: true,
                interaction: "press"
            }
        }).press();
    }

    async iSelectTheMHNById(text) {
        await browser.asControl({
            selector: {
                controlType: "sap.m.Text",
                viewName: "sap.suite.ui.generic.template.ObjectPage.view.Details",
                bindingPath: {
                    path: "/MerchHierarchies('" + text + "')",
                    propertyPath: "hierarchyName"
                },
                searchOpenDialogs: true
            }
        }).press();
    }

    async iPressConstraintMHN() {
        await browser.asControl({
            selector: {
                controlType: "sap.m.IconTabFilter",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                i18NText: {
                    propertyName: "text",
                    key: "MHierarchyNodes"
                },
                searchOpenDialogs: true
            }
        }).press();
    }

    async iAddConstraintMHN() {
        await browser.asControl({
            selector: {
                controlType: "sap.m.Button",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                i18NText: {
                    propertyName: "text",
                    key: "AddButton"
                },
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "inner"
                }
            }
        }).press();

        await browser.asControl({
            selector: {
                controlType: "sap.ui.core.Icon",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                properties: {
                    src: {
                        regex: {
                            source: "value\\-help"
                        }
                    }
                },
                searchOpenDialogs: true
            }
        }).press();
    }

    async iPressVerify() {
        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--action::verifyMerchandiseButton",
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press();
    }

    async iSelectConstraintMHN(text) {
        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--merchandiseHierarchyNodes-searchField",
                searchOpenDialogs: true,
                interaction: "focus"
            }
        }).enterText(text);

        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--merchandiseHierarchyNodes-searchField",
                searchOpenDialogs: true,
                interaction: "press"
            }
        }).press();

        await browser.asControl({
            selector: {
                controlType: "sap.m.Text",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                properties: {
                    text: "Z"
                },
                searchOpenDialogs: true
            }
        }).press();
    }

    async iPressTheSaveSelectMHN() {
        await browser.asControl({
            selector: {
                id: "addIncludedHierarchyNodesDialog--includedHierarchyNodes-ok",
                searchOpenDialogs: true,
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press();
    }
    
    async iPressTheEditButton(){
    	 await browser.asControl({
             selector: {
                 id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--edit",
                 interaction: {
                     idSuffix: "BDI-content"
                 }
             }
         }).press();
	}
    
    async iEnterUomForInclusions(uom) {
        const allControls = await browser.allControls({
            forceSelect:true,
        	selector: {
                controlType: "sap.m.Input",
                viewId: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes",
                bindingPath: {
                        propertyPath: "unitOfMeasureCode"
                },
                interaction: {
                        idSuffix: "inner"
                }
        }});
        for (var i = 0; i < allControls.length; i++) {
			await allControls[i].setValue(uom);
		}
    }
    
    async iPressTheGlobalSaveButton() {
        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--save",
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }).press();
    }

    async iShouldSeeMSetName() {
	    const msetNameVisible = await browser.asControl({
	    	selector: {
	            id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--MSetGeneralInformation::merchandiseSetHeaders::merchandiseSetName::Field-text"
	    }}).getVisible();
		expect(msetNameVisible).toBeTruthy();
    }
    
    
    //Assertion(s)
    async iShouldSeeTheConfigAndPromoUITiles() {

        //browser.loadUI5Dependencies();//workaround needed, otherwise it will not find UI5 libs. 
        browser.waitForAngular(); //??????
        const tiles = await browser.allControls({
            selector: {
                controlType: 'sap.m.GenericTile'
            }
        });
        expect(tiles.length).toEqual(2); // ask and then change only !!
    }

    async iPressDeleteAllIncludeProductButton()  {
        await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--DeleteAllIncludedProducts-img"
        }}).press();
    }

    async iPressDeleteAllIncludeMHNButton()  {
        await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--DeleteAllIncludedMHNs-img"
        }}).press();
    }

    async iPressDeleteAllIncludeGAButton()  {
        await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--DeleteAllIncludedGAs-img"
        }}).press();
    }

    async iPressDeleteAllExcludeProductButton()  {
        await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--DeleteAllExcludedProducts-img"
        }}).press();
    }

    async iPressDeleteAllExcludeMHNButton()  {
        await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--DeleteAllExcludedMHNs-img"
        }}).press();
    }

    async iPressDeleteAllExcludeGAButton() {
        await browser.asControl({
        	selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--DeleteAllExcludedGAs-img"
        }}).press();
    }

    async iPressDeleteAllPopUpButton()  {
        await browser.pause(2000);
        await browser.asControl({
        forceSelect: true,
        	selector: {
                controlType: "sap.m.Button",
                properties: {
                        text: "Delete All"
                },
                searchOpenDialogs: true,
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();
    }

    async iValidateNoDataAvailablePopUp() {
        await browser.asControl({
        forceSelect: true,
        	selector: {
                controlType: "sap.m.Text",
                properties: {
                        text: "There is no item available to delete."
                },
                searchOpenDialogs: true
        }});

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

     async iValidateNoDataIncludeProduct ()  {
        const noDataText = await $("//td[@id='ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--ProductIncludes::responsiveTable-nodata-text']")
        const noData = await noDataText.getText();
        expect(noData).toEqual("No items available.");
     }

     async iValidateNoDataIncludeMHN ()  {
        const noDataText = await $("//td[@id='ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--HierarchyNodeIncludes::responsiveTable-nodata-text']")
        const noData = await noDataText.getText();
        expect(noData).toEqual("No items available.");
     }

     async iValidateNoDataIncludeGA ()  {
        const noDataText = await $("//td[@id='ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--GenericAttributeIncludes::responsiveTable-nodata-text']")
        const noData = await noDataText.getText();
        expect(noData).toEqual("No items available.");
     }

     async iValidateNoDataExcludeProduct ()  {
        const noDataText = await $("//td[@id='ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--ProductExcludes::responsiveTable-nodata-text']")
        const noData = await noDataText.getText();
        expect(noData).toEqual("No items available.");
     }

     async iValidateNoDataExcludeMHN ()  {
        const noDataText = await $("//td[@id='ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--HierarchyNodeExcludes::responsiveTable-nodata-text']")
        const noData = await noDataText.getText();
        expect(noData).toEqual("No items available.");
     }

     async iValidateNoDataExcludeGA ()  {
        const noDataText = await $("//td[@id='ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--GenericAttributeExcludes::responsiveTable-nodata-text']")
        const noData = await noDataText.getText();
        expect(noData).toEqual("No items available.");
     }

     async iPressIncludeButton ()  {
        await browser.asControl({
            selector: {
                id: "ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--objectPage-anchBar-ppservice-manage-promo-ui::sap.suite.ui.generic.template.ObjectPage.view.Details::MerchandiseSetNodes--InclusionsFacet::Section-anchor-internalSplitBtn-textButton",
                interaction: {
                        idSuffix: "BDI-content"
                }
        }}).press();
    }
    
    
}	



module.exports = new ProductGroup();
