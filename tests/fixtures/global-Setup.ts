import { test as base, chromium, type ChromiumBrowserContext } from '@playwright/test';
const fs = require('fs');
const path = require('path');
const userDirData = path.join(__dirname, '/tests/Data');

export const test = base.extend<{
        context: ChromiumBrowserContext;
        extensionId: string;
}>({
        context: async ({ }, use) => {
                const context: ChromiumBrowserContext = await chromium.launchPersistentContext(userDirData, {
                        headless: false,                        
                });
                await use(context);               
                await context.close();

                

        },




});


export const expect = test.expect;



// import { chromium, ChromiumBrowserContext } from '@playwright/test';

// async function launchPersistentBrowser() {
//         const userDataDir = './path/to/user/data/directory';
//         const context: ChromiumBrowserContext = await chromium.launchPersistentContext(userDataDir, {
//             headless: false, // Set to true if you don't need a GUI
//             // Other options like viewport size, etc.
//         });

//         // Your code to interact with the browser goes here

//         // Optionally, close the browser context when done
//         await context.close();
//     }