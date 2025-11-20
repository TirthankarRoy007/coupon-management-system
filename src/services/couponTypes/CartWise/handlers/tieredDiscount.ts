import { TieredDetails } from "../../../../interface/couponTypes";

export function tieredDiscount(cartTotal: number, details: TieredDetails) {
  const tiers: Array<{ min: number; percent: number }> = Array.isArray(
    details.tiers,
  )
    ? details.tiers
    : [];

  if (tiers.length === 0) return 0;

  let appliedPercent = 0;
  for (const t of tiers) {
    if (cartTotal >= (t.min ?? 0)) {
      appliedPercent = Math.max(appliedPercent, t.percent ?? 0);
    }
  }

  const discount = (appliedPercent / 100) * cartTotal;
  return Math.round(discount * 100) / 100;
}
