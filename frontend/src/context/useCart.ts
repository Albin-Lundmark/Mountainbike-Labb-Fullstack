import { useContext } from 'react'
import { CartContext } from './CartContext'

interface CartItem {
  id: number
  product_id: number
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
