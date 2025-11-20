import {
  Cart,
  QuantityBasedProductDetails,
} from "../../../../interface/couponTypes";

export function quantityBasedProductDiscount(
  cart: Cart,
  details: QuantityBasedProductDetails,
): number {
  const productId = details.productId;
  const minQty = details.minQty;
  const percent = details.percent;
  const amount = details.amount;

  const item = cart.items.find((i) => i.product_id === productId);

  if (!item || item.quantity < minQty) return 0;

  let discount = 0;

  if (percent) {
    discount = (percent / 100) * item.price * item.quantity;
  }

  if (amount) {
    discount = amount * item.quantity;
  }

  return discount;
}
