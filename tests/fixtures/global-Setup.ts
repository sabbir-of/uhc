import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { projects } = config;

  for (const project of projects) {
    const role = project.name; // Assuming role matches project name (e.g., 'Admin', 'Credit')
    const storageStatePath = `storage/${role}.json`;

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Perform login for each role
    switch (role) {
      case 'Admin':
        await page.goto('https://your-app.com/login');
        await page.fill('input[name="username"]', 'admin_user');
        await page.fill('input[name="password"]', 'admin_password');
        break;

      case 'Credit':
        await page.goto('https://your-app.com/login');
        await page.fill('input[name="username"]', 'credit_user');
        await page.fill('input[name="password"]', 'credit_password');
        break;

      case 'RM':
        await page.goto('https://your-app.com/login');
        await page.fill('input[name="username"]', 'rm_user');
        await page.fill('input[name="password"]', 'rm_password');
        break;

      case 'Loan_Admin':
        await page.goto('https://your-app.com/login');
        await page.fill('input[name="username"]', 'loan_admin_user');
        await page.fill('input[name="password"]', 'loan_admin_password');
        break;

      case 'CLO':
        await page.goto('https://your-app.com/login');
        await page.fill('input[name="username"]', 'clo_user');
        await page.fill('input[name="password"]', 'clo_password');
        break;

      default:
        console.error(`No login flow defined for role: ${role}`);
        continue;
    }

    // Submit login and wait for confirmation
    await page.click('button[type="submit"]');
    await page.waitForURL('https://your-app.com/dashboard'); // Adjust based on successful login redirect

    // Save the storage state for the role
    await context.storageState({ path: storageStatePath });

    await browser.close();
  }
}

export default globalSetup;
