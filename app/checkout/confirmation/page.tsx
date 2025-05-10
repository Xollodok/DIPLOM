"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, MailOpen, Package, Clock, ShoppingBag } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ConfirmationPage() {
  const router = useRouter()
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    // Generate a random order number
    const randomOrderNumber = Math.floor(10000000 + Math.random() * 90000000).toString()
    setOrderNumber(randomOrderNumber)
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold mb-2">Заказ подтвержден!</h1>
        <p className="text-muted-foreground mb-8">Спасибо за покупку. Мы обрабатываем ваш заказ.</p>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <h2 className="text-lg font-medium mb-2">Заказ #{orderNumber}</h2>
              <p className="text-sm text-muted-foreground">Письмо с подтверждением отправлено на ваш email.</p>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Package className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="font-medium">Доставка по адресу</h3>
                <p className="text-sm text-muted-foreground">Ваш адрес доставки</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="font-medium">Ожидаемая доставка</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button asChild>
            <Link href="/account/orders">
              <Package className="mr-2 h-5 w-5" />
              Отследить заказ
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Продолжить покупки
            </Link>
          </Button>
        </div>

        <div className="bg-muted/40 rounded-lg p-6 text-center">
          <MailOpen className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <h3 className="font-medium mb-2">Хотите быть в курсе новостей?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Подпишитесь на нашу рассылку, чтобы получать обновления, акции и многое другое!
          </p>
          <Button variant="outline" asChild>
            <Link href="/newsletter">Подписаться</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
