"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export default function CartPage() {
  const { cart, updateItemQuantity, removeItem, clearCart, getTotalPrice } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const totalPrice = getTotalPrice()
  const discount = promoApplied ? totalPrice * 0.1 : 0
  const shippingCost = totalPrice > 5000 ? 0 : 500
  const finalTotal = totalPrice - discount + shippingCost

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setPromoApplied(true)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-20 w-20 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-2">Ваша корзина пуста</h1>
          <p className="text-muted-foreground mb-8">Похоже, вы еще не добавили товары в корзину.</p>
          <Button asChild size="lg">
            <Link href="/products">Продолжить покупки</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Cart items */}
          <div className="rounded-lg border shadow-sm">
            <div className="p-4 bg-muted/40">
              <div className="grid grid-cols-12 text-sm font-medium">
                <div className="col-span-6">Товар</div>
                <div className="col-span-2 text-center">Цена</div>
                <div className="col-span-2 text-center">Количество</div>
                <div className="col-span-2 text-center">Итого</div>
              </div>
            </div>
            <div className="divide-y">
              {cart.map((item) => (
                <div key={`${item.productId}-${item.color}`} className="p-4">
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-6 flex items-center">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          <Link href={`/products/${item.productId}`} className="hover:underline">
                            {item.name}
                          </Link>
                        </h3>
                        {item.color && <p className="text-sm text-muted-foreground">Цвет: {item.color}</p>}
                      </div>
                    </div>
                    <div className="col-span-2 text-center">{item.price.toFixed(2)} ₽</div>
                    <div className="col-span-2 flex items-center justify-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateItemQuantity(item.productId, item.color, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-2 w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateItemQuantity(item.productId, item.color, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="col-span-2 flex items-center justify-between">
                      <span className="font-medium text-center w-full">
                        {(item.price * item.quantity).toFixed(2)} ₽
                      </span>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.productId, item.color)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <Button variant="outline" size="sm" onClick={() => clearCart()}>
                Очистить корзину
              </Button>
            </div>
            <Button asChild variant="outline">
              <Link href="/products">Продолжить покупки</Link>
            </Button>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border shadow-sm divide-y">
            <div className="p-4 bg-muted/40">
              <h2 className="font-semibold text-xl">Итого заказа</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Подытог</span>
                <span>{totalPrice.toFixed(2)} ₽</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Скидка (10%)</span>
                  <span>-{discount.toFixed(2)} ₽</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Доставка</span>
                <span>{shippingCost === 0 ? "Бесплатно" : `${shippingCost.toFixed(2)} ₽`}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Итого</span>
                <span>{finalTotal.toFixed(2)} ₽</span>
              </div>

              <div className="pt-4">
                <label className="block text-sm font-medium mb-2">Промокод</label>
                <div className="flex gap-2">
                  <Input placeholder="Введите код" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                  <Button onClick={handleApplyPromo} disabled={promoApplied}>
                    Применить
                  </Button>
                </div>
                {promoApplied && <p className="text-sm text-green-600 mt-2">Промокод успешно применен!</p>}
              </div>

              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">
                  Оформить заказ <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
