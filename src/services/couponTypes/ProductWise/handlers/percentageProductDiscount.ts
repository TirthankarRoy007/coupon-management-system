import {
  Cart,
  SingleProductPercentageDetails,
} from "../../../../interface/couponTypes";

export function percentageProductDiscount(
  cart: Cart,
  details: SingleProductPercentageDetails,
): number {
  const productId = details.productId;
  const percent = details.percent;

  let discount = 0;

  for (const item of cart.items) {
    if (item.product_id === productId) {
      discount += (percent / 100) * item.price * item.quantity;
    }
  }

  return discount;
}
