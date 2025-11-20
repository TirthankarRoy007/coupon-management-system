import { Cart, SimpleBxGyDetails } from "../../../../interface/couponTypes";

export function handleSimpleBxGy(
  cart: Cart,
  details: SimpleBxGyDetails,
): number {
  let reps = Infinity;

  details.buy.forEach((b: { productId: any; quantity: number }) => {
    const item = cart.items.find(
      (i: { product_id: any }) => i.product_id === b.productId,
    );
    const qty = item ? item.quantity : 0;
    reps = Math.min(reps, Math.floor(qty / b.quantity));
  });

  reps = Math.min(reps, details.repetitionLimit);

  if (reps <= 0) return 0;

  let discount = 0;

  details.get.forEach((g: { productId: number; quantity: number }) => {
    const item = cart.items.find(
      (i: { product_id: number }) => i.product_id === g.productId,
    );
    if (!item) return;

    const freeQty = Math.min(item.quantity, g.quantity * reps);
    discount += freeQty * item.price;
  });

  return discount;
}
