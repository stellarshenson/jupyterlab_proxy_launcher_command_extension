import { expect, test } from '@jupyterlab/galata';

/**
 * Don't load JupyterLab webpage before running the tests.
 * This is required to ensure we capture all log messages.
 */
test.use({ autoGoto: false });

test('should emit an activation console message', async ({ page }) => {
  const logs: string[] = [];

  page.on('console', message => {
    logs.push(message.text());
  });

  await page.goto();

  expect(
    logs.filter(
      s =>
        s ===
        'JupyterLab extension @stellarshenson/jupyterlab-proxy-launcher-command-extension is activated!'
    )
  ).toHaveLength(1);
});

test('should show command in command palette', async ({ page }) => {
  await page.goto();

  // Open command palette
  await page.keyboard.press('Control+Shift+C');

  // Wait for command palette to appear
  await page.waitForSelector('.lm-CommandPalette-input');

  // Search for proxy launcher command
  await page.fill('.lm-CommandPalette-input', 'Open Proxy Launcher');

  // Verify command appears in results
  const commandItem = page.locator(
    '.lm-CommandPalette-item:has-text("Open Proxy Launcher")'
  );
  await expect(commandItem).toBeVisible();
});

test('should open proxy launcher dialog', async ({ page }) => {
  await page.goto();

  // Open command palette and execute command
  await page.keyboard.press('Control+Shift+C');
  await page.waitForSelector('.lm-CommandPalette-input');
  await page.fill('.lm-CommandPalette-input', 'Open Proxy Launcher');
  await page.click('.lm-CommandPalette-item:has-text("Open Proxy Launcher")');

  // Wait for dialog to appear
  const dialog = page.locator('.jp-Dialog');
  await expect(dialog).toBeVisible();

  // Verify dialog title
  await expect(dialog.locator('.jp-Dialog-header')).toContainText(
    'Proxy Launcher'
  );

  // Verify port input exists
  const portInput = dialog.locator('input[type="number"]');
  await expect(portInput).toBeVisible();

  // Verify path input exists
  const pathInput = dialog.locator('input[type="text"]');
  await expect(pathInput).toBeVisible();

  // Verify checkbox exists
  const checkbox = dialog.locator('input[type="checkbox"]');
  await expect(checkbox).toBeVisible();

  // Verify helper text exists
  await expect(dialog.locator('text=e.g., 8501')).toBeVisible();
  await expect(dialog.locator('text=e.g., /api/docs')).toBeVisible();
  await expect(
    dialog.locator('text=Connect to a service running on the specified port')
  ).toBeVisible();

  // Close dialog
  await dialog.locator('button:has-text("Cancel")').click();
  await expect(dialog).not.toBeVisible();
});

test('should validate port input', async ({ page }) => {
  await page.goto();

  // Open dialog via keyboard shortcut
  await page.keyboard.press('Control+Shift+P');

  // Wait for dialog
  const dialog = page.locator('.jp-Dialog');
  await expect(dialog).toBeVisible();

  // Try to submit without port
  await dialog.locator('button:has-text("Open")').click();

  // Verify validation error dialog appears
  const errorDialog = page.locator('.jp-Dialog:has-text("Invalid Port")');
  await expect(errorDialog).toBeVisible();

  // Close error dialog
  await errorDialog.locator('button:has-text("OK")').click();
});

test('should take a port typed right after the shortcut and open a JupyterLab tab', async ({
  page
}) => {
  await page.goto();

  await page.keyboard.press('Control+Shift+P');
  const dialog = page.locator('.jp-Dialog');
  await expect(dialog.locator('input[type="number"]')).toBeFocused();

  await page.keyboard.type('8501');
  await page.keyboard.press('Enter');

  // jp-IFrame keeps splitter and tab drags working across the iframe
  await expect(
    page.locator('.jp-ProxyLauncher-iframe.jp-IFrame > iframe')
  ).toHaveAttribute('src', /\/proxy\/8501\/$/);
  await expect(
    page.locator('.lm-DockPanel-tabBar .lm-TabBar-tabLabel', {
      hasText: 'Proxy :8501'
    })
  ).toBeVisible();
});

test('should pre-fill the dialog from command arguments', async ({ page }) => {
  await page.goto();

  // Not awaited: the command resolves when the dialog closes
  await page.evaluate(() => {
    void (window as any).jupyterapp.commands.execute('proxy-launcher:open', {
      default_port: 8501,
      default_path: 'api/docs',
      title: 'Streamlit App'
    });
  });

  const dialog = page.locator('.jp-Dialog');
  await expect(dialog.locator('input[type="number"]')).toHaveValue('8501');
  await expect(dialog.locator('input[type="text"]')).toHaveValue('api/docs');
  await expect(dialog.locator('input[type="checkbox"]')).not.toBeChecked();
  await dialog.locator('button:has-text("Open")').click();

  await expect(
    page.locator('.jp-ProxyLauncher-iframe > iframe')
  ).toHaveAttribute('src', /\/proxy\/8501\/api\/docs$/);
  await expect(
    page.locator('.lm-DockPanel-tabBar .lm-TabBar-tabLabel', {
      hasText: 'Streamlit App'
    })
  ).toBeVisible();
});

test('should open the proxied service in a new browser tab', async ({
  page
}) => {
  await page.goto();

  // Record window.open: the test asserts the address, not the proxied page
  await page.evaluate(() => {
    window.open = (url, target) => {
      (window as any).proxyLauncherOpened = [String(url), target];
      return null;
    };
    void (window as any).jupyterapp.commands.execute('proxy-launcher:open', {
      default_port: 8501,
      default_newBrowserTab: true
    });
  });

  const dialog = page.locator('.jp-Dialog');
  await expect(dialog.locator('input[type="checkbox"]')).toBeChecked();

  await dialog.locator('button:has-text("Open")').click();
  await expect(dialog).not.toBeVisible();

  const [url, target] = await page.evaluate(
    () => (window as any).proxyLauncherOpened
  );
  expect(url).toMatch(/\/proxy\/8501\/$/);
  expect(target).toBe('_blank');
  await expect(page.locator('.jp-ProxyLauncher-iframe')).toHaveCount(0);
});
