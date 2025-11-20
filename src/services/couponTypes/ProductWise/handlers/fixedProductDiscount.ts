import {
  Cart,
  SingleProductFixedDetails,
} from "../../../../interface/couponTypes";

export function fixedProductDiscount(
  cart: Cart,
  details: SingleProductFixedDetails,
): number {
  const productId = details.productId;
  const amount = details.amount;

  let discount = 0;

  for (const item of cart.items) {
    if (item.product_id === productId) {
      discount += amount * item.quantity;
    }
  }

  return discount;
}
