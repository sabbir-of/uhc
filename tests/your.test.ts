import test, { expect } from "@fixtures/basePages";
import { webHelper } from "@helper/webHelper";
import { LoginPage } from "@pages/Login.page";
import * as data from "@testData/data.json";
const clipboard = require("clipboardy");
import ENV from "@utils/env";





test.only('Login with valid user load page auth @auth', async ({ page, loginPage }) => {
    // Initialize a helper instance for web interactions, specifying the page and key value for the page
const helper = new webHelper(page, 'keyPageValue');    

// Define the storage state path to persist the session state for 'admin' user
const storageStatePath = './auth/admin.json';

// Step 1: Navigate to the login page
    // Use the helper function to navigate to the base URL defined in the environment configuration
    await page.goto(ENV.BASE_URL, { waitUntil: 'networkidle' });


// Step 2: Login as a superuser and load the page auth
    // Perform login using the superuser credentials from environment variables.
    // This action will save the session state to the specified storage state path
    await loginPage.loginSuperUser(ENV.USERNAME, ENV.PASSWORD, storageStatePath);    


   
});




