import { PercentageDetails } from "../../../../interface/couponTypes";

export function percentageDiscount(
  cartTotal: number,
  details: PercentageDetails,
) {
  const threshold =
    typeof details.threshold === "number" ? details.threshold : 0;
  const percent = typeof details.percent === "number" ? details.percent : 0;

  if (cartTotal < threshold) return 0;
  const discount = (percent / 100) * cartTotal;
  return Math.round(discount * 100) / 100;
}
