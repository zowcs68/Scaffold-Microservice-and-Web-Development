export type Product = {
  id: string;
  name: string;
  priceSatang: number;
  available: boolean;
};


export function getLineTotalSatang(
  product: Product,
  quantity: number,
): number | null {
  // ตรวจว่า available เป็น true
  if (!product.available) {
    return null;
  }
  // ตรวจว่า quantity เป็นจำนวนเต็มตั้งแต่ 1–5
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 5) {
    return null;
  }
  return product.priceSatang * quantity;
}
