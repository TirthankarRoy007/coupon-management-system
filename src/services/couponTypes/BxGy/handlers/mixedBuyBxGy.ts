import { Cart, MixedBxGyDetails } from "../../../../interface/couponTypes";

export function handleMixedBxGy(cart: Cart, details: MixedBxGyDetails): number {
  let totalBuyQty = 0;

  for (const b of details.buy) {
    const item = cart.items.find(
      (i: { product_id: number }) => i.product_id === b.productId,
    );
    if (item) totalBuyQty += item.quantity;
  }

  const requiredBuyQty = details.buy.reduce(
    (s: number, b: { quantity: number }) => s + b.quantity,
    0,
  );

  const reps = Math.min(
    Math.floor(totalBuyQty / requiredBuyQty),
    details.repetitionLimit,
  );

  if (reps <= 0) return 0;

  let discount = 0;

  for (const g of details.get) {
    const item = cart.items.find(
      (i: { product_id: number }) => i.product_id === g.productId,
    );
    if (item) {
      const freeQty = Math.min(item.quantity, g.quantity * reps);
      discount += freeQty * item.price;
    }
  }

  return discount;
}
