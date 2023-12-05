import { test, expect } from "@playwright/test";

test("homepage has title and link to home page", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Ion/);

  // create a locator
  const anchor = page.locator("a[href='/']");

  // Expect an attribute "to be strictly equal" to the value.
  await expect(anchor).toHaveAttribute("target", "_self");
});
