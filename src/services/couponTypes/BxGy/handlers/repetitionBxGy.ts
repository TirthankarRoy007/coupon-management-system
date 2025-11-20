import { Cart, RepetitionBxGyDetails } from "../../../../interface/couponTypes";

export function handleRepetitionBxGy(
  cart: Cart,
  details: RepetitionBxGyDetails,
): number {
  let reps = Infinity;

  for (const b of details.buy) {
    const item = cart.items.find(
      (i: { product_id: number }) => i.product_id === b.productId,
    );
    const qty = item ? item.quantity : 0;
    const possibleReps = Math.floor(qty / b.quantity);
    reps = Math.min(reps, possibleReps);
  }

  reps = Math.min(reps, details.repetitionLimit);

  if (reps <= 0) return 0;

  let discount = 0;

  for (const g of details.get) {
    const item = cart.items.find(
      (i: { product_id: number }) => i.product_id === g.productId,
    );
    if (!item) continue;

    const freeUnits = g.quantity * reps;
    const applicableUnits = Math.min(item.quantity, freeUnits);

    discount += applicableUnits * item.price;
  }

  return discount;
}
