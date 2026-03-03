// Hardcoded item details - used by all celebrities
export const ITEM_DETAILS = [
  {
    id: 1,
    name: 'Fan Card',
    item_type: 'fan_card',
    description: 'Get your personalized fan card signed by this celebrity. A collectible piece featuring an authentic autograph and professional photography.',
    image: '/uploads/items/fan-card.jpg',
    tiers: [
      {
        id: 101,
        tier_name: 'bronze',
        tier_label: 'Bronze',
        price: 500,
        stock: 100,
        description: 'Standard signed card with certificate of authenticity'
      },
      {
        id: 102, 
        tier_name: 'silver',
        tier_label: 'Silver',
        price: 750,
        stock: 80,
        description: 'Premium card with professional frame included'
      },
      {
        id: 103,
        tier_name: 'gold',
        tier_label: 'Gold',
        price: 1000,
        stock: 50,
        description: 'Deluxe card with hologram authentication and premium framing'
      },
      {
        id: 104,
        tier_name: 'platinum',
        tier_label: 'Platinum',
        price: 1750,
        stock: 20,
        description: 'Ultimate collectors edition with exclusive numbering and display case'
      }
    ]
  },
  {
    id: 2,
    name: 'Membership Card',
    item_type: 'membership_card',
    description: 'Join an exclusive community and unlock special perks, early access to events, and direct communication channels with your favorite celebrity.',
    image: '/uploads/items/membership-card.jpg',
    tiers: [
      {
        id: 201,
        tier_name: 'bronze',
        tier_label: 'Bronze',
        price: 500,
        stock: 100,
        description: 'Basic membership with monthly updates and community access'
      },
      {
        id: 202,
        tier_name: 'silver',
        tier_label: 'Silver',
        price: 750,
        stock: 80,
        description: 'Silver membership with priority support and exclusive content'
      },
      {
        id: 203,
        tier_name: 'gold',
        tier_label: 'Gold',
        price: 1000,
        stock: 50,
        description: 'Premium membership with early event access and VIP treatment'
      },
      {
        id: 204,
        tier_name: 'platinum',
        tier_label: 'Platinum',
        price: 1750,
        stock: 20,
        description: 'Ultimate VIP membership with personal account manager and exclusive perks'
      }
    ]
  },
  {
    id: 3,
    name: 'Call Permit',
    item_type: 'call_permit',
    description: 'Connect directly with your favorite celebrity through a personal phone call. A once-in-a-lifetime opportunity to have a meaningful conversation.',
    image: '/uploads/items/call-permit.jpg',
    tiers: [
      {
        id: 301,
        tier_name: 'standard',
        tier_label: 'Standard',
        price: 1000,
        stock: 30,
        description: '30-minute one-on-one phone call with full attention and genuine conversation'
      }
    ]
  },
  {
    id: 4,
    name: 'VIP Access',
    item_type: 'vip_access',
    description: 'Experience exclusive VIP treatment at events. Includes backstage access, premium seating, and special perks reserved for elite fans.',
    image: '/uploads/items/vip-access.jpg',
    tiers: [
      {
        id: 401,
        tier_name: 'bronze',
        tier_label: 'Bronze',
        price: 500,
        stock: 100,
        description: 'Basic VIP event access with dedicated entrance'
      },
      {
        id: 402,
        tier_name: 'silver',
        tier_label: 'Silver',
        price: 750,
        stock: 80,
        description: 'Enhanced VIP access with premium seating and refreshments'
      },
      {
        id: 403,
        tier_name: 'gold',
        tier_label: 'Gold',
        price: 1000,
        stock: 50,
        description: 'Premium VIP access with backstage tour and exclusive merchandise'
      },
      {
        id: 404,
        tier_name: 'platinum',
        tier_label: 'Platinum',
        price: 1750,
        stock: 20,
        description: 'Ultimate VIP experience with private meet & greet and luxury amenities'
      }
    ]
  },
  {
    id: 5,
    name: 'Meet & Greet',
    item_type: 'meet_and_greet',
    description: 'Create lasting memories with an in-person meet and greet. Professional photos, autographs, and quality time with your celebrity.',
    image: '/uploads/items/meet-greet.jpg',
    tiers: [
      {
        id: 501,
        tier_name: 'bronze',
        tier_label: 'Bronze',
        price: 500,
        stock: 50,
        description: 'Standard 15-minute meet & greet with professional photo opportunity'
      },
      {
        id: 502,
        tier_name: 'silver',
        tier_label: 'Silver',
        price: 750,
        stock: 40,
        description: 'Premium 30-minute session with multiple photos and autograph'
      },
      {
        id: 503,
        tier_name: 'gold',  
        tier_label: 'Gold',
        price: 1000,
        stock: 25,
        description: 'VIP 1-hour session with professional photographer and exclusive gift'
      },
      {
        id: 504,
        tier_name: 'platinum',
        tier_label: 'Platinum',
        price: 1750,
        stock: 10,
        description: 'Ultimate 2-hour experience with videography, gifts, and special surprises'
      }
    ]
  }
]

// Helper function to get item details by ID
export const getItemDetailsById = (itemId) => {
  return ITEM_DETAILS.find(item => item.id === parseInt(itemId))
}

// Helper function to get celebrity name (mock - in real app this comes from celebrity data)
export const getCelebrityNameById = (celebrityId) => {
  // This would normally come from your celebrities array
  // For now, returning generic celebrity reference
  return `Celebrity #${celebrityId}`
}
