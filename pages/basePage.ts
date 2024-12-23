import { Page, test, expect } from '@playwright/test';
import { AnnotationType } from '../utils/annotations/AnnotationType';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';
import ENV from '@utils/env';

export class BasePage {

    public stepDescription = '';

    protected isAnnotationEnabled = true;
    protected annotationHelper: AnnotationHelper;

    constructor(protected readonly page: Page, public readonly keyPage: string) {
        this.annotationHelper = new AnnotationHelper(this.page, this.keyPage);
    }

    /**
     * Go to the base Address
     */
    public async goTo() {
        const url = ENV.BASE_URL
        this.annotationHelper.addAnnotation(AnnotationType.GoTo, 'Go to the page: "' + url + '"');
        await this.page.goto(url);
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
     * Press key in the page
     * @param key Key to press. Examples are: F1 - F12, Digit0- Digit9, KeyA- KeyZ, BackQuote, Minus, 
     * Equal, Backslash, Backspace, Tab, Delete, Escape, ArrowDown, End, Enter, Home, Insert, PageDown, 
     * PageUp, ArrowRight, ArrowUp, etc
     */
    async press(key: string) {
        await this.page.keyboard.press(key);
    }

    /**
     * Check that 2 values are equal
     * @param expected Value expected
     * @param actual Actual Value
     * @param assertMessage  Message to assert
     */
    public AssertEqual(expected: string, actual: string, assertMessage: string) {
        this.annotationHelper.addAnnotation(AnnotationType.Assert, assertMessage);
        expect(expected, assertMessage).toEqual(actual);
    }

    public AssertArrayEqual(expected: string[], actual: string[], assertMessage: string) {
        this.annotationHelper.addAnnotation(AnnotationType.Assert, assertMessage);
        expect(expected, assertMessage).toEqual(actual);
    }
}









import { Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';

Before(async function ({ pickle }) {
  // Set up the browser and context based on role
  this.browser = await chromium.launch(); // Launch a new browser instance
  const role = pickle.name.match(/as "(.*?)"/)?.[1]; // Extract role from the scenario name
  this.context = await this.browser.newContext({ storageState: `storage/${role}.json` });
  this.page = await this.context.newPage(); // Create a new page for the test scenario
  console.log(`Set up browser for role: ${role}`);
});

After(async function () {
  // Cleanup after scenario
  await this.page.close();
  await this.context.close();
  await this.browser.close(); // Close browser after the test
});
