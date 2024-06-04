import React, { createContext, useState, ReactNode } from 'react'

interface CartItem {
  id: number
  name: string
  product_id: number
  quantity: number
  price: number
}

interface CartContextType {
  cartItems: CartItem[]
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  )
}
