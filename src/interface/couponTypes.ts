export interface CartItem {
  product_id: number;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
}

export interface PercentageDetails {
  subtype: "percentage";
  threshold: number;
  percent: number;
}

export interface FixedDetails {
  subtype: "fixed";
  threshold: number;
  amount: number;
}

export interface TierEntry {
  min: number;
  percent: number;
}

export interface TieredDetails {
  subtype: "tiered";
  tiers: TierEntry[];
}

export interface MaxCapDetails {
  subtype: "max-cap";
  threshold: number;
  percent: number;
  max: number;
}

export type CartWiseDetails =
  | PercentageDetails
  | FixedDetails
  | TieredDetails
  | MaxCapDetails;

export type ProductWiseSubtype =
  | "percentage"
  | "fixed"
  | "multi"
  | "quantity-based";

export interface BaseProductWiseDetails {
  subtype: ProductWiseSubtype;
}

export interface SingleProductPercentageDetails extends BaseProductWiseDetails {
  subtype: "percentage";
  productId: number;
  percent: number;
}

export interface SingleProductFixedDetails extends BaseProductWiseDetails {
  subtype: "fixed";
  productId: number;
  amount: number;
}

export interface MultiProductDetails extends BaseProductWiseDetails {
  subtype: "multi";
  productIds: number[];
  percent?: number;
  amount?: number;
}

export interface QuantityBasedProductDetails extends BaseProductWiseDetails {
  subtype: "quantity-based";
  productId: number;
  minQty: number;
  percent?: number;
  amount?: number;
}

export type ProductWiseDetails =
  | SingleProductPercentageDetails
  | SingleProductFixedDetails
  | MultiProductDetails
  | QuantityBasedProductDetails;

export type BxGySubtype = "simple" | "repetition" | "mixed" | "cheapest";

export interface BuyEntry {
  productId: number;
  quantity: number;
}

export interface GetEntry {
  productId: number;
  quantity: number;
}

export interface BaseBxGyDetails {
  subtype: BxGySubtype;
  buy: BuyEntry[];
  get: GetEntry[];
  repetitionLimit: number;
}

export interface SimpleBxGyDetails extends BaseBxGyDetails {
  subtype: "simple";
}

export interface RepetitionBxGyDetails extends BaseBxGyDetails {
  subtype: "repetition";
}

export interface MixedBxGyDetails extends BaseBxGyDetails {
  subtype: "mixed";
}

export interface CheapestBxGyDetails extends BaseBxGyDetails {
  subtype: "cheapest";
}

export type BxGyDetailsUnion =
  | SimpleBxGyDetails
  | RepetitionBxGyDetails
  | MixedBxGyDetails
  | CheapestBxGyDetails;

export interface CouponAttributes {
  id: number;
  code: string;
  type: "cart-wise" | "product-wise" | "bxgy";

  details: CartWiseDetails | ProductWiseDetails | BxGyDetailsUnion;

  conditions?: {
    minCartValue?: number;
    startDate?: string;
    endDate?: string;
    stackable?: boolean;
  };

  active: boolean;
  usageLimitGlobal?: number;
  usageLimitPerUser?: number;
}
