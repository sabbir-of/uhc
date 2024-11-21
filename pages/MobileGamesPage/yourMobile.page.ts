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
async  waitForLocators(
       locator: Locator,
       options: { timeout?: number; errorMessage?: string; state?: 'attached' | 'detached' | 'hidden' | 'visible' } = { state: 'visible', timeout: 5000 }
     ): Promise<void> {
       const { state = 'visible', errorMessage } = options || {};
       try {
         await locator.waitFor(options);
         console.log('Locator is ready:', locator);
       } catch (error) {
         console.error('Failed to wait for locator:', locator.toString(), error);
         throw new Error(errorMessage || `Error: Selector '${locator}' not found in the expected state '${state}'.`);  }
     }