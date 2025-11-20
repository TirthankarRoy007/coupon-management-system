import { Cart, MultiProductDetails } from "../../../../interface/couponTypes";

export function multiProductDiscount(
  cart: Cart,
  details: MultiProductDetails,
): number {
  const productIds = details.productIds;
  const percent = details.percent;
  const amount = details.amount;

  let discount = 0;

  for (const item of cart.items) {
    if (!productIds.includes(item.product_id)) continue;

    if (percent) {
      discount += (percent / 100) * item.price * item.quantity;
    }

    if (amount) {
      discount += amount * item.quantity;
    }
  }

  return discount;
}
