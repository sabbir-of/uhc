// Import required classes and types from Playwright
import { Page, FrameLocator } from "@playwright/test";
import WebHelper from "@helper/webHelper"; // Assuming WebHelper is in the same directory

// Define a class 'yourPage' to encapsulate operations related to a specific page.
export default class yourPage {
    // Reference to a helper class that might contain additional utility functions.
    private helper: WebHelper;

    // Constructor to initialize the page object with a Playwright Page.
    // The WebHelper is also instantiated with this page.
    constructor(private page: Page) {
        this.helper = new WebHelper(page);
    }

    // Locators for various elements on the page. Using a single object for organization.
    private yourPageElements = {        
        frame: `iframe`, // Locator for an iframe on the page.
        yourLocator: `#yourLocator`, // Specific locator for a key element within the iframe.
        userNameInputField: `#user-name`, // Username input field.
        passwordInputField: `#password`, // Password input field.
        loginBtn: `#login-button` // Login button.
    };

    // Getter to access the iframe using Playwright's frame locator utility.
    get iframe(): FrameLocator {
        // Return a frame locator for the specified frame
        return this.page.frameLocator(this.yourPageElements.frame);
    }

    // Method to perform an action within the iframe.
    async yourMethod() {
        // Locate an element within the iframe and perform a click action with specific options.
        const ele = await this.iframe.locator(this.yourPageElements.yourLocator);
        try {
            // Click the element with a left mouse button and a delay of 100 milliseconds
            await ele.click({button: "left", delay: 100}); 
        } catch (error) {
            // Error handling with a custom error message providing context.
            throw new Error(`Test Failure in 'Your Module | Mobile Design | Color Section': Expected 'Background Color Input Field Button' is not visible. Locator used: "${ele}". Error occurred: "${error}"`);
        }
    }
}

