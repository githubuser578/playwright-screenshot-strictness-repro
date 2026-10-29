import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.setContent('<button>One</button><button>Two</button>');
});

test('toHaveScreenshot should reject a locator matching two elements', async ({ page }) => {
  const first = page.getByRole('button', { name: 'One', exact: true });
  const second = page.getByRole('button', { name: 'Two', exact: true });
  const combined = first.or(second);

  await expect(combined).toHaveCount(2);
  await expect(first).toHaveScreenshot('button.png');
  await expect(combined).toHaveScreenshot('button.png');
});

test('control: locator.screenshot rejects a locator matching two elements', async ({ page }) => {
  const buttons = page.getByRole('button');

  await expect(buttons).toHaveCount(2);
  await expect(buttons.screenshot()).rejects.toThrow(/strict mode violation/);
});