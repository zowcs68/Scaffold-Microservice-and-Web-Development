export type Product = {
  id: string;
  name: string;
  priceSatang: number;
  available: boolean;
};

const fixtureProducts: readonly Product[] = [
  { id: "notebook", name: "สมุดบันทึก", priceSatang: 12900, available: true },
  { id: "pen", name: "ปากกาสีน้ำเงิน", priceSatang: 2500, available: false },
];

export function getCatalogProducts(available?: boolean): Product[] {
  return fixtureProducts.filter(
    (product) => available === undefined || product.available === available,
  );
}
