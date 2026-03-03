# Item Tiers Feature Documentation

## Overview

The Celebrity Browser now supports tiered pricing for celebrity merchandise items. Users can purchase items at different price tiers (Bronze, Silver, Gold, Platinum) with varying features and benefits, or fixed-price items like Call Permits.

## Item Types

### 1. **Fan Card**
- **Pricing**: Tiered (Bronze $500 | Silver $750 | Gold $1000 | Platinum $1750)
- **Description**: Get your personalized fan card signed by your favorite celebrity
- **Tiers**: Multiple quality/edition levels

### 2. **Membership Card**
- **Pricing**: Tiered (Bronze $500 | Silver $750 | Gold $1000 | Platinum $1750)
- **Description**: Exclusive membership benefits and perks
- **Tiers**: Different membership levels with increasing benefits

### 3. **Call Permit**
- **Pricing**: Fixed ($300 per month subscription)
- **Description**: One-on-one phone call with the celebrity (30 minutes)
- **Tiers**: Single tier (no variations)

### 4. **VIP Access**
- **Pricing**: Tiered (Bronze $500 | Silver $750 | Gold $1000 | Platinum $1750)
- **Description**: VIP event access and exclusive backstage experience
- **Tiers**: Different event access levels

### 5. **Meet & Greet**
- **Pricing**: Tiered (Bronze $500 | Silver $750 | Gold $1000 | Platinum $1750)
- **Description**: Meet and greet with your favorite celebrity
- **Tiers**: Different experience packages

## Database Schema

### Items Table
```sql
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    celebrity_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    item_type VARCHAR(50) NOT NULL,
    has_tiers BOOLEAN DEFAULT FALSE,
    image VARCHAR(500),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)
```

### Item Tiers Table
```sql
CREATE TABLE item_tiers (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL,
    tier_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)
```

### Order Items Table (Updated)
```sql
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    item_tier_id INTEGER,
    celebrity_id INTEGER,
    item_name VARCHAR(255) NOT NULL,
    tier_name VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP
)
```

## Backend API Endpoints

### Get Items for Celebrity
```
GET /api/items/celebrity/:celebrityId
```
Returns all items for a specific celebrity with their tiers.

**Response**:
```json
[
  {
    "id": 1,
    "celebrity_id": 5,
    "name": "Fan Card",
    "description": "Signed fan card",
    "item_type": "fan_card",
    "has_tiers": true,
    "tiers": [
      {
        "id": 1,
        "item_id": 1,
        "tier_name": "bronze",
        "price": 500,
        "stock": 50,
        "description": "Basic tier"
      },
      {
        "id": 2,
        "item_id": 1,
        "tier_name": "silver",
        "price": 750,
        "stock": 30,
        "description": "Enhanced tier"
      }
    ]
  }
]
```

### Get Item Details
```
GET /api/items/celebrity/:celebrityId/item/:itemId
```
Returns detailed information about a specific item including all tiers.

**Response**:
```json
{
  "item": {
    "id": 1,
    "celebrity_id": 5,
    "name": "Fan Card",
    "item_type": "fan_card",
    "has_tiers": true,
    "tiers": [...]
  },
  "celebrity": {
    "id": 5,
    "name": "Taylor Swift",
    "image": "https://..."
  }
}
```

### Get Tier Details
```
GET /api/items/:itemId/tier/:tierId
```

### Add Item (Admin)
```
POST /api/admin/celebrities/:id/items
```

**Body**:
```json
{
  "name": "VIP Access",
  "description": "Exclusive VIP event access",
  "itemType": "vip_access",
  "image": "https://...",
  "tiers": [
    {
      "name": "bronze",
      "price": 500,
      "stock": 100,
      "description": "Basic VIP access"
    },
    {
      "name": "silver",
      "price": 750,
      "stock": 75,
      "description": "Enhanced VIP access"
    }
  ]
}
```

## Frontend Components

### ItemDetailPage
**Location**: `frontend/src/pages/ItemDetailPage.jsx`

Displays detailed information about a specific item with tier selection.

**Features**:
- Item description and image
- Tier selection with price display
- Stock availability check
- Quantity selector
- Add to cart functionality
- Price summary

**Props**: None (uses route params)

**Route**: `/celebrity/:celebrityId/item/:itemId`

### Updated CelebrityDetailPage
**Location**: `frontend/src/pages/CelebrityDetailPage.jsx`

Updated to display items as clickable cards with tier badges.

**Features**:
- Item cards with icons
- Available tiers display
- Price range (min-max)
- Click to view details

## Constants

### Frontend Constants
**Location**: `frontend/src/constants/itemTypes.js`

```javascript
// Item type labels
ITEM_TYPE_LABELS = {
  fan_card: 'Fan Card',
  membership_card: 'Membership Card',
  call_permit: 'Call Permit',
  vip_access: 'VIP Access',
  meet_and_greet: 'Meet & Greet'
}

// Item descriptions
ITEM_DESCRIPTIONS = {
  fan_card: 'Get your personalized fan card...',
  // ...
}

// Tier information
TIER_LABELS = {
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Platinum'
}

TIER_PRICES = {
  bronze: 500,
  silver: 750,
  gold: 1000,
  platinum: 1750
}

// Helper functions
getTierColor(tierName)  // Returns color hex code
getItemIcon(itemType)   // Returns emoji icon
```

### Backend Constants
**Location**: `backend/src/constants/itemTypes.js`

Similar structure with additional validation functions.

## User Flow

1. **Browse Celebrities** → Home page shows celebrity cards
2. **View Celebrity** → Click celebrity to see detail page
3. **Browse Items** → See available items as cards with tier badges
4. **View Item Details** → Click item card to open ItemDetailPage
5. **Select Tier** → Choose from available tiers
6. **Adjust Quantity** → Select quantity for purchase
7. **Add to Cart** → Item is added with selected tier
8. **Checkout** → Proceed to payment with tier pricing

## Adding Items via Admin Panel

### Create Item with Tiers
```javascript
const newItem = {
  name: "Meet & Greet",
  description: "Personal meet and greet session",
  itemType: "meet_and_greet",
  image: "https://example.com/image.jpg",
  tiers: [
    {
      name: "bronze",
      price: 500,
      stock: 50,
      description: "Standard 15-min session"
    },
    {
      name: "silver",
      price: 750,
      stock: 40,
      description: "Premium 30-min session"
    },
    {
      name: "gold",
      price: 1000,
      stock: 25,
      description: "VIP 1-hour session with photo"
    },
    {
      name: "platinum",
      price: 1750,
      stock: 10,
      description: "Ultimate experience with exclusive gifts"
    }
  ]
}

// Send to API
POST /api/admin/celebrities/{id}/items
```

## Cart Storage

Items are stored in localStorage with tier information:

```json
[
  {
    "id": 1,
    "tierId": 2,
    "itemName": "Fan Card",
    "tierName": "silver",
    "price": 750,
    "quantity": 2,
    "celebrityId": 5,
    "celebrityName": "Taylor Swift"
  }
]
```

## Order Processing

When an order is processed, the `order_items` table stores:
- `item_id`: Reference to the product
- `item_tier_id`: Reference to the specific tier
- `tier_name`: The tier selected (bronze/silver/gold/platinum)
- `price`: The price of that specific tier
- `quantity`: How many units of this tier

## Pricing Summary

### Tiered Items (4 options)
- **Bronze**: $500
- **Silver**: $750 (50% more than Bronze)
- **Gold**: $1000 (33% more than Silver)
- **Platinum**: $1750 (75% more than Gold)

### Fixed Price Items
- **Call Permit**: $300 / month (standard tier only, subscription)

## Future Enhancements

1. **Wish List**: Allow users to save items for later
2. **Bulk Discounts**: Apply discounts for purchasing multiple tiers
3. **Bundle Deals**: Combine items at special pricing
4. **Seasonal Promotions**: Limited-time tier promotions
5. **User Reviews**: Tier-specific reviews and ratings
6. **Inventory Management**: Real-time stock tracking
7. **Tier Comparison**: Side-by-side tier feature comparison

## Testing

### Test Item Creation
```bash
curl -X POST http://localhost:5000/api/admin/celebrities/1/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "name": "Fan Card",
    "description": "Signed fan card",
    "itemType": "fan_card",
    "tiers": [
      {"name": "bronze", "price": 500, "stock": 50},
      {"name": "silver", "price": 750, "stock": 40},
      {"name": "gold", "price": 1000, "stock": 30},
      {"name": "platinum", "price": 1750, "stock": 10}
    ]
  }'
```

### Test Item Retrieval
```bash
curl http://localhost:5000/api/items/celebrity/1
```

### Test Item Detail
```bash
curl http://localhost:5000/api/items/celebrity/1/item/5
```

## Troubleshooting

### Items Not Showing Tiers
- Ensure tiers were created when adding the item
- Check that `item_tiers` table has records with matching `item_id`

### Tier Selection Not Working
- Verify localStorage is enabled in browser
- Check that tier `id` is properly set in the tier object

### Cart Tier Information Lost
- Ensure tier data is serialized to localStorage
- Check browser console for JSON serialization errors

## Migration Notes

If migrating from old item schema (without tiers):

```sql
-- Create tiers for existing items
INSERT INTO item_tiers (item_id, tier_name, price, stock)
SELECT id, 'standard', price, stock FROM items;

-- Update items table
ALTER TABLE items ADD COLUMN has_tiers BOOLEAN DEFAULT FALSE;
UPDATE items SET has_tiers = TRUE WHERE (SELECT COUNT(*) FROM item_tiers WHERE item_id = items.id) > 0;
```

---

**Version**: 1.0
**Last Updated**: March 1, 2026
