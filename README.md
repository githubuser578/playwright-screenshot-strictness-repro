# Playwright screenshot strictness reproduction

Minimal reproduction for a suspected Playwright 1.64.1 bug: a screenshot
assertion appears to pass when its locator matches two elements.

## Run

Requires a Node.js version supported by Playwright.

```sh
npm ci
npx playwright install chromium
npm test -- --update-snapshots
npm test
```

On Linux, use `npx playwright install --with-deps chromium` if browser system
dependencies are missing. Generate snapshots on the machine running the test;
baseline names include the platform.

## Expected

The first test should fail with a strict-mode violation at
`expect(combined).toHaveScreenshot('button.png')`, because `combined` matches
two buttons. The preceding assertion creates or verifies a valid baseline using
only the first button.

The control test should pass: `locator.screenshot()` rejects the same kind of
multi-element locator with a strict-mode violation.

## Observed

Verified on macOS with Playwright 1.64.1: both commands report `2 passed`.
The multi-element screenshot assertion incorrectly passes, while the control
confirms that `locator.screenshot()` throws a strict-mode violation.

No application server, framework, or external website is involved.