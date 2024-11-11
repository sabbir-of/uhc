import {LoginPage} from "@pages/Login.page";
import { test as baseTest } from "@playwright/test";
// import { test as baseTest } from "tests/base/base"
// import { test as baseTest } from "tests/fixtures/global-Setup"
import WebHelper from "@helper/webHelper";
import testData from "@testData/testData"
import yourPage from "@pages/yourPage.page";
import youMobilePage from "@pages/yourMobile.page";

const test = baseTest.extend<{
    loginPage: LoginPage;
    WebHelper: WebHelper;
    testData: testData;
    yourPage: yourPage;
    youMobilePage: youMobilePage;


}>({
    WebHelper: async ({ page }, use) => {
        await use(new WebHelper(page));
    },
    testData: async ({ page }, use) => {
        await use(new testData(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },


    yourPage: async ({ page }, use) => {
        await use(new yourPage(page));
    },

    youMobilePage: async ({ page }, use) => {
        await use(new youMobilePage((page)))
    }


})
export default test;
export const expect = test.expect;

