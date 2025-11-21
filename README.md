# Coupons Management API

A RESTful API for managing and applying discount coupons for an e-commerce platform, supporting cart-wise, product-wise, and BxGy (Buy X Get Y) coupon types.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Coupon Types](#coupon-types)
- [Use Cases](#use-cases)
- [Implemented Cases](#implemented-cases)
- [Unimplemented Cases](#unimplemented-cases)
- [Assumptions](#assumptions)
- [Limitations](#limitations)
- [Setup Instructions](#setup-instructions)
- [Testing](#testing)

## Overview

This API enables e-commerce platforms to create, manage, and apply various types of discount coupons. The system is designed with extensibility in mind, allowing easy addition of new coupon types in the future.

## Tech Stack

- **Language**: Node.js
- **Framework**: Express
- **Database**: MySQL
- **Testing**: Jest

## API Endpoints

### Coupon Management

- `POST /coupons` - Create a new coupon
- `GET /coupons` - Retrieve all coupons
- `GET /coupons/{id}` - Retrieve a specific coupon
- `PUT /coupons/{id}` - Update a specific coupon
- `DELETE /coupons/{id}` - Delete a specific coupon

### Coupon Application

- `POST /applicable-coupons` - Get all applicable coupons for a cart with discount calculations
- `POST /apply-coupon/{id}` - Apply a specific coupon to a cart

## Coupon Types

### 1. Cart-wise Coupons

Applies discount to the entire cart when total amount exceeds a threshold.

**Example**: 10% off on carts over ₹100

### 2. Product-wise Coupons

Applies discount to specific products in the cart.

**Example**: 20% off on Product A

### 3. BxGy Coupons (Buy X Get Y)

Promotional offers where buying certain products grants free products.

**Example**: Buy 2 products from [X, Y, Z], get 1 product from [A, B, C] free

## Use Cases

### Cart-wise Coupon Cases

#### Implemented Cases:

1. **Basic Percentage Discount**: 10% off on carts over ₹100
2. **Basic Fixed Amount Discount**: ₹50 off on carts over ₹200
3. **Tiered Discounts**: Different discount rates based on cart value ranges
4. **Maximum Discount Cap**: Percentage discount with a maximum discount limit

#### Unimplemented Cases:

1. **Minimum Order Value**: Cart must have a minimum order value to have a discount
2. **Category-based Cart Discount**: Discount applies only if cart contains items from specific categories
3. **User-specific Cart Discounts**: Different discount rates for different user tiers (VIP, regular, etc.)
4. **Time-bound Flash Sales**: Higher discounts during specific time windows
5. **Shipping Cost Integration**: Free shipping or shipping discount on cart threshold
6. **Progressive Discounts**: Increasing discount rate as cart value grows (e.g., 5% for ₹100, 10% for ₹500)

### Product-wise Coupon Cases

#### Implemented Cases:

1. **Single Product Percentage Discount**: 20% off on a specific product
2. **Single Product Fixed Discount**: ₹10 off on a specific product
3. **Multiple Products Discount**: Same discount applicable to multiple products
4. **Quantity-based Product Discount**: Discount applies only if minimum quantity purchased

#### Unimplemented Cases:

1. **Variant-specific Discounts**: Discount on specific product variants (size, color)
2. **Bundle Discounts**: Discount when specific products are bought together
3. **Tiered Product Discounts**: Increasing discount with quantity (1-2 units: 5%, 3-5 units: 10%)
4. **Category-based Discounts**: Discount on all products in a category
5. **New Product Launch Discounts**: Temporary discounts on newly launched products
6. **Clearance Sale Discounts**: Higher discounts on products marked for clearance
7. **Seasonal Product Discounts**: Discounts on seasonal items during off-season

### BxGy Coupon Cases

#### Implemented Cases:

1. **Simple B2G1**: Buy 2 from [X, Y], get 1 from [A, B] free
2. **Repetition Limit**: Coupon can be applied multiple times based on limit
3. **Mixed Products in Buy Array**: Buy any combination from buy array to meet threshold
4. **Cheapest Product Free**: From eligible free products, the cheapest is selected

#### Unimplemented Cases:

1. **Weighted BxGy**: Different products count differently (e.g., premium products count as 2x)
2. **Tiered BxGy**: Buy 2 get 1 free, buy 4 get 3 free (increasing value)
3. **Cross-category BxGy**: Buy from category A, get from category B
4. **BxGy Priority Rules**: When multiple products qualify as "free", define priority rules beyond price
5. **Minimum Value BxGy**: Buy products worth ₹X, get Y free
6. **Same Product BxGy**: Buy 3 of Product X, get 1 of Product X free
7. **BxGy with Exclusions**: Certain products excluded from being "free" items

### General Coupon Constraint Cases

#### Implemented Cases:

1. **Coupon Expiration**: Coupons have start and end dates
2. **Active/Inactive Status**: Coupons can be enabled or disabled
3. **Basic Validation**: Check if cart meets minimum requirements

#### Unimplemented Cases:

1. **Usage Limits**: Per-user usage limits, total usage limits
2. **User Eligibility**: First-time users, specific user segments, email domain restrictions
3. **Stackability Rules**: Whether coupons can be combined with other coupons
4. **Payment Method Restrictions**: Coupon valid only for specific payment methods
5. **Geographic Restrictions**: Coupons valid only in certain regions/countries
6. **Device/Platform Restrictions**: Mobile-only, app-only coupons
7. **Referral Coupons**: Coupons generated through referral programs
8. **Minimum Purchase History**: User must have made X previous purchases
9. **Excluded Products**: Specific products that cannot use coupons
10. **Coupon Codes**: Human-readable coupon codes vs system-generated IDs
11. **Priority/Ranking System**: When multiple coupons apply, which to recommend
12. **Dynamic Discounts**: Discounts that change based on inventory levels
13. **Personalized Coupons**: AI-generated coupons based on user behavior
14. **Cart Abandonment Coupons**: Special coupons triggered by abandoned carts
15. **Time-decay Coupons**: Discount value decreases as expiration approaches

### Edge Cases Considered

#### Implemented:

1. **Empty Cart**: Properly handle empty cart scenarios
2. **Zero/Negative Prices**: Validation to prevent negative final prices
3. **Invalid Coupon IDs**: Proper error handling for non-existent coupons

#### Unimplemented:

1. **Concurrent Cart Updates**: Multiple users applying coupons simultaneously
2. **Floating Point Precision**: Handling decimal precision in discount calculations
3. **Currency Conversion**: Multi-currency support
4. **Tax Calculations**: Discount applied before or after tax
5. **Partial Product Availability**: When free products are out of stock
6. **Coupon Conflicts**: Multiple coupons affecting the same product
7. **Price Changes During Checkout**: Product prices change while coupon is being applied
8. **Extremely Large Carts**: Performance with thousands of items
9. **Malicious Input**: SQL injection, XSS prevention, rate limiting

## Implemented Cases

### 1. Cart-wise Discount

- **Threshold-based percentage discount**: When cart total exceeds threshold, apply percentage discount
- **Threshold-based fixed discount**: When cart total exceeds threshold, apply fixed amount discount
- **Maximum discount cap**: Ensures percentage discounts don't exceed specified maximum amount
- **Validation**: Ensures cart total is calculated correctly before applying discount

### 2. Product-wise Discount

- **Single product discount**: Apply percentage or fixed discount to specific product
- **Quantity calculation**: Discount applied to all quantities of the product in cart
- **Multi-product support**: Same discount can be configured for multiple products
- **Conditional application**: Only applies when specified product is present in cart

### 3. BxGy Coupons

- **Flexible buy/get arrays**: Support for multiple products in both buy and get arrays
- **Repetition logic**: Coupon can be applied multiple times based on repetition limit
- **Smart product selection**: Automatically selects cheapest eligible product as free
- **Quantity validation**: Ensures sufficient quantities in cart to meet buy requirements
- **Mixed product support**: Any combination from buy array counts toward threshold

### 4. Coupon Management

- **CRUD Operations**: Full create, read, update, delete functionality
- **Data persistence**: Coupons stored in database with proper schema
- **Validation**: Input validation for all coupon creation/update operations
- **Error handling**: Comprehensive error messages for invalid operations

## Unimplemented Cases

### High Priority (Would implement with more time)

1. **Coupon Stacking**: Allowing multiple coupons to be applied simultaneously
   - _Reason_: Complex discount precedence and conflict resolution logic required
2. **Per-user Usage Limits**: Track how many times each user has used a coupon
   - _Reason_: Requires user authentication system and usage tracking database schema
3. **Advanced BxGy Scenarios**: Same product in both buy and get arrays, weighted products
   - _Reason_: Complex edge case handling and validation logic

4. **Inventory Integration**: Check if "free" products are in stock
   - _Reason_: Requires integration with separate inventory management system

### Medium Priority

5. **Coupon Codes**: Human-readable promotional codes instead of just IDs
   - _Reason_: Need additional validation, uniqueness checks, and code generation logic

6. **Category-based Discounts**: Discounts on product categories rather than individual products
   - _Reason_: Requires product categorization system and category-level discount logic

7. **Partial Coupon Application**: Apply discounts proportionally when conditions partially met
   - _Reason_: Complex calculation logic and unclear business rules

8. **Advanced Reporting**: Analytics on coupon usage, effectiveness, ROI
   - _Reason_: Time constraint, requires separate analytics module

### Lower Priority

9. **A/B Testing**: Test different coupon variants with user segments
   - _Reason_: Requires experimentation framework and statistical analysis

10. **Dynamic Pricing Integration**: Coupons that interact with real-time pricing
    - _Reason_: Complex integration with pricing engine

## Assumptions

### General Assumptions

1. **Single Currency**: All prices and discounts are in the same currency (INR assumed)
2. **No Tax Calculations**: Discounts are applied to pre-tax amounts
3. **Cart Structure**: Cart contains items with product_id, quantity, and price
4. **Product Price Source**: Prices come from cart payload, not fetched from product database
5. **Synchronous Processing**: All coupon applications are processed synchronously
6. **No User Authentication**: System doesn't validate user identity or permissions
7. **Single Coupon Application**: Only one coupon can be applied at a time via apply-coupon endpoint

### Cart-wise Assumptions

1. **Cart Total Calculation**: Cart total is sum of (quantity × price) for all items
2. **Threshold Comparison**: Discount applies only when cart total strictly exceeds threshold (not equal to)
3. **Rounding**: All discount amounts are rounded to 2 decimal places

### Product-wise Assumptions

1. **Product Identification**: Products are uniquely identified by product_id
2. **All Quantities Eligible**: Discount applies to all quantities of a product in cart
3. **Product Must Exist**: Product must be in cart for product-wise coupon to be applicable

### BxGy Assumptions

1. **Buy Threshold**: Total quantity from buy_products array must meet or exceed required buy quantity
2. **Get Quantity Cap**: Cannot get more free products than available in cart
3. **Repetition Calculation**: Repetitions = floor(available_buy_quantity / required_buy_quantity)
4. **Cheapest Free**: Among eligible get products, cheapest unit price is selected as free
5. **Product Overlap**: A product can appear in both buy and get arrays
6. **No Partial Free Items**: Only complete units can be free (no fractional quantities)
7. **Buy Products Not Discounted**: Only get products are marked as free; buy products retain full price

### Coupon Applicability Assumptions

1. **Active Coupons Only**: Only active, non-expired coupons are considered
2. **All Applicable Returned**: /applicable-coupons returns all coupons that meet conditions
3. **Discount Calculation**: Discount shown is potential discount if that coupon were applied
4. **No Interaction**: Coupons are evaluated independently without considering interactions

### Data Assumptions

1. **Valid Input**: API consumers provide valid, well-formed JSON
2. **Positive Values**: Prices, quantities, discounts, and thresholds are positive numbers
3. **No Inventory Checks**: System doesn't validate product availability
4. **Idempotent IDs**: Coupon IDs are unique and system-generated

## Limitations

### Functional Limitations

1. **No Coupon Stacking**: Cannot apply multiple coupons simultaneously
2. **No User Context**: Cannot enforce per-user usage limits or user-specific eligibility
3. **No Inventory Validation**: Doesn't check if free/discounted products are in stock
4. **No Category Support**: Cannot apply discounts at category or brand level
5. **No Product Variants**: Cannot handle size, color, or other variant-specific discounts
6. **Limited BxGy Flexibility**: Cannot handle complex scenarios like "buy X, get Y% off"
7. **No Coupon Prioritization**: No built-in logic to suggest "best" coupon to user

### Technical Limitations

1. **No Caching**: Every request queries database; no caching mechanism implemented
2. **No Rate Limiting**: API can be overwhelmed by excessive requests
3. **Limited Error Messages**: Error messages could be more descriptive
4. **No Transaction Support**: Cart updates are not atomic; partial failures possible
5. **Scalability**: Not optimized for high-concurrency scenarios
6. **No API Versioning**: Breaking changes would affect all clients

### Validation Limitations

1. **Weak Input Validation**: Limited validation on discount percentages (could exceed 100%)
2. **No Business Rule Validation**: Doesn't prevent illogical coupon configurations
3. **No Circular Dependency Check**: For complex coupon relationships
4. **No Price Sanity Checks**: Doesn't validate if product prices are reasonable

### Data Limitations

1. **No Soft Deletes**: Deleted coupons are permanently removed
2. **No Version History**: Cannot track coupon configuration changes over time
3. **No Archival**: Old/expired coupons remain in active database
4. **Schema Rigidity**: Adding new coupon types requires code changes

### Performance Limitations

1. **Linear Search**: Applicable coupons found through linear iteration
2. **No Batch Operations**: Cannot create/update multiple coupons at once
3. **No Pagination**: GET /coupons returns all coupons (problematic with large datasets)
4. **Calculation Overhead**: Discount calculations performed on every request

### Security Limitations

1. **No Authentication**: Anyone can create, modify, or delete coupons
2. **No Authorization**: No role-based access control
3. **No Input Sanitization**: Vulnerable to injection attacks
4. **No Rate Limiting**: Susceptible to DDoS attacks
5. **No Data Encryption**: Sensitive coupon data not encrypted at rest

## Setup Instructions

### Prerequisites

```bash
# List required software and versions
- Node.js >= 14.x
- Database (MySQL)
- npm (package manager)
```

### Installation

```bash
# Clone the repository
git clone https://github.com/TirthankarRoy007/coupon-management-system.git
cd coupon-management-system

# Install dependencies
npm install

# Start the server
npm start
```

### Environment Variables

```
DATABASE_URL=<your-database-url>
PORT=3000
NODE_ENV=development
```

## Testing

```bash
# Run all tests
npm test

```

### Test Coverage

- Unit tests for coupon creation and validation
- Integration tests for API endpoints
- Edge case testing for discount calculations

## API Usage Examples

### Create Cart-wise Coupon

```bash
curl -X POST http://localhost:3000/coupons \
  -H "Content-Type: application/json" \
  -d '{
    "type": "cart-wise",
    "details": {
      "threshold": 100,
      "discount": 10
    }
  }'
```

### Get Applicable Coupons

```bash
curl -X POST http://localhost:3000/applicable-coupons \
  -H "Content-Type: application/json" \
  -d '{
    "cart": {
      "items": [
        {"product_id": 1, "quantity": 6, "price": 50},
        {"product_id": 2, "quantity": 3, "price": 30}
      ]
    }
  }'
```

### Apply Coupon

```bash
curl -X POST http://localhost:3000/apply-coupon/1 \
  -H "Content-Type: application/json" \
  -d '{
    "cart": {
      "items": [
        {"product_id": 1, "quantity": 6, "price": 50},
        {"product_id": 2, "quantity": 3, "price": 30}
      ]
    }
  }'
```

## Future Enhancements

1. **Advanced Coupon Types**: Subscription discounts, loyalty points integration
2. **Machine Learning**: Personalized coupon recommendations
3. **Real-time Analytics**: Live dashboards for coupon performance
4. **Multi-tenancy**: Support for multiple merchants/stores
5. **GraphQL API**: In addition to REST for flexible querying
6. **Microservices Architecture**: Separate services for coupon management, application, and analytics
