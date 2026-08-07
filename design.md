# Design Document — E-Commerce Product Multi-Filter Sidebar

## 1. Overview
A high-traffic marketplace browsing interface where users filter a product catalog by
**category**, **price range**, and **minimum star rating** simultaneously, with instant
(no-submit-button) updates, plus a sort control. All filtering/sorting logic lives on the
server; the frontend only renders state and captures interactions.

---

## 2. Tech Stack
- **Frontend:** React (Vite) + plain CSS / Tailwind
- **Backend:** Node.js + Express
- **Data store:** In-memory JSON array of products (seeded at server start) — no DB
  needed for the assessment scope, but the service layer is written so it can be swapped
  for a real DB later without touching controllers.
- **HTTP client:** fetch / axios
- **State sync:** debounced query on filter/sort state change → GET request

---

## 3. High-Level Architecture

```
┌─────────────────────┐        GET /api/products?params        ┌──────────────────────┐
│   React Frontend     │ ───────────────────────────────────▶  │   Express Backend      │
│                       │                                        │                        │
│  FilterSidebar        │  ◀───────────────────────────────────  │  Controller            │
│  ProductGrid          │        { products: [...], count }      │  → filterService()      │
│  SortDropdown          │                                        │  → sortService()        │
│  EmptyState            │                                        │  In-memory productData  │
└─────────────────────┘                                        └──────────────────────┘
```

- Frontend never filters/sorts locally — every state change triggers a fresh API call.
- Backend is stateless per request: it receives the full filter+sort criteria in the
  query string and recomputes from the master dataset each time (simplest correct
  approach for this dataset size; note in Viva that a cache/memoization layer could be
  added for scale).

---

## 4. Folder Structure

```
root/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FilterSidebar/
│   │   │   │   ├── FilterSidebar.jsx
│   │   │   │   ├── CategoryChecklist.jsx
│   │   │   │   ├── PriceRangeSlider.jsx
│   │   │   │   └── RatingRadioGroup.jsx
│   │   │   ├── ProductGrid/
│   │   │   │   ├── ProductGrid.jsx
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   └── EmptyState.jsx
│   │   │   └── SortDropdown/
│   │   │       └── SortDropdown.jsx
│   │   ├── hooks/
│   │   │   └── useProductFilters.js     # holds filter/sort state, debounces API calls
│   │   ├── services/
│   │   │   └── productApi.js            # fetch wrapper
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
├── server/
│   ├── data/
│   │   └── products.json                # master inventory dataset
│   ├── controllers/
│   │   └── productController.js
│   ├── services/
│   │   ├── filterService.js             # combinatorial intersect filtering
│   │   └── sortService.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── app.js
│   └── server.js
└── README.md
```

---

## 5. Data Model

```js
// Product
{
  id: string,
  name: string,
  category: "Electronics" | "Apparel" | "Footwear" | ...,
  price: number,
  rating: number,       // 1–5
  imageUrl: string
}
```

---

## 6. API Design

**GET** `/api/products`

| Query param | Type   | Example                | Notes                                  |
|-------------|--------|-------------------------|-----------------------------------------|
| `categories`| string (CSV) | `Electronics,Apparel` | omitted/empty = no category filter     |
| `minPrice`  | number | `500`                   | omitted = no lower bound               |
| `maxPrice`  | number | `5000`                  | omitted = no upper bound               |
| `minRating` | number | `3`                     | omitted = no rating filter             |
| `sortBy`    | string | `price_asc` \| `rating_desc` | omitted = default (dataset order) |

**Response:**
```json
{
  "count": 12,
  "products": [ { "id": "...", "name": "...", ... } ]
}
```

Server-side validation: numeric params parsed and clamped; invalid/garbage values are
ignored rather than throwing, so the UI never receives a 400 for normal interaction.

---

## 7. Backend Logic

### 7.1 Filtering — `filterService.js`
Single-pass predicate over the master array (O(n)), each product checked against all
active criteria:

```js
function filterProducts(products, { categories, minPrice, maxPrice, minRating }) {
  return products.filter(p => {
    const matchesCategory = !categories?.length || categories.includes(p.category);
    const matchesPrice =
      (minPrice == null || p.price >= minPrice) &&
      (maxPrice == null || p.price <= maxPrice);
    const matchesRating = minRating == null || p.rating >= minRating;
    return matchesCategory && matchesPrice && matchesRating;
  });
}
```

**Graceful null handling:** every clause short-circuits to `true` when its filter is
unset, so with zero active filters the function returns the full base inventory
untouched — no special-cased "if nothing selected" branch needed.

### 7.2 Sorting — `sortService.js`
Sorting always runs **after** filtering, on the already-reduced array, per the "Vibe
Check" requirement:

```js
function sortProducts(products, sortBy) {
  const sorted = [...products];
  switch (sortBy) {
    case "price_asc":  return sorted.sort((a, b) => a.price - b.price);
    case "price_desc": return sorted.sort((a, b) => b.price - a.price);
    case "rating_desc":return sorted.sort((a, b) => b.rating - a.rating);
    default: return sorted;
  }
}
```

### 7.3 Controller pipeline
```
parse query → filterProducts(master, criteria) → sortProducts(filtered, sortBy)
  → respond { count, products }
```

---

## 8. Frontend Components

| Component | Responsibility |
|---|---|
| `FilterSidebar` | Sticky container; composes checklist, slider, rating radios |
| `CategoryChecklist` | Multi-select checkboxes; emits array of selected categories |
| `PriceRangeSlider` | Dual-handle slider; emits `{min, max}` |
| `RatingRadioGroup` | 1–5 star radio buttons; emits single number |
| `SortDropdown` | Emits `sortBy` value |
| `ProductGrid` | Renders `ProductCard` list or `EmptyState` |
| `ProductCard` | Image, price, rating, name |
| `EmptyState` | "No items match your criteria" + Reset button |

### State flow (`useProductFilters` hook)
1. Local state: `{ categories, minPrice, maxPrice, minRating, sortBy }`.
2. Any setter call → state updates → `useEffect` (debounced ~150–250ms for the slider)
   fires `productApi.getProducts(state)`.
3. Response populates `products` + `count` in the hook; `App` passes down to `ProductGrid`.
4. `count === 0` → render `EmptyState`; its Reset button clears all filter state back to
   defaults, which re-triggers the effect and refetches the full inventory.

---

## 9. Edge Cases Covered
- No filters selected → full inventory returned (server-side short-circuit, not a
  frontend special case).
- Zero matches → dedicated empty-state UI with reset action.
- Rapid slider dragging → debounced requests to avoid flooding the API.
- Invalid/out-of-range query params → sanitized server-side instead of erroring.
- Sort applied on top of an empty filtered set → no-op, still shows empty state.

---

## 10. Suggested Incremental Git Commit Plan
1. `chore: scaffold client + server project structure`
2. `feat(server): seed product dataset + basic GET /api/products`
3. `feat(server): implement filterService with combinatorial intersect logic`
4. `feat(server): implement sortService, wire into controller pipeline`
5. `feat(client): build FilterSidebar (category, price slider, rating)`
6. `feat(client): build ProductGrid + ProductCard`
7. `feat(client): wire useProductFilters hook to API with debounce`
8. `feat(client): add SortDropdown`
9. `feat(client): add EmptyState + reset filters flow`
10. `polish: styling, sticky sidebar, responsive grid`
11. `docs: README with setup + architecture notes`

---

## 11. Out of Scope / Future Improvements (mention in Viva if asked)
- Pagination for large inventories
- Caching filtered results (e.g., memoize by query key)
- Real database instead of in-memory JSON
- URL-synced filter state (shareable filtered links)
