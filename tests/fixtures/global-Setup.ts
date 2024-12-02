import { chromium } from 'playwright';

async function generateStorageState(role: string, username: string, password: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the login page
  await page.goto('https://example.com/login');

  // Perform login
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  
  // Wait for navigation or page to load
  await page.waitForNavigation();

  // Save the storage state
  await page.context().storageState({ path: `storageStates/${role}.json` });

  await browser.close();
}

// Generate storage states for multiple roles
(async () => {
  await generateStorageState('RM', 'rm_user', 'rm_password');
  await generateStorageState('CLO', 'clo_user', 'clo_password');
  await generateStorageState('Credit', 'credit_user', 'credit_password');
  await generateStorageState('Admin', 'admin_user', 'admin_password');
})();
