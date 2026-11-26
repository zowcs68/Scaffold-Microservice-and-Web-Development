import { expect, test } from "bun:test";
import { app } from "../src/app";

const allProducts = [
  { id: "notebook", name: "สมุดบันทึก", priceSatang: 12900, available: true },
  { id: "pen", name: "ปากกาสีน้ำเงิน", priceSatang: 2500, available: false },
];

async function requestCatalog(query = "") {
  return app.handle(
    new Request("http://localhost/api/v1/catalog/products" + query),
  );
}

test("คืน fixture ทั้งหมดเมื่อไม่ส่ง available", async () => {
  const response = await requestCatalog();
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ data: allProducts });
});

test("กรอง available=true", async () => {
  const response = await requestCatalog("?available=true");
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ data: [allProducts[0]] });
});

test("กรอง available=false", async () => {
  const response = await requestCatalog("?available=false");
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ data: [allProducts[1]] });
});
test("ปฏิเสธ available=yes ด้วย error body ตามข้อเสนอ", async () => {
  const response = await requestCatalog("?available=yes");
  expect(response.status).toBe(422);
  expect(await response.json()).toEqual({
    error: {
      code: "VALIDATION_ERROR",
      message: "available must be true or false",
      details: [{ field: "available", reason: "invalid_value" }],
    },
  });

  const unchanged = await requestCatalog();
  expect(await unchanged.json()).toEqual({ data: allProducts });
});

test("ปฏิเสธ available= ด้วย status และ body เดียวกัน", async () => {
  const response = await requestCatalog("?available=");
  expect(response.status).toBe(422);
  expect(await response.json()).toEqual({
    error: {
      code: "VALIDATION_ERROR",
      message: "available must be true or false",
      details: [{ field: "available", reason: "invalid_value" }],
    },
  });
});
