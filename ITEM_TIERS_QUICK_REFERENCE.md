# Quick Reference - Item Tiers Feature

## 🎯 Item Types & Pricing

| Item Type | Tier | Price | Stock | Icon |
|-----------|------|-------|-------|------|
| **Fan Card** | Bronze | $500 | Variable | 🎫 |
| | Silver | $750 | Variable | 🎫 |
| | Gold | $1000 | Variable | 🎫 |
| | Platinum | $1750 | Variable | 🎫 |
| **Membership Card** | Bronze | $500 | Variable | 💳 |
| | Silver | $750 | Variable | 💳 |
| | Gold | $1000 | Variable | 💳 |
| | Platinum | $1750 | Variable | 💳 |
| **Call Permit** | Standard | **$300/mo** | Variable | ☎️ |
| **VIP Access** | Bronze | $500 | Variable | ⭐ |
| | Silver | $750 | Variable | ⭐ |
| | Gold | $1000 | Variable | ⭐ |
| | Platinum | $1750 | Variable | ⭐ |
| **Meet & Greet** | Bronze | $500 | Variable | 🤝 |
| | Silver | $750 | Variable | 🤝 |
| | Gold | $1000 | Variable | 🤝 |
| | Platinum | $1750 | Variable | 🤝 |

## 🔌 API Quick Reference

### Get Items with Tiers
```bash
GET /api/items/celebrity/{celebrityId}
```

### Get Item Details
```bash
GET /api/items/celebrity/{celebrityId}/item/{itemId}
```

### Add Item (Admin)
```bash
POST /api/admin/celebrities/{id}/items
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Item Name",
  "itemType": "fan_card|membership_card|call_permit|vip_access|meet_and_greet",
  "description": "Description",
  "tiers": [
    { "name": "bronze", "price": 500, "stock": 100 },
    { "name": "silver", "price": 750, "stock": 80 }
  ]
}
```

## 🛣️ Frontend Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/celebrity/:id` | CelebrityDetailPage | Shows items with tier badges |
| `/celebrity/:celebrityId/item/:itemId` | ItemDetailPage | Item detail with tier selection |

## 💾 LocalStorage Format

### Cart Items
```javascript
[
  {
    "id": 1,
    "tierId": 2,
    "itemName": "Fan Card",
    "tierName": "silver",
    "price": 750,
    "quantity": 2,
    "celebrityId": 5,
    "celebrityName": "Celebrity Name"
  }
]
```

## 🗄️ Database Tables

### Items
- `id` - Item ID
- `celebrity_id` - Celebrity reference
- `name` - Item name
- `item_type` - Type classification
- `has_tiers` - Flag if item has tiers

### Item Tiers
- `id` - Tier ID
- `item_id` - Item reference
- `tier_name` - bronze|silver|gold|platinum|standard
- `price` - Tier price
- `stock` - Available quantity

### Order Items
- `item_id` - Item reference
- `item_tier_id` - Tier reference
- `tier_name` - Selected tier
- `price` - Charged price
- `quantity` - Quantity ordered

## 🎨 Frontend Component Props

### ItemDetailPage
```javascript
// Route params (from URL)
{
  celebrityId,  // Celebrity ID
  itemId        // Item ID
}
```

## 📋 Adding Items - Complete Example

```bash
# Create Fan Card with 4 tiers
curl -X POST http://localhost:5000/api/admin/celebrities/1/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Fan Card",
    "itemType": "fan_card",
    "description": "Signed fan card from celebrity",
    "tiers": [
      {
        "name": "bronze",
        "price": 500,
        "stock": 100,
        "description": "Standard signed card"
      },
      {
        "name": "silver",
        "price": 750,
        "stock": 80,
        "description": "Premium card with frame"
      },
      {
        "name": "gold",
        "price": 1000,
        "stock": 50,
        "description": "Deluxe with hologram"
      },
      {
        "name": "platinum",
        "price": 1750,
        "stock": 20,
        "description": "Ultimate collectors edition"
      }
    ]
  }'
```

## 🔍 Constants Reference

### Item Type Labels
```javascript
{
  fan_card: 'Fan Card',
  membership_card: 'Membership Card',
  call_permit: 'Call Permit',
  vip_access: 'VIP Access',
  meet_and_greet: 'Meet & Greet'
}
```

### Tier Names
```javascript
{
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Platinum',
  standard: 'Standard'
}
```

## 🎁 Item Descriptions
- **Fan Card**: Get your personalized fan card signed by your favorite celebrity
- **Membership Card**: Exclusive membership benefits and perks
- **Call Permit**: One-on-one phone call with the celebrity (30 minutes)
- **VIP Access**: VIP event access and exclusive backstage experience
- **Meet & Greet**: Meet and greet with your favorite celebrity

## ⚡ Key Implementation Details

1. **Tiered Items** (4 options): Fan Card, Membership Card, VIP Access, Meet & Greet
   - Each has Bronze ($500), Silver ($750), Gold ($1000), Platinum ($1750)

2. **Fixed Price Items** (1 option): Call Permit
   - Single "standard" tier at $300 (monthly subscription)

3. **Stock Tracking**
   - Per-tier inventory management
   - Shows "Out of Stock" when tier stock = 0

4. **Cart Storage**
   - Tier information preserved in localStorage
   - `tierId` and `tierName` stored for checkout

5. **Price Calculation**
   - Tier price × Quantity = Order total
   - Charged at checkout

## 🚀 Deployment Checklist

- [ ] Database schema updated (run database.sql)
- [ ] Backend dependencies installed (npm install)
- [ ] Frontend dependencies installed (npm install)
- [ ] Test item creation with tiers
- [ ] Test browse flow (Celebrity → Items → Details)
- [ ] Test add to cart with tier selection
- [ ] Test checkout with correct pricing
- [ ] Verify tier information in orders

## 📞 Support

For detailed documentation, see:
- `ITEM_TIERS.md` - Complete feature documentation
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
- Backend API: Check `backend/src/controllers/itemController.js`
- Frontend: Check `frontend/src/pages/ItemDetailPage.jsx`

---

**Quick Reference v1.0** | March 1, 2026
