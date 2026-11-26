import { expect, test } from "@playwright/test";

test("label focuses its number control", async ({ page }) => {
 await page.goto("/week2/index.html");
 await expect(page.getByLabel("จำนวนที่สนใจ", { exact: true })).toBeVisible();
 await page.locator('label[for="quantity"]').click();
 await expect(page.getByLabel("จำนวนที่สนใจ", { exact: true })).toBeFocused();
});

test("invalid quantity blocks submission", async ({ page }) => {
 await page.goto("/week2/index.html");
 await page.getByLabel("สินค้าที่สนใจ", { exact: true }).selectOption("notebook");
 await page.getByLabel("จำนวนที่สนใจ", { exact: true }).fill("0");
 await page.getByRole("button", { name: "ทดลองส่งข้อมูล", exact: true }).click();
 await expect(page).toHaveURL("http://127.0.0.1:4173/week2/index.html");
 await expect(page.getByLabel("จำนวนที่สนใจ", { exact: true })).toHaveValue("0");
});

test("valid form carries name and value in its URL", async ({ page }) => {
 await page.goto("/week2/index.html");
 await page.getByLabel("สินค้าที่สนใจ", { exact: true }).selectOption("notebook");
 await page.getByLabel("จำนวนที่สนใจ", { exact: true }).fill("2");
 await page.getByRole("button", { name: "ทดลองส่งข้อมูล", exact: true }).click();
 await expect(page).toHaveURL(
   "http://127.0.0.1:4173/week2/index.html?productId=notebook&quantity=2",
 );
 await expect(page.getByRole("heading", { name: "รายการสินค้า", exact: true })).toBeVisible();
});
