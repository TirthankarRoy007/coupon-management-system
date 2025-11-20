import { FixedDetails } from "../../../../interface/couponTypes";

export function fixedDiscount(cartTotal: number, details: FixedDetails) {
  const threshold =
    typeof details.threshold === "number" ? details.threshold : 0;
  const amount = typeof details.amount === "number" ? details.amount : 0;

  if (cartTotal < threshold) return 0;
  return Math.round(amount * 100) / 100;
}
