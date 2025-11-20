import { percentageProductDiscount } from "./handlers/percentageProductDiscount";
import { fixedProductDiscount } from "./handlers/fixedProductDiscount";
import { multiProductDiscount } from "./handlers/multiProductDiscount";
import { quantityBasedProductDiscount } from "./handlers/quantityBasedProductDiscount";
import { Cart, ProductWiseDetails } from "../../../interface/couponTypes";

export function calculateProductWiseDiscount(
  cart: Cart,
  details: ProductWiseDetails,
): number {
  switch (details.subtype) {
    case "percentage":
      return percentageProductDiscount(cart, details);

    case "fixed":
      return fixedProductDiscount(cart, details);

    case "multi":
      return multiProductDiscount(cart, details);

    case "quantity-based":
      return quantityBasedProductDiscount(cart, details);

    default:
      return 0;
  }
}
