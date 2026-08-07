# Product Requirements Document (PRD)

## Feature

**E-Commerce Product Multi-Filter Sidebar**

> Based on the uploaded assessment document.
> fileciteturn0file0L2-L30

## Overview

Implement a responsive e-commerce browsing experience with: - Sticky
filter sidebar - Dynamic product grid - Instant filtering - Live
sorting - Empty state with reset

## Objective

Users should be able to filter products by: - Category (multi-select) -
Price range - Minimum star rating

Results update instantly without an Apply button.

------------------------------------------------------------------------

# Functional Requirements

## Category Filter

-   Checkbox group
-   Multi-select
-   OR logic between categories

## Price Filter

-   Dual-handle slider
-   Inclusive min/max range

## Rating Filter

-   Radio buttons (1--5 stars)
-   Filter: `rating >= selected`

## Sort

Options: - Default - Price: Low → High - Price: High → Low - Top Rated -
Newest (optional)

Sorting is applied **after filtering**.

## Product Grid

Each product card shows: - Image - Title - Price - Rating

## Empty State

If no products match:

``` text
😔 No items match your criteria.

[ Reset Filters ]
```

------------------------------------------------------------------------

# Filter State

``` ts
type FilterState = {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  rating: number | null;
  sortBy: string;
}
```

------------------------------------------------------------------------

# Workflows

## Initial Load

``` text
Load Products
      ↓
Initialize Filters
      ↓
Display All Products
```

## Category Change

``` text
Checkbox Click
      ↓
Update State
      ↓
Filter Products
      ↓
Sort
      ↓
Render
```

## Price Change

``` text
Slider Change
      ↓
Update State
      ↓
Filter
      ↓
Sort
      ↓
Render
```

## Rating Change

``` text
Select Rating
      ↓
Update State
      ↓
Filter
      ↓
Sort
      ↓
Render
```

## Sort Change

``` text
Dropdown Change
      ↓
Sort Current Results
      ↓
Render
```

## Reset

``` text
Reset Filters
      ↓
Default State
      ↓
Display All Products
```

------------------------------------------------------------------------

# Backend Flow

``` text
Client Request
      ↓
GET /products
      ↓
Apply Category Filter
      ↓
Apply Price Filter
      ↓
Apply Rating Filter
      ↓
Sort
      ↓
Return Results
```

------------------------------------------------------------------------

# Filtering Pipeline

``` text
Products
   ↓
Category Filter
   ↓
Price Filter
   ↓
Rating Filter
   ↓
Sorting
   ↓
Return
```

------------------------------------------------------------------------

# API

``` http
GET /products?categories=electronics,footwear&minPrice=100&maxPrice=2000&rating=4&sort=priceAsc
```

Response:

``` json
[
  {
    "id": 1,
    "name": "Nike Shoes",
    "category": "Footwear",
    "price": 2999,
    "rating": 4.5,
    "image": "..."
  }
]
```

------------------------------------------------------------------------

# Component Structure

``` text
App
├── FilterSidebar
│   ├── CategoryFilter
│   ├── PriceSlider
│   └── RatingFilter
├── SortDropdown
├── ProductGrid
│   └── ProductCard
└── EmptyState
```

------------------------------------------------------------------------

# Edge Cases

-   No category selected → show all
-   Rating not selected → ignore rating filter
-   Min == Max → exact price match
-   No products → Empty State
-   Reset → full inventory

------------------------------------------------------------------------

# Implementation Order

1.  Product Card
2.  Product Grid
3.  Sidebar Layout
4.  Category Filter
5.  Price Slider
6.  Rating Filter
7.  Shared Filter State
8.  Backend Filtering API
9.  Frontend Integration
10. Sort Dropdown
11. Empty State
12. Reset Filters
13. Responsive Polish
