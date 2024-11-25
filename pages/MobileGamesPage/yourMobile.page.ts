import { expect, Page } from "@playwright/test";
import * as data from "@testData/Game URL/MobileURL.json";


export default class yourMPage {
       private page: Page;
       constructor(page: Page) {
              this.page = page;
       }
       private yourPageElements = {
       
       }

       
}



/**
 * Helper function to wait for a selector on a Locator object.
 * @param locator - The Playwright Locator object to wait for.
 * @param options - Optional: WaitForSelector options such as timeout or state.
 */
