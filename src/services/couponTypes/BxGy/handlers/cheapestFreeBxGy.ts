import { Cart, CheapestBxGyDetails } from "../../../../interface/couponTypes";

export function handleCheapestFreeBxGy(
  cart: Cart,
  details: CheapestBxGyDetails,
): number {
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

  let reps = Math.floor(totalBuyQty / requiredBuyQty);
  reps = Math.min(reps, details.repetitionLimit);

  if (reps <= 0) return 0;

  const eligibleGetItems = cart.items.filter((i: { product_id: number }) =>
    details.get.some(
      (g: { productId: number }) => g.productId === i.product_id,
    ),
  );

  if (eligibleGetItems.length === 0) return 0;

  eligibleGetItems.sort(
    (a: { price: number }, b: { price: number }) => a.price - b.price,
  );

  const cheapest = eligibleGetItems[0];
  const getRule = details.get.find(
    (g: { productId: number }) => g.productId === cheapest.product_id,
  )!;

  const freeUnits = getRule.quantity * reps;
  const applicableFree = Math.min(freeUnits, cheapest.quantity);

  return applicableFree * cheapest.price;
}
