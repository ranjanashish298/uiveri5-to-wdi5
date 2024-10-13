const Page = require("./Page");

class PxIntegration extends Page {

    async iPressPXSurveyButton() {
        await browser.pause(10000)
        const button = await $('//*[@id="sap_qualtrics_surveyTriggerButton"]/span'); //wdio
        await button.click();
        
       /* await browser.asControl({
            selector: {
                id: "sap_qualtrics_surveyTriggerButton" //wdi5
        }}).press();*/
    }

     async iPressA1(){

        await browser.pause(10000); 

        // Wait for the iframe to be present in the DOM
        const iframe = await $("//iframe[contains(@name, 'survey-iframe')]");
        await iframe.waitForExist({ timeout: 5000 });
    
        // Ensure the iframe element is found
        if (await iframe.isExisting()) {
            // Switch to the iframe
            await browser.switchToFrame(iframe);
            await browser.pause(5000);
            console.log('inside IFRAME');
        } else {
            console.error('Iframe not found');
        }

        const que1 = await $(".//*[@id='QID15-5-label']/span"); // wdio
        await que1.click();

    }

    async iPressNextButton(){        
        const nextButton = await $("//input[@id='NextButton']"); // wdio
        await nextButton.click();
    }

    async iPressA2(){        
        const que2 = await $(".//*[@id='QID10-5-label']/span"); // wdio
        await que2.click();
    }

    async iPressA3(){        
        const que3 = await $(".//*[@id='QID11-5-label']/span"); // wdio
        await que3.click();
    }

    async iFillTextArea(){
        await browser.pause(2000); 
        const TextArea = await $("//textarea[@id='QR~QID14']")
        await TextArea.setValue("Very Nice");
    }

    async iPressSubmitButton(){
        const submitButton = await $("//*[@id='NextButton']")
        await submitButton.click();
        console.log("Survey Submitted!")
    }
 

}

module.exports = new PxIntegration();