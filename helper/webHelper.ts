import { Page, test, expect, Locator, BrowserContext, Browser } from '@playwright/test';
import { AnnotationType } from '../utils/annotations/AnnotationType';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

import { time } from 'console';

import * as fs from 'fs';

export class webHelper {

         

    public stepDescription = '';

    protected isAnnotationEnabled = true;
    protected annotationHelper: AnnotationHelper;
    
    constructor(protected readonly page: Page, public readonly keyPage: string) {
        this.annotationHelper = new AnnotationHelper(this.page, this.keyPage);
    }

    /**
     * Go to the base Address
     */
    public async goTo(url: any): Promise<void> {
        this.annotationHelper.addAnnotation(AnnotationType.GoTo, 'Go to the page: "' + url + '"');
        await this.page.goto(url, { waitUntil: "networkidle" });
    }

    /**
     * Add annotation
     * @param type Type of the annotation (shows in bold)
     * @param description Description for the annotation
     */
    addAnnotation(type: AnnotationType, description: string) {
        this.annotationHelper.addAnnotation(type, description);
    }

    /**
     * Add friendly step in reporter
     * @param stepFunction function to add 
     * @returns Data returned by the function
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async addStep(stepDescription: string, stepFunction: any): Promise<any> {
        return await test.step(stepDescription, stepFunction);
    }

    /**
     * Add steps with annotations
     * @param type 
     * @param description 
     * @param stepFunction 
     * @returns 
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async addStepWithAnnotation(type: AnnotationType, description: string, stepFunction: () => Promise<any>) {
        if (this.isAnnotationEnabled) {
            this.addAnnotation(type, description);
            return await test.step(description, stepFunction);
        }
        else
            await stepFunction();
    }

    /**
     * Go to Default page
     */
    async goToDefault() {
        const stepDescription = 'Go to default page';
        this.addAnnotation(AnnotationType.GoTo, stepDescription);
        // eslint-disable-next-line playwright/expect-expect
        await test.step(stepDescription + '', async () => {
            await this.page.goto('/');
        });
    }

    async leftClickButton(locator: string): Promise<void> {
        await this.page.locator(locator).click({ button: "left" });
      }
    
    
    

    /**
     * Init annotation to an empty array
     */
    initAnnotations() {
        this.annotationHelper.initAnnotations();
    }

    /**
     * Get current annotations
     * @returns Array of current annotations
     */
    getAnnotations() {
        return this.annotationHelper.getAnnotations();
    }



    /**
     * Check that 2 values are equal
     * @param expected Value expected
     * @param actual Actual Value
     * @param assertMessage  Message to assert
     */
    public AssertEqual(expected: string, actual: string, assertMessage: string) {
        this.annotationHelper.addAnnotation(AnnotationType.Assert, assertMessage);
        expect.soft(expected, assertMessage).toEqual(actual);
    }

    public AssertArrayEqual(expected: string[], actual: string[], assertMessage: string) {
        this.annotationHelper.addAnnotation(AnnotationType.Assert, assertMessage);
        expect(expected, assertMessage).toEqual(actual);
    }

    
  /**
   * The `delay` function is an asynchronous function that waits for a specified amount of time before
   * resolving.
   * @param {number} time - The `time` parameter is a number that represents the duration of the delay
   * in seconds.
   * @returns a Promise that resolves to void.
   */
  async delay(time: number): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(resolve, time * 1000);
    });
  }

  /**
   * The function clicks on an element on a web page based on its text content.
   * @param {string} text - The text parameter is a string that represents the text content of an element
   * that you want to click on. It is used to locate the element on the web page.
   * @param {boolean} [exact=true] - The `exact` parameter is a boolean value that determines whether the
   * text should be matched exactly or not. If `exact` is set to `true`, the `clickByText` function will
   * only click on elements that have an exact match with the provided text. If `exact` is set to `
   */
  async clickByText(text: string, exact: boolean = true): Promise<void> {
    await this.page.getByText(text, { exact: exact }).click();
  }

  async rightClickButton(locator: string): Promise<void> {
    await this.page.locator(locator).click({ button: "right" });
  }



/**
 * Helper function to perform user authentication and save session state.
 * @param {Page} page - The Playwright Page object.
 * @param {object} options - Authentication details and configuration.
 * @param {string} options.url - URL of the login page.
 * @param {string} options.username - Username for login.
 * @param {string} options.password - Password for login.
 * @param {string} options.usernameSelector - CSS selector for the username input.
 * @param {string} options.passwordSelector - CSS selector for the password input.
 * @param {string} options.submitSelector - CSS selector for the login button.
 * @param {string} options.successSelector - CSS selector that appears after successful login.
 * @param {string} options.storageStatePath - Path to save the authentication state.
 */


async authSetup(page: Page, loginUrl: any, usernameSelector: any, passwordSelector:any, username: any, password: any ,submitSelector: any,successSelector: any,  storageStatePath: any): Promise<void> {
  try {
      // Navigate to the login page
      await page.goto(loginUrl);

      // Fill in username and password
      await page.fill(usernameSelector, username);
      await page.fill(passwordSelector, password);

      // Click the login button and wait for navigation or a specific element that confirms login
      await Promise.all([
          page.click(submitSelector),
          page.waitForLoadState("networkidle"), // Adjust based on the app's loading behavior
      ]);

      // Optionally, check for a specific element to ensure successful login
      await page.waitForSelector(successSelector, { timeout: 9000 });

      // Save the authentication state
      await page.context().storageState({ path: storageStatePath });
      console.log(`Auth state saved to ${storageStatePath}`);
  } catch (error) {
      throw new Error(`Authentication failed: ${error}`);
  }
}



  async clickHelperForString(selector: any, options: { retries?: number, timeout?: number } = {}): Promise<void> {
    const { retries = 3, timeout = 3000 } = options;
    
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            if (!this.page.isClosed()) {  // Check if page is still open
                await this.page.waitForSelector(selector, { state: 'attached', timeout });
                await this.page.click(selector, {delay: 100, button: 'left'});                
                return;  // Exit after a successful click
            } else {
                throw new Error('Page or context has been closed.');
            }
        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed: ${error}`);
            if (attempt === retries - 1) {
                throw new Error(`Click failed on selector: ${selector}. Error after ${retries} attempts: ${error}`);
            }
        }
    }
}



/**
 * Waits for a selector to appear on the page and be visible.
 * @param {Page} page - The Playwright page instance.
 * @param {string} selector - The CSS selector of the element to wait for.
 * @param {number} timeout - Optional timeout for waiting (default: 5000 ms).
 * @returns {Promise<Locator>} - The Locator of the found element if it appears within the timeout.
 */
async  waitForSelector(page: Page, selector: any, timeout: number = 5000): Promise<Locator> {
    try {
        // Wait for the selector to appear and be visible within the specified timeout
        await page.waitForSelector(selector, { state: 'visible', timeout });
        console.log(`Selector "${selector}" is visible on the page.`);
        return page.locator(selector); // Return the Locator for further actions if needed
    } catch (error) {
        console.error(`Selector "${selector}" did not appear within ${timeout} ms.`);
        throw new Error(`Timeout waiting for selector: ${selector}`);
    }
}

async clickIfVisible(locator: Locator, retries: number = 3, timeout: number = 5000): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
      try {
          // Wait for the element to be visible and attached to the DOM
          await locator.waitFor({ state: 'visible', timeout });
          // Attempt to click the element
          await locator.click({ force: true}); 
          await this.page.waitForTimeout(400); // Adjust the timeout as necessary         
          return; // Exit after a successful click
      } catch (error) {
         
      }
  }
}


async clickHelper(locator: Locator, retries: number = 3, timeout: number = 5000): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
      try {
          // Wait for the element to be visible and attached to the DOM
          await locator.waitFor({ state: 'visible', timeout });
          // Attempt to click the element
          await locator.click({ force: true}); 
          await this.page.waitForTimeout(700); // Adjust the timeout as necessary         
          return; // Exit after a successful click
      } catch (error) {
          if (attempt === retries) {
              throw new Error(`Click failed on locator: ${locator} after ${retries} attempts. Error: ${error}`);
          } else {
              console.warn(`Attempt ${attempt} failed for locator: ${locator}. Retrying...`);
          }
      }
  }
}

async dblclickHelper(locator: Locator, retries: number = 3, timeout: number = 5000): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
      try {
          // Wait for the element to be visible and attached to the DOM
          await locator.waitFor({ state: 'visible', timeout });
          // Attempt to click the element
          await locator.dblclick({ force: true, button: "left"}); 
          await this.page.waitForTimeout(400); // Adjust the timeout as necessary         
          return; // Exit after a successful click
      } catch (error) {
          if (attempt === retries) {
              throw new Error(`Click failed on locator: ${locator} after ${retries} attempts. Error: ${error}`);
          } else {
              console.warn(`Attempt ${attempt} failed for locator: ${locator}. Retrying...`);
          }
      }
  }
}






/**
 * Waits for all network-loaded images on the page to be fully loaded.
 * @param {Page} page - The Playwright page instance.
 * @param {number} timeout - Optional timeout to wait for images to load (default: 10000 ms).
 */
async  waitForAllImagesToLoad(page: Page, timeout: number = 10000): Promise<void> {
    await page.waitForFunction(() => {
        // Select all <img> elements on the page
        const images = Array.from(document.querySelectorAll('img'));
        
        // Check if every image is fully loaded
        return images.every(img => img.complete && img.naturalHeight !== 0);
    }, { timeout });

    console.log('All images have successfully loaded.');
}






/**
 * Asserts that an element contains the specified text content.
 * @param {Locator} locator - The locator for the element to check.
 * @param {string} expectedText - The expected text content within the element.
 * @param {number} timeout - The maximum wait time in milliseconds for the element to appear (default is 3000 ms).
 */
async assertTextHelper(locator: Locator, expectedText: string, timeout: number = 5000): Promise<void> {
    try {
        // Wait for the element to be visible
        await locator.waitFor({ state: 'visible', timeout });

        // Retrieve the text content of the element
        const actualText = await locator.textContent();

        // Capture screenshot on failure
        const screenshot = await this.page.screenshot({ fullPage: true });
        
        // Attach screenshot to the test report
        test.info().attach('Screenshot on', {
            body: screenshot,
            contentType: 'image/png',
        });
         // Softly assert that the actual text content matches the expected text
        await expect.soft(actualText?.trim()).toBe(expectedText.trim());        
        console.log(`Soft text assertion for locator: ${locator}. Expected text "${expectedText}" is present.`);

    } catch (error) {       
      throw new Error(`Text assertion failed for locator: ${locator}. Error: ${error}`);
    }
}




/**
 * Fills text into an input field specified by a Locator, with optional retries and timeout.
 * @param {Locator} locator - The locator for the input field.
 * @param {string} text - The text to fill into the input field.
 * @param {number} retries - Number of retries if the fill fails (default is 3).
 * @param {number} timeout - Maximum wait time for each attempt in milliseconds (default is 3000 ms).
 */


// async inputTextHelper(locator: Locator, text: string, retries: number = 3, timeout: number = 3000): Promise<void> {
//     for (let attempt = 1; attempt <= retries; attempt++) {
//         try {
//             // Wait for the input field to be visible and enabled
//             await locator.waitFor({ state: 'visible', timeout });

//             // Fill the specified text into the input field
//             await locator.fill(text);            
//             return; // Exit after successful fill
//         } catch (error) {
//             if (attempt === retries) {
//                 throw new Error(`Filling text failed on locator: ${locator} after ${retries} attempts. Error: ${error}`);
//             } else {
//                 console.warn(`Attempt ${attempt} failed for locator: ${locator}. Retrying...`);
//             }
//         }
//     }
// }




/**
 * Helper function to input text into a field with retries and delay between retries.
 * @param {Locator} locator - The Locator of the input field.
 * @param {string} text - The text to input into the field.
 * @param {number} retries - The number of attempts to try inputting text (default: 3).
 * @param {number} timeout - Timeout in milliseconds to wait for the field to be visible (default: 3000 ms).
 * @param {number} delay - Delay in milliseconds between each retry attempt (default: 500 ms).
 * @returns {Promise<void>}
 */
async inputTextHelper(
    locator: Locator,
    text: any,
    retries: number = 3,
    timeout: number = 3000,
    delay: number = 500
): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            // Wait for the input field to be visible and enabled
            await locator.waitFor({ state: 'visible', timeout });
         

            // Fill the specified text into the input field
            await locator.fill(text);            
            console.log(`Text input successful on attempt ${attempt}.`);
            return; // Exit after a successful fill
        } catch (error) {
            if (attempt === retries) {
                throw new Error(`Filling text failed on locator: ${locator} after ${retries} attempts. Error: ${error}`);
            } else {
                console.warn(`Attempt ${attempt} failed for locator: ${locator}. Retrying in ${delay} ms...`);
                await new Promise(res => setTimeout(res, delay)); // Wait before retrying
            }
        }
    }
}


async inputHelper(selector: any, text: any) {
  try {
      // Wait for the input field to be visible
      await this.page.waitForSelector(selector, { state: 'visible', timeout: 5000 });

      // Clear any existing text and then type the new text
      await this.page.fill(selector, text);
  } catch (error) {
      throw new Error(`Failed to fill text into the input field. Selector: "${selector}", Text: "${text}". Error: "${error}"`);
  }
}





/**
 * Helper function to verify the background color of an element.
 * @param {Locator} element - The Locator of the element whose color needs to be verified.
 * @param {string} expectedColor - The expected color in any valid CSS color format (e.g., hex, rgb, rgba).
 * @param {string} property - The CSS property to check, such as 'background-color' or 'color' (default is 'background-color').
 * @returns {Promise<void>}
 */
async verifyElementColor(element: Locator, expectedColor: string, property: string = 'background-color'): Promise<void> {
    try {
        // Wait for the element to be visible
        await element.waitFor({ state: 'visible' });

        // Get the computed style for the specified color property
        const color = await element.evaluate((el, property) => {
            return window.getComputedStyle(el).getPropertyValue(property);
        }, property);

        // Verify that the actual color matches the expected color
        expect(color.trim()).toBe(expectedColor);
        console.log(`Color verification successful. ${property} is '${expectedColor}'.`);
    } catch (error) {
        console.error(`Color verification failed. Expected ${property} to be '${expectedColor}', but it did not match.`, error);
        throw error;
    }
}




/**
 * Uploads an image file using the specified file input selector.
 * @param {string} filePath - The file path of the image to be uploaded.
 * @param {string} selector - The selector for the file input element on the page.
 */
async uploadImage(filePath: string, selector: string): Promise<void> {
  console.log(`Uploading image from path: ${filePath}`);
  
  try {
      // Wait for the file input element to be attached to the DOM
      await this.page.waitForSelector(selector, { state: 'attached' });
      
      // Set the file path to the input element
      const inputElement = await this.page.locator(selector);
      await inputElement.setInputFiles(filePath);
      
      console.log('Image upload successful.');
  } catch (error) {
      throw new Error(`Image upload failed for selector: ${selector}. Error: ${error}`);
  }
}



/**
 * Uploads a video file using the file chooser dialog.
 * @param {Page} page - The Playwright Page instance.
 * @param {Locator} uploadButton - The locator for the button that opens the file chooser dialog.
 * @param {string} videoFilePath - The path to the video file to be uploaded.
 * @param {number} timeout - The maximum wait time in milliseconds for the upload button to become visible (default is 5000 ms).
 */
async uploadVideo(
    page: Page,
    uploadButton: Locator,
    videoFilePath: string,
    timeout: number = 5000
): Promise<void> {
    try {
        // Wait for the upload button to be visible
        await expect(uploadButton).toBeVisible({ timeout });

        // Trigger the file chooser dialog and upload the video file
        const [fileChooser] = await Promise.all([
            page.waitForEvent('filechooser'),
            uploadButton.click(), // Open file chooser
        ]);

        await fileChooser.setFiles(videoFilePath);
        console.log(`Video file "${videoFilePath}" has been successfully uploaded.`);
    } catch (error) {
        console.error(`Video upload failed for file: "${videoFilePath}". Error: ${error}`);
        throw new Error(`Video upload failed for file: "${videoFilePath}". Error occurred: "${error}"`);
    }
}



/**
 * Clicks the active (enabled) button among a group of buttons.
 * @param {Page} page - The Playwright page instance.
 * @param {Locator} buttonsLocator - Locator for the group of buttons.
 * @param {number} timeout - Optional timeout for waiting for the active button (default: 5000 ms).
 */
async clickActiveButton( buttonsLocator: Locator, timeout: number = 5000): Promise<void> {
    const buttons = await buttonsLocator.elementHandles();
    
    for (const button of buttons) {
        if (await button.isEnabled()) {
            await button.click();
            console.log('Active button clicked successfully.');
            return;
        }
    }
    
    throw new Error('No active button found to click.');
}

/**
 * Waits for the page to reach a network idle state, indicating all network requests have completed.
 * @param {Page} page - The Playwright page instance.
 * @param {number} timeout - Optional timeout to wait for network idle (default: 10000 ms).
 */
async  waitForNetworkIdle(page: Page, timeout: number = 10000): Promise<void> {
  try {
      // Wait until there are no more than 0 network requests for at least 500 ms
      await page.waitForLoadState('networkidle', { timeout });
      console.log('Page has reached network idle state.');
  } catch (error) {
      throw new Error(`Network idle state not reached within ${timeout} ms. Error: ${error}`);
  }
}


/**
 * Waits for a specified timeout duration.
 * @param {number} timeout - The timeout duration in milliseconds.
 */
async  waitForTimeout(timeout: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



/**
 * Waits for all media elements (images, videos, audio) on the page to be fully loaded.
 * @param {Page} page - The Playwright page instance.
 * @param {number} timeout - Optional timeout to wait for all media elements to load (default: 10000 ms).
 */
async  waitForAllMediaElementsToLoad(page: Page, timeout: number = 10000): Promise<void> {
    await page.waitForFunction(() => {
        // Check if all <img> elements are fully loaded
        const images = Array.from(document.querySelectorAll('img'));
        const allImagesLoaded = images.every(img => img.complete && img.naturalHeight !== 0);

        // Check if all <video> elements are fully loaded and ready to play
        const videos = Array.from(document.querySelectorAll('video'));
        const allVideosLoaded = videos.every(video => video.readyState >= 3); // `3` indicates "HAVE_FUTURE_DATA" in HTML5

        // Check if all <audio> elements are fully loaded and ready to play
        const audios = Array.from(document.querySelectorAll('audio'));
        const allAudiosLoaded = audios.every(audio => audio.readyState >= 3);

        return allImagesLoaded && allVideosLoaded && allAudiosLoaded;
    }, { timeout });

    console.log('All media elements have successfully loaded.');
}




/**
 * Waits for all API requests and media (images, videos) to successfully load on the page.
 * @param {Page} page - The Playwright page instance.
 * @param {number} timeout - Optional timeout for waiting for all requests to complete (default: 10000 ms).
 */
async waitForAllResourcesToLoad(page: Page, timeout: number = 10000): Promise<void> {
    const resourceTypesToWaitFor = ['xhr', 'fetch', 'image', 'media', 'stylesheet', 'font'];

    let pendingRequests = 0;
    let timeoutId: NodeJS.Timeout;

    const onRequest = (request: any) => {
        if (resourceTypesToWaitFor.includes(request.resourceType())) {
            pendingRequests += 1;
        }
    };

    const onRequestFinished = (request: any) => {
        if (resourceTypesToWaitFor.includes(request.resourceType())) {
            pendingRequests -= 1;
        }
    };

    const onRequestFailed = (request: any) => {
        if (resourceTypesToWaitFor.includes(request.resourceType())) {
            pendingRequests -= 1;
        }
    };

    page.on('request', onRequest);
    page.on('requestfinished', onRequestFinished);
    page.on('requestfailed', onRequestFailed);

    try {
        await new Promise<void>((resolve, reject) => {
            const checkRequests = () => {
                if (pendingRequests === 0) {
                    clearTimeout(timeoutId);
                    resolve();
                }
            };

            timeoutId = setTimeout(() => {
                reject(new Error(`Not all resources loaded within ${timeout} ms.`));
            }, timeout);

            page.on('requestfinished', checkRequests);
            page.on('requestfailed', checkRequests);
        });

        console.log('All API requests and media have successfully loaded.');
    } finally {
        // Clean up listeners after completion or timeout
        page.off('request', onRequest);
        page.off('requestfinished', onRequestFinished);
        page.off('requestfailed', onRequestFailed);
    }
}







async waitForButtonToBeEnabled(locator: Locator, timeout: number = 30000): Promise<void> {
    const startTime = Date.now();

    while (true) {
        const isEnabled = await locator.isEnabled();
        if (isEnabled) {
            return;
        }

        if (Date.now() - startTime > timeout) {
            throw new Error(`Timeout: Button did not become enabled within ${timeout} ms`);
        }

        // Optional: Add a small delay to avoid tight looping
        await new Promise(res => setTimeout(res, 100));
    }
}




// Helper function to wait for page load and all API requests to complete
async waitForPageAndAPIsToLoad(
  page: Page,
  apiUrls: string[],
  timeout: number = 30000
): Promise<void> {
  const startTime = Date.now();

  // Wait for the page to load completely
  await page.waitForLoadState('networkidle', { timeout });

  // Track pending API requests
  const pendingApis = new Set<string>(apiUrls);

  // Listen for successful API responses and remove URLs from the pending set
  page.on('response', (response) => {
    const url = response.url();
    if (pendingApis.has(url) && response.ok()) {
      pendingApis.delete(url);
    }
  });

  // Wait for all API requests to be completed or timeout
  while (pendingApis.size > 0) {
    if (Date.now() - startTime > timeout) {
      throw new Error(`Timeout: All APIs did not load within ${timeout} ms`);
    }
    // Small delay to avoid tight looping
    await new Promise((res) => setTimeout(res, 100));
  }
}





/**
 * Helper function to verify that a background video has been successfully uploaded and is visible as the screen background.
 * @param {Page} page - The Playwright Page instance.
 * @param {Locator} videoElement - The locator for the video element that serves as the screen background.
 * @param {number} timeout - The maximum wait time in milliseconds to verify the video element is playing (default is 5000 ms).
 */
async  verifyBackgroundVideo(
  page: Page,
  videoElement: Locator,
  timeout: number = 5000
): Promise<void> {
  try {
    // Wait for the video element to be visible
    await expect(videoElement).toBeVisible({ timeout });

    // Verify that the video element is loaded and ready to play
    const isVideoPlaying = await page.evaluate((video) => {
      return (
        (video as HTMLVideoElement).readyState >= 2 && // Check if the video is at least "HAVE_CURRENT_DATA"
        video !== null && !(video as HTMLVideoElement).paused && // Ensure the video is not paused
        !(video as HTMLVideoElement).ended && // Ensure the video has not ended
        (video as HTMLVideoElement).duration > 0 // Ensure the video has a valid duration
      );
    }, await videoElement.elementHandle());

    if (isVideoPlaying) {
      console.log("Background video is successfully loaded and playing.");
    } else {
      throw new Error("Background video is not playing or not properly loaded.");
    }
  } catch (error) {
    console.error("Failed to verify the background video. Error:", error);
    throw error;
  }
}




/**
 * Helper function to verify the background image URL of an element.
 * @param {Locator} element - The Locator of the element to verify the background image.
 * @param {string} expectedImageUrl - The expected URL (or part of the URL) of the background image.
 * @returns {Promise<void>}
 */
async verifyBackgroundImage(
    element: Locator,
    expectedImageUrl: string
): Promise<void> {
    // Wait for the element to be visible
    await element.waitFor({ state: 'visible' });

    // Get the computed background-image URL from the element's CSS
    const backgroundImageUrl = await element.evaluate((el) => {
        const computedStyle = window.getComputedStyle(el);
        return computedStyle.backgroundImage;
    });

    try {
        // Check if the background-image URL includes the expected URL
        expect(backgroundImageUrl).toContain(expectedImageUrl);
        console.log(`Background image verification successful. URL: '${backgroundImageUrl}'`);
    } catch (error) {
        console.error(`Background image verification failed. Expected URL to contain '${expectedImageUrl}', but got '${backgroundImageUrl}'.`, error);
        throw error;
    }
}



/**
 * Uploads a file using the file chooser dialog.
 * @param {string} filePath - The file path of the file to be uploaded.
 */
async uploadFileUsingFileChooser(filePath: string): Promise<void> {
  console.log(`Uploading file from path: ${filePath}`);
  
  // Set up a one-time event listener for filechooser
  this.page.once("filechooser", async (fileChooser) => {
      try {
          await fileChooser.setFiles([filePath]);
          console.log('File upload successful.');          
      } catch (error) {
          throw new Error(`File upload failed. Error: ${error}`);
      }
  });
}





/**
 * Helper function to wait for a locator to reach a specified state.
 * @param {Locator} locator - The Playwright Locator object to wait for.
 * @param {string} state - The state to wait for ('visible', 'hidden', 'attached', or 'detached').
 * @param {number} timeout - Optional timeout in milliseconds to wait for the locator (default is 5000 ms).
 * @returns {Promise<void>}
 */
async waitForLocator(
    locator: Locator,
    state: 'visible' | 'hidden' | 'attached' | 'detached',
    timeout: number = 10000
): Promise<void> {
    try {
        await locator.waitFor({ state, timeout });
        console.log(`Locator reached state: '${state}' within ${timeout} ms.`);
    } catch (error) {
        console.error(`Failed to reach state '${state}' for locator within ${timeout} ms.`, error);
        throw error;
    }
}





/**
 * Copies the current page URL to the clipboard.
 * @param {Page} page - The Playwright Page instance from which the URL will be copied.
 */
async copyUrlToClipboard(): Promise<void> {
    const url = this.page.url();
    await this.page.evaluate(async (text) => {
        await navigator.clipboard.writeText(text);
    }, url);
    console.log(`URL "${url}" has been copied to the clipboard.`);
}

/**
 * Opens a new page and navigates to the URL in the clipboard.
 * @param {BrowserContext} context - The Playwright BrowserContext instance to create a new page.
 */
async openClipboardUrl(): Promise<void> {
    // Open a new page
    const newPage = await this.page.context().newPage();

    // Get the clipboard content (URL) and navigate to it
    const clipboardUrl = await newPage.evaluate(async () => {
        return await navigator.clipboard.readText();
    });
    
    if (clipboardUrl) {
        await newPage.goto(clipboardUrl);
        console.log(`Navigated to the URL from clipboard: "${clipboardUrl}".`);
    } else {
        throw new Error("Clipboard does not contain a valid URL.");
    }
}




/**
 * Helper function to find a nested element within a container and click it.
 * @param {Page} page - The Playwright Page object.
 * @param {string} containerSelector - The CSS selector for the container element.
 * @param {string} nestedSelector - The CSS selector for the nested dynamic element.
 */
async clickNestedElement(
  page: Page,
  containerSelector: any,
  nestedSelector: any
): Promise<void> {
  try {
    const elementHandle = await page.evaluateHandle(
      ({ containerSelector, nestedSelector }) => {
        const container = document.querySelector(containerSelector);
        return container?.querySelector(nestedSelector);
      },
      { containerSelector, nestedSelector }
    );

    if (elementHandle) {
      
      console.log(`Clicked on nested element with selector: ${nestedSelector}`);
    } else {
      console.warn(`Nested element with selector '${nestedSelector}' not found in container '${containerSelector}'`);
    }
  } catch (error) {
    console.error(`Failed to click nested element: ${error}`);
  }
}





  async navigateToUrl(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async verifyDragAndDrop(
    source: string,
    target: string,
    verifyText: string
  ): Promise<void> {
    let draggable = await this.page.locator(source);
    let droppable = await this.page.locator(target);
    await draggable.hover();
    await this.page.mouse.down();
    await droppable.hover();
    await this.page.mouse.up();
    await expect(droppable).toContainText(verifyText);
  }

  async verifyToolTip(locator: string, hoverText: string): Promise<void> {
    let el = await this.page.locator(locator);
    el.hover();
    await expect(el).toContainText(hoverText);
  }

  async verifyFileDownload(): Promise<void> {
    //TBD
  }

  async verifyNewTab(newTabUrlExpected: string): Promise<void> {
    //TBD
  }

  async verifyNewWindow(newWindowUrlExpected: string): Promise<void> {
    //TBD
  }
  async verifyFrameText(): Promise<void> {
    //TBD
  }
  async verifyNestedFrame(): Promise<void> {
    //TBD
  }

  /**
   * The function asserts that the current page URL matches the expected URL.
   * @param {string} url - The `url` parameter is a string that represents the expected URL of a web
   * page.
   */
  async assertPageURL(url: string): Promise<void> {
    console.log(`Asserts that page url is ${url}.`);
    await expect(this.page).toHaveURL(url);
  }

  /**
   * The function asserts that the page title matches the expected title.
   * @param {string} title - The title parameter is a string that represents the expected title of the
   * web page.
   */
  async assertPageTitle(title: string): Promise<void> {
    console.log(`Asserts that page title is ${title}.`);
    await expect(this.page).toHaveTitle(title);
  }
  /**
   * The function opens a new tab in a browser context, navigates to a specified URL, and returns the
   * page object representing the new tab.
   * @param {string} url - A string representing the URL of the webpage that you want to open in a new
   * tab.
   * @returns a Promise that resolves to a Page object.
   */

  /**
   * The function takes a screenshot of a web page and saves it as an image file.
   * @param {string} imageName - The imageName parameter is a string that specifies the name of the
   * screenshot image file. If no value is provided, it defaults to "screenshot.png".
   */
  async takeScreenshot(imageName: string = `screenshot.png`): Promise<void> {
    await this.page.screenshot({ path: `${imageName}`, fullPage: true });
  }
  
  

/**
 * Helper function to perform a full-page visual screenshot comparison.
 * @param {Page} page - The Playwright Page object.
 * @param {string} screenshotName - The name of the screenshot file for comparison.
 * @param {number} maxDiffPixels - The maximum number of pixels allowed to differ between screenshots.
 */
async compareFullPageScreenshot(
  page: Page,
  screenshotName: string,
  maxDiffPixels: number = 100,
  
): Promise<void> {
  // Capture a full-page screenshot
  const screenshotBuffer = await page.screenshot({ fullPage: true });

  // Perform the visual comparison using Playwright's expect function
  try {
    await expect.soft(screenshotBuffer).toMatchSnapshot(`${screenshotName}.png`, {
      maxDiffPixels, // Maximum allowed pixel differences
    });
    console.log(`Full-page visual comparison for '${screenshotName}' successful.`);
  } catch (error) {
    console.error(`Full-page visual comparison for '${screenshotName}' failed.`, error);
    throw error;
  }
}





/**
 * Helper function to upload a font file and verify that it's applied to a sample text.
 * @param {Page} page - The Playwright Page object.
 * @param {Locator} uploadButton - The Locator for the font upload button/input.
 * @param {string} fontFilePath - The path to the font file to be uploaded.
 * @param {Locator} textElement - The Locator of a text element to verify the font on.
 * @param {string} expectedFontFamily - The expected font family name after the upload.
 * @param {number} timeout - Optional timeout in milliseconds to wait for the font to be applied (default is 5000 ms).
 * @returns {Promise<void>}
 */
async uploadFontAndVerify(
    page: Page,
    uploadButton: Locator,
    fontFilePath: string,    
    timeout: number = 5000
): Promise<void> {

  try {
    console.log(`Uploading font from path: ${fontFilePath}`);

    // Wait for the upload button to be visible and trigger the file chooser
    await uploadButton.waitFor({ state: 'visible' });
    await page.once('filechooser', async (fileChooser) => {
        await fileChooser.setFiles([fontFilePath]);
    });

    await uploadButton.click(); // Trigger the file chooser dialog

    
  } catch (error) {
    throw new Error(`Font '${uploadButton}' was not uploaded within ${timeout} ms.`);
    
  }    
   
}




/**
 * Helper function to verify the uploaded video on a page.
 * @param page - The Playwright Page object.
 * @param videoSelector - The CSS selector for the video element.
 * @param expectedVideoSrc - The expected URL or partial URL of the uploaded video file.
 */
async verifyUploadedVideo(
  page: Page,
  videoSelector: string,
  expectedVideoSrc: string
): Promise<void> {
  // Ensure the video element is visible
  const videoElement = page.locator(videoSelector);
  await expect(videoElement).toBeVisible({ timeout: 5000 });

  // Verify the video source URL matches the expected URL or part of it
  const videoSourceUrl = await videoElement.evaluate((video: HTMLVideoElement) => video.currentSrc);
  expect(videoSourceUrl).toContain(expectedVideoSrc);

  // Optional: Play a short segment of the video to confirm it loads and plays
  await videoElement.evaluate((video: HTMLVideoElement) => video.play());
  await page.waitForTimeout(1000); // Play for 1 second
  await videoElement.evaluate((video: HTMLVideoElement) => video.pause());

  console.log(`Video verification successful for source: ${expectedVideoSrc}`);
}




/**
 * Helper function to perform a visual screenshot comparison for a specific element.
 * @param {Locator} element - The Locator of the specific element to capture.
 * @param {string} screenshotName - The name of the screenshot file for comparison.
 * @param {number} maxDiffPixels - The maximum number of pixels allowed to differ between screenshots.
 */
async compareElementScreenshot(
  element: Locator,
  screenshotName: string,
  maxDiffPixels: number = 500,
): Promise<void> {
  // Capture a screenshot of the specified element
  const screenshotBuffer = await element.screenshot();

  // Perform the visual comparison using Playwright's expect function
  try {
    await expect.soft(screenshotBuffer).toMatchSnapshot(`${screenshotName}.png`, {
      maxDiffPixels,// Maximum allowed pixel differences
    });
    console.log(`Element visual comparison for '${screenshotName}' successful.`);
  } catch (error) {
    console.error(`Element visual comparison for '${screenshotName}' failed.`, error);
    throw error;
  }
}










/**
 * Helper function to interact with a checkbox element.
 * @param {Locator} checkbox - The Locator of the checkbox element.
 * @param {boolean} shouldCheck - Whether to check or uncheck the checkbox.
 * @returns {Promise<void>}
 */
async handleCheckbox(checkbox: Locator, shouldCheck: boolean): Promise<void> {
    const isChecked = await checkbox.isChecked();

    try {
        // Check or uncheck the checkbox based on shouldCheck parameter
        if (shouldCheck && !isChecked) {
            await checkbox.check();
            console.log('Checkbox is now checked.');
        } else if (!shouldCheck && isChecked) {
            await checkbox.uncheck();
            console.log('Checkbox is now unchecked.');
        } else {
            console.log(`Checkbox is already in the desired state: ${shouldCheck ? 'checked' : 'unchecked'}.`);
        }
    } catch (error) {
        console.error(`Failed to interact with checkbox: ${error}`);
        throw error;
    }
}

/**
 * Helper function to verify the state of a checkbox.
 * @param {Locator} checkbox - The Locator of the checkbox element.
 * @returns {Promise<boolean>} - Returns true if the checkbox is checked, otherwise false.
 */
async isCheckboxChecked(checkbox: Locator): Promise<boolean> {
    try {
        const isChecked = await checkbox.isChecked();
        console.log(`Checkbox is ${isChecked ? 'checked' : 'unchecked'}.`);
        return isChecked;
    } catch (error) {
        console.error(`Failed to verify checkbox state: ${error}`);
        throw error;
    }
}





  /**
   * The function takes a locator and an optional image name as parameters, finds the element on a web
   * page using the locator, and takes a screenshot of the element.
   * @param {string} locator - The `locator` parameter is a string that represents the element you want
   * to take a screenshot of. It can be a CSS selector, an XPath expression, or any other valid locator
   * strategy supported by the `this.page.locator` method.
   * @param {string} imageName - The `imageName` parameter is a string that specifies the name of the
   * screenshot image file. If no value is provided, it defaults to "screenshot.png".
   */
  async takeScreenshotOfElement(
    locator: string,
    imageName: string = `screenshot.png`
  ): Promise<void> {
    const el = await this.page.locator(locator);
    await el.screenshot({ path: `${imageName}` });
  }

  /**
   * The function checks if an element on a web page contains the expected text.
   * @param {string} target - A string representing the target element to locate on the web page.
   * @param {string} expectedText - The expected text that you want the element to contain.
   */
  async elementContainText(
    target: string,
    expectedText: string
  ): Promise<void> {
    console.log(
      `Asserts that element ${target} contains text ${expectedText}.`
    );
    const el = await this.page.locator(target);
    await expect(el).toContainText(expectedText);
  }


  
  /**
   * The function checks if an element on a web page has the expected text.
   * @param {string} target - The target parameter is a string that represents the locator for the
   * element you want to check for text. It could be a CSS selector, an XPath expression, or any other
   * valid locator strategy supported by the testing framework you are using.
   * @param {string} expectedText - The expected text that the element should have.
   */
  async elementHasText(target: string, expectedText: string): Promise<void> {
    console.log(
      `Asserts that element ${target} has expected text ${expectedText}.`
    );
    const el = await this.page.locator(target);
    await expect(el).toHaveText(expectedText);
  }

  

  /**
   * Helper function to assert that a specific element is visible on the page.
   * @param {Locator} element - The Locator of the element to check for visibility.
   * @param {number} timeout - Optional timeout in milliseconds to wait for the element to be visible (default: 5000 ms).
   * @returns {Promise<void>}
   */
  async expectToBeVisible(element: Locator, timeout: number = 10000): Promise<void> {
      try {
          // Wait for the element to be visible
          await element.waitFor({ state: 'visible', timeout });
          
          // Assert that the element is visible
          await expect.soft(element).toBeVisible();
          console.log('Element is visible on the page.');
      } catch (error) {
          console.error(`Element is not visible within ${timeout} ms.`, error);
          throw new Error(`Expected element to be visible, but it was not.`);
      }
  }

  /**
   * Helper function to assert that a specific element is visible on the page.
   * @param {Locator} element - The Locator of the element to check for visibility.
   * @param {number} timeout - Optional timeout in milliseconds to wait for the element to be visible (default: 5000 ms).
   * @returns {Promise<void>}
   */
  async expectNotToBeVisible(element: Locator, timeout: number = 10000): Promise<void> {
    try {
        // Wait for the element to be visible
        await element.waitFor({ state: 'visible', timeout });
        
        // Assert that the element is visible
        await expect.soft(element).toBeDisabled();
        console.log('Element is Disabled on the page.');
    } catch (error) {
        console.error(`Element is not visible within ${timeout} ms.`, error);
        throw new Error(`Expected element to be Disibled, but it was not.`);
    }
}

  

/**
 * Helper function to assert that a button is either hidden or disabled.
 * @param {Locator} button - The Locator of the button to check.
 * @param {number} timeout - Optional timeout in milliseconds to wait for the button to reach the expected state (default: 5000 ms).
 * @returns {Promise<void>}
 */
async expectButtonToBeHiddenOrDisabled(button: Locator, timeout: number = 5000): Promise<void> {
    try {
        // Wait for the button to be either hidden or disabled
        const isVisible = await button.isVisible({ timeout });
        const isEnabled = await button.isEnabled({ timeout });
        
        // Assert that the button is either hidden or disabled
        if (!isVisible || !isEnabled) {
            console.log('Button is either hidden or disabled as expected.');
        } else {
            throw new Error('Button is visible and enabled, but expected it to be hidden or disabled.');
        }
    } catch (error) {
        console.error(`Button did not reach the expected state within ${timeout} ms.`, error);
        throw error;
    }
}

  
  /**
   * The function asserts that a specified element is not visible on a web page.
   * @param {string} target - The target parameter is a string that represents the locator or selector
   * for the element that you want to check for visibility. It can be a CSS selector, an XPath
   * expression, or any other valid locator that can be used to identify the element on the web page.
   */
  async elementIsNotVisible(target: string): Promise<void> {
    console.log(`Asserts that element ${target} is not visible.`);
    expect(await this.page.locator(target)).toBeHidden();
  }

  async elementHasAttributeAndValue(
    target: string,
    attribute: string,
    attributeVal: string
  ): Promise<void> {
    console.log(
      `Asserts that '${target}' has a specific attribute '${attribute}' with the expected value '${attributeVal}'.`
    );
    //expect(await (target).toHaveAttribute(attribute, attributeVal));
  }


  

/**
 * Helper function to close any open browser contexts.
 * @param {Browser | undefined} browser - The Browser instance to check and close.
 * @returns {Promise<void>}
 */
async closeBrowserIfOpen(browser?: Browser): Promise<void> {
    try {
        if (browser) {
            // Check if there are any open contexts in the browser
            const contexts = browser.contexts();
            if (contexts.length > 0) {
                // Close all contexts
                await Promise.all(contexts.map(context => context.close()));
                console.log('All open browser contexts have been closed.');
            } else {
                console.log('No open browser contexts to close.');
            }

            // Close the browser if it is still open
            await browser.close();
            console.log('Browser closed successfully.');
        } else {
            console.log('No browser instance provided or browser is already closed.');
        }
    } catch (error) {
        console.error('Error while trying to close the browser:', error);
        throw error;
    }
}



/**
 * Helper function to close all open browser contexts.
 * @param {Browser} browser - The Browser instance to close contexts for.
 * @returns {Promise<void>}
 */
async closeAllBrowserContexts(browser: Browser): Promise<void> {
    try {
      const contexts = await browser.contexts();
      if (contexts.length > 1) {
              await contexts[1].close();
              // await contexts[0].close();
      }
        
        // After closing all contexts, close the browser itself
        await browser.close();
        console.log('All browser contexts and the browser have been closed successfully.');
    } catch (error) {
        // console.error('Error while closing browser contexts:', error);
    }
}


  /**
   * The function will setup a listener for alert box, if dialog appears during the test then automatically accepting them.
   * Alert box contains only Ok button
   */
  async acceptAlertBox(): Promise<void> {
    console.log(`Handle Alert Box by clicking on Ok button`);
    this.page.on("dialog", async (dialog) => dialog.dismiss());
  }

  /**
   * The function will setup a listener for Confirm box, if dialog appears during the test then automatically call accept/dismiss method.
   * Confirm box contains Ok/Cancel button
   */
  async acceptConfirmBox(): Promise<void> {
    console.log(`Accept Confirm Box by clicking on Ok button`);
    this.page.on("dialog", async (dialog) => dialog.accept());
  }

  async dismissConfirmBox(): Promise<void> {
    console.log(`Dismiss Confirm Box by clicking on Cancel button`);
    this.page.on("dialog", async (dialog) => dialog.dismiss());
  }

  /**
   * The function will setup a listener for Prompt box, if dialog appears during the test then automatically call accept/dismiss method.
   * Prompt box contains text box where user can enter text and submit (using Ok/Cancel button) it.
   */
  async handlePromptBox(txtVal: string): Promise<void> {
    console.log(`Enter text message in Prompt Box and click on Ok button`);
    this.page.on("dialog", async (dialog) => dialog.accept(txtVal));
  }

  waitForDialogMessage(page: Page) {
    return new Promise((resolve) => {
      page.on("dialog", (dialog) => {
        resolve(dialog.message());
      });
    });
  }

  /**
   * The function will read text message from Alert and return.
   */
  async getAlertText(): Promise<string> {
    console.log(`Read text message from Alert box`);
    let dialogMessage: string;
    dialogMessage = await this.waitForDialogMessage(
      this.page
    ).then.toString();
    console.log(dialogMessage);
    return dialogMessage;
  }

  /**
   * The function `getFrame` takes a frame locator as input and calls a method on the `webPage` object
   * to locate the frame.
   * @param {string} frameLocator - The frameLocator parameter is a string that represents the locator
   * or identifier of the frame you want to retrieve.
   */
  async getFrame(frameLocator: string) {
    return this.page.frameLocator(frameLocator);
  }

  /**
   * The function `getStringFromShadowDom` retrieves the text content from a specified element within
   * the Shadow DOM.
   * @param {string} locator - The `locator` parameter is a string that represents a CSS selector used
   * to locate an element within the Shadow DOM.
   * @returns a Promise that resolves to a string.
   */
  async getStringFromShadowDom(locator: string): Promise<string> {
    return (await this.page.locator(locator).textContent()) as string;
  }

  /**
   * The `downLoadFile` function downloads a file by clicking on a specified locator and waits for the
   * download event to occur.
   * @param {string} locator - The locator parameter is a string that represents the selector used to
   * locate the element on the web page that triggers the file download. It could be an ID, class name,
   * CSS selector, or any other valid selector that can be used with the `this.page.locator()`
   * method to locate the element
   * @param {string} expectedFileName - The expectedFileName parameter is a string that represents the
   * name of the file that is expected to be downloaded.
   * @param {string} savePath - The `savePath` parameter is a string that represents the path where the
   * downloaded file will be saved on the local machine.
   */
  async downLoadFile(
    locator: string,
    expectedFileName: string,
    savePath: string
  ) {
    //start download
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator(locator).click(),
    ]);

    await download.saveAs(savePath);
    return download;
  }

  

  /**
   * The function intercepts a specific route in a browser context, logs the request and response, and
   * continues with the intercepted request.
   * @param {string} interceptRoute - The interceptRoute parameter is a string that represents the route
   * that you want to intercept. It is used to match against the URL of incoming requests and determine
   * if the route should be intercepted.
   */


  /**
   * The function intercepts a specific route and aborts it.
   * @param {string} interceptRoute - The `interceptRoute` parameter is a string that represents the
   * URL pattern that you want to intercept and abort. It is used to match against the URLs of incoming
   * network requests.
   */
 
  /**
   * The function intercepts a specified route and modifies the response data with the provided JSON
   * data.
   * @param {string} interceptRoute - The `interceptRoute` parameter is a string that represents the
   * route that you want to intercept. It is the URL or path that you want to intercept and modify the
   * response for. For example, if you want to intercept the route "/api/data", you would pass
   * "/api/data" as the
   * @param {string} modifiedJsonData - The `modifiedJsonData` parameter is a string representing the
   * modified JSON data that you want to use as the response body for the intercepted route.
   */
  

  async changeElementValue(): Promise<void> {}

  async verifyValueFromUi(): Promise<void> {}

  async getAttribute(locator: string, attributeName: string): Promise<string> {
    const value = await this.page
      .locator(locator)
      .getAttribute(attributeName);
    return value ?? "";
  }

  async getText(locator: string): Promise<string> {
    const value = await this.page.locator(locator).textContent();
    return value ?? "";
  }

  async press(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

}