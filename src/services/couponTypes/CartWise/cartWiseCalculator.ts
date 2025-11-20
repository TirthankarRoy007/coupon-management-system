import { percentageDiscount } from "./handlers/percentDiscount";
import { fixedDiscount } from "./handlers/fixedDiscount";
import { tieredDiscount } from "./handlers/tieredDiscount";
import { maxCapDiscount } from "./handlers/maxCapDiscount";
import {
  CartWiseDetails,
  PercentageDetails,
  FixedDetails,
  TieredDetails,
  MaxCapDetails,
} from "../../../interface/couponTypes";

export function calculateCartWiseDiscount(
  cartTotal: number,
  details: CartWiseDetails,
) {
  const subtype: string = (details && details.subtype) || "percentage";

  switch (subtype) {
    case "percentage":
      return percentageDiscount(cartTotal, details as PercentageDetails);
    case "fixed":
      return fixedDiscount(cartTotal, details as FixedDetails);
    case "tiered":
      return tieredDiscount(cartTotal, details as TieredDetails);
    case "max-cap":
      return maxCapDiscount(cartTotal, details as MaxCapDetails);
    default:
      return 0;
  }
}
