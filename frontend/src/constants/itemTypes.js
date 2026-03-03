// Item types and pricing configuration

export const ITEM_TYPES = {
  FAN_CARD: 'fan_card',
  MEMBERSHIP_CARD: 'membership_card',
  CALL_PERMIT: 'call_permit',
  VIP_ACCESS: 'vip_access',
  MEET_AND_GREET: 'meet_and_greet'
}

export const ITEM_TYPE_LABELS = {
  fan_card: 'Fan Card',
  membership_card: 'Membership Card',
  call_permit: 'Call Permit',
  vip_access: 'VIP Access',
  meet_and_greet: 'Meet & Greet'
}

export const ITEM_DESCRIPTIONS = {
  fan_card: 'Get yo ur personalized fan card signed by your favorite celebrity eeeeeeee.',
  membership_card: 'Exclusive membership benefits and perks.',
  call_permit: 'One-on-one phone call with the celebrity (30 minutes).',
  vip_access: 'VIP event access and exclusive backstage experience.',
  meet_and_greet: 'Meet and greet with your favorite celebrity.'
}

// items with tiers (multiple price levels)
export const TIERED_ITEMS = [
  ITEM_TYPES.MEMBERSHIP_CARD,
  ITEM_TYPES.VIP_ACCESS,
  ITEM_TYPES.MEET_AND_GREET,
  ITEM_TYPES.FAN_CARD
]

// Call Permit has fixed price
export const FIXED_PRICE_ITEMS = [ITEM_TYPES.CALL_PERMIT]

// Tier definitions
export const TIERS = {
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
  STANDARD: 'standard'
}

export const TIER_LABELS = {
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Platinum',
  standard: 'Standard'
}

// Pricing configuration
export const TIER_PRICES = {
  bronze: 500,
  silver: 750,
  gold: 1000,
  platinum: 1750,
  standard: 1000
}

// Get color for tier
export const getTierColor = (tierName) => {
  const colors = {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
    standard: '#0066FF'
  }
  return colors[tierName] || '#999999'
}
