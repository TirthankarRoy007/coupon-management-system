import { handleSimpleBxGy } from "./handlers/simpleBxGy";
import { handleRepetitionBxGy } from "./handlers/repetitionBxGy";
import { handleMixedBxGy } from "./handlers/mixedBuyBxGy";
import { handleCheapestFreeBxGy } from "./handlers/cheapestFreeBxGy";
import { BxGyDetailsUnion, Cart } from "../../../interface/couponTypes";

export function calculateBxGyDiscount(
  cart: Cart,
  details: BxGyDetailsUnion,
): number {
  switch (details.subtype) {
    case "simple":
      return handleSimpleBxGy(cart, details);

    case "repetition":
      return handleRepetitionBxGy(cart, details);

    case "mixed":
      return handleMixedBxGy(cart, details);

    case "cheapest":
      return handleCheapestFreeBxGy(cart, details);

    default:
      return 0;
  }
}
