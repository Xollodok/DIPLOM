"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { ChevronRight, CreditCard, ArrowLeft } from "lucide-react"

export default function CheckoutPage() {
  const { cart, clearCart, getTotalPrice } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "RUS",
    paymentMethod: "credit-card",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Calculate totals
  const subtotal = getTotalPrice()
  const shipping = subtotal > 5000 ? 0 : 500
  const tax = subtotal * 0.2 // 20% НДС
  const total = subtotal + shipping + tax

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error when field is modified
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required fields
    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zip", "country"]

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = "Это поле обязательно"
      }
    })

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Неверный формат email"
    }

    // Payment validation
    if (formData.paymentMethod === "credit-card") {
      if (!formData.cardName) newErrors.cardName = "Имя владельца карты обязательно"
      if (!formData.cardNumber) newErrors.cardNumber = "Номер карты обязателен"
      if (!formData.cardExpiry) newErrors.cardExpiry = "Срок действия обязателен"
      if (!formData.cardCvc) newErrors.cardCvc = "CVC код обязателен"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Ошибка формы",
        description: "Пожалуйста, исправьте ошибки в форме.",
        variant: "destructive",
      })
      return
    }

    // Process order
    // This would normally submit to an API
    toast({
      title: "Заказ размещен!",
      description: "Ваш заказ успешно размещен. Спасибо за покупку!",
    })

    // Clear cart and redirect to confirmation
    clearCart()
    router.push("/checkout/confirmation")
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-2">Ваша корзина пуста</h1>
        <p className="text-muted-foreground mb-8">Вам нужно добавить товары в корзину перед оформлением заказа.</p>
        <Button asChild>
          <Link href="/products">Просмотреть товары</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">
          Главная
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/cart" className="hover:text-primary">
          Корзина
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground">Оформление заказа</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>Информация о доставке</CardTitle>
              <CardDescription>Введите адрес, куда вы хотите получить заказ.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Адрес</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="city">Город</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Область</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={errors.state ? "border-red-500" : ""}
                  />
                  {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Индекс</Label>
                  <Input
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className={errors.zip ? "border-red-500" : ""}
                  />
                  {errors.zip && <p className="text-sm text-red-500">{errors.zip}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Страна</Label>
                <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите страну" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RUS">Россия</SelectItem>
                    <SelectItem value="BLR">Беларусь</SelectItem>
                    <SelectItem value="KAZ">Казахстан</SelectItem>
                    <SelectItem value="UKR">Украина</SelectItem>
                  </SelectContent>
                </Select>
                {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle>Способ оплаты</CardTitle>
              <CardDescription>Все транзакции защищены и зашифрованы.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Кредитная/Дебетовая карта
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
              </RadioGroup>

              {formData.paymentMethod === "credit-card" && (
                <div className="space-y-4 pt-3">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Имя на карте</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={errors.cardName ? "border-red-500" : ""}
                    />
                    {errors.cardName && <p className="text-sm text-red-500">{errors.cardName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Номер карты</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className={errors.cardNumber ? "border-red-500" : ""}
                    />
                    {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardExpiry">Срок действия</Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="ММ/ГГ"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        className={errors.cardExpiry ? "border-red-500" : ""}
                      />
                      {errors.cardExpiry && <p className="text-sm text-red-500">{errors.cardExpiry}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardCvc">CVC</Label>
                      <Input
                        id="cardCvc"
                        name="cardCvc"
                        placeholder="123"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        className={errors.cardCvc ? "border-red-500" : ""}
                      />
                      {errors.cardCvc && <p className="text-sm text-red-500">{errors.cardCvc}</p>}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Итого заказа</CardTitle>
              <CardDescription>
                {cart.reduce((acc, item) => acc + item.quantity, 0)} товаров в вашей корзине
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart items summary */}
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={`${item.productId}-${item.color}`} className="flex justify-between">
                    <span className="text-sm">
                      {item.quantity} × {item.name}
                      {item.color && ` (${item.color})`}
                    </span>
                    <span className="text-sm font-medium">{(item.price * item.quantity).toFixed(2)} ₽</span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Order totals */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Подытог</span>
                  <span>{subtotal.toFixed(2)} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Доставка</span>
                  <span>{shipping === 0 ? "Бесплатно" : `${shipping.toFixed(2)} ₽`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">НДС (20%)</span>
                  <span>{tax.toFixed(2)} ₽</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Итого</span>
                  <span>{total.toFixed(2)} ₽</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" type="submit" size="lg">
                Оформить заказ
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/cart">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Вернуться в корзину
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
