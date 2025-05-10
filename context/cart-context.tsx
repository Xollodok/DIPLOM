"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define cart item type
export type CartItem = {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  color?: string
}

// Define cart context type
type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  updateItemQuantity: (productId: string, color: string | undefined, quantity: number) => void
  removeItem: (productId: string, color: string | undefined) => void
  clearCart: () => void
  getTotalPrice: () => number
}

// Create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Create a provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // Add an item to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Check if item already exists in cart (matching product ID and color if applicable)
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.productId === item.productId && cartItem.color === item.color,
      )

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += item.quantity
        return updatedCart
      } else {
        // Add new item to cart
        return [...prevCart, item]
      }
    })
  }

  // Update the quantity of an item in the cart
  const updateItemQuantity = (productId: string, color: string | undefined, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.productId === productId && item.color === color ? { ...item, quantity } : item)),
    )
  }

  // Remove an item from the cart
  const removeItem = (productId: string, color: string | undefined) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.productId === productId && item.color === color)))
  }

  // Clear the cart
  const clearCart = () => {
    setCart([])
  }

  // Calculate the total price of items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateItemQuantity,
        removeItem,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Create a hook to use the cart context
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
