import { expect, test } from "@playwright/test";

test("จอกว้างแสดงสินค้า 2 คอลัมน์", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/week2/index.html");
  const count = await page.locator("#catalog").evaluate((el) =>
    getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length
  );
  expect(count).toBe(2);
});

test("จอแคบไม่มีการเลื่อนซ้ายขวา", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/week2/index.html");
  const fits = await page.evaluate(() =>
    document.documentElement.scrollWidth <= document.documentElement.clientWidth
  );
  expect(fits).toBe(true);
});

test("Tab ตามลำดับและเห็นกรอบ focus", async ({ page }) => {
  await page.goto("/week2/index.html");
  const controls = [
    page.getByRole("link", { name: "สินค้า", exact: true }),
    page.getByRole("link", { name: "ตะกร้าตัวอย่าง", exact: true }),
    page.getByLabel("สินค้าที่สนใจ", { exact: true }),
    page.getByLabel("จำนวนที่สนใจ", { exact: true }),
    page.getByRole("button", { name: "ทดลองส่งข้อมูล", exact: true }),
    page.getByRole("button", { name: "คืนค่าเริ่มต้น", exact: true }),
    page.getByRole("link", { name: "เริ่มตัวอย่างใหม่", exact: true }),
  ];
  for (const control of controls) {
    await page.keyboard.press("Tab");
    await expect(control).toBeFocused();
    await expect(control).toHaveCSS("outline-style", "solid");
  }
});
