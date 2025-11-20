import { MaxCapDetails } from "../../../../interface/couponTypes";

export function maxCapDiscount(cartTotal: number, details: MaxCapDetails) {
  const threshold =
    typeof details.threshold === "number" ? details.threshold : 0;
  const percent = typeof details.percent === "number" ? details.percent : 0;
  const max =
    typeof details.max === "number" ? details.max : Number.POSITIVE_INFINITY;

  if (cartTotal < threshold) return 0;

  const raw = (percent / 100) * cartTotal;
  const discount = Math.min(raw, max);
  return Math.round(discount * 100) / 100;
}
