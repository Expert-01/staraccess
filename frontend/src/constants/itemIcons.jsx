import { FaTicketAlt, FaCreditCard, FaPhone, FaStar, FaHandshake, FaBox } from 'react-icons/fa'

// Get icon for item type
export const getItemIcon = (itemType, size = "large") => {
  const sizeClass = size === "large" ? "w-16 h-16" : "w-5 h-5"
  const icons = {
    fan_card: <FaTicketAlt className={sizeClass} />,
    membership_card: <FaCreditCard className={sizeClass} />,
    call_permit: <FaPhone className={sizeClass} />,
    vip_access: <FaStar className={sizeClass} />,
    meet_and_greet: <FaHandshake className={sizeClass} />
  }
  return icons[itemType] || <FaBox className={sizeClass} />
}
