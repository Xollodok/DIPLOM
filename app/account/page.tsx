"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"
import AccountSidebar from "@/components/account-sidebar"
import { Package, Heart, CreditCard, MapPin, User, AlertCircle } from "lucide-react"

export default function AccountPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/account")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Требуется авторизация</h1>
          <p className="text-muted-foreground mb-6">Вам необходимо войти в систему для доступа к этой странице.</p>
          <Button asChild>
            <Link href="/login?redirect=/account">Войти</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Мой аккаунт</h1>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <AccountSidebar />

        <div>
          <Tabs defaultValue="dashboard">
            <TabsList className="mb-8 w-full justify-start">
              <TabsTrigger value="dashboard">Обзор</TabsTrigger>
              <TabsTrigger value="orders">Заказы</TabsTrigger>
              <TabsTrigger value="profile">Профиль</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Недавние заказы</CardTitle>
                    <CardDescription>Просмотр ваших недавних покупок</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Package className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>3 заказа</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/account/orders">Посмотреть все</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Избранное</CardTitle>
                    <CardDescription>Ваши сохраненные товары</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>5 товаров</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/account/wishlist">Посмотреть все</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Способы оплаты</CardTitle>
                    <CardDescription>Управление вашими способами оплаты</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>2 карты</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/account/payment">Управление</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Обзор аккаунта</CardTitle>
                  <CardDescription>Ваши данные и предпочтения</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2 flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Личная информация
                      </h3>
                      <div className="space-y-1 text-sm">
                        <p className="font-medium">{user?.name || "Иванов Иван"}</p>
                        <p className="text-muted-foreground">{user?.email || "ivan.ivanov@example.com"}</p>
                        <p className="text-muted-foreground">{user?.phone || "+7 (999) 123-45-67"}</p>
                      </div>
                      <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                        <Link href="/account/profile">Редактировать</Link>
                      </Button>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2 flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Адрес по умолчанию
                      </h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">ул. Ленина, 123</p>
                        <p className="text-muted-foreground">кв. 45</p>
                        <p className="text-muted-foreground">Москва, 123456</p>
                      </div>
                      <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                        <Link href="/account/addresses">Управление адресами</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>История заказов</CardTitle>
                  <CardDescription>Просмотр и отслеживание ваших заказов</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex flex-col sm:flex-row justify-between mb-4">
                        <div>
                          <h4 className="font-medium">Заказ #12345678</h4>
                          <p className="text-sm text-muted-foreground">Оформлен 3 мая 2023 г.</p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center">
                          <span className="text-sm font-medium inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Доставлен
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-muted rounded-md flex-shrink-0"></div>
                        <div>
                          <p className="font-medium">Премиальная глянцевая аэрозольная краска</p>
                          <p className="text-sm text-muted-foreground">2 товара • 4998 ₽</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/account/orders/12345678">Подробнее</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Купить снова
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex flex-col sm:flex-row justify-between mb-4">
                        <div>
                          <h4 className="font-medium">Заказ #98765432</h4>
                          <p className="text-sm text-muted-foreground">Оформлен 18 апреля 2023 г.</p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center">
                          <span className="text-sm font-medium inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            Отправлен
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-muted rounded-md flex-shrink-0"></div>
                        <div>
                          <p className="font-medium">Универсальная грунтовка</p>
                          <p className="text-sm text-muted-foreground">1 товар • 2499 ₽</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/account/orders/98765432">Подробнее</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Купить снова
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Информация профиля</CardTitle>
                  <CardDescription>Управление вашими личными данными</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">ФИО</label>
                      <input
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        defaultValue={user?.name || "Иванов Иван"}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        defaultValue={user?.email || "ivan.ivanov@example.com"}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Телефон</label>
                      <input
                        type="tel"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        defaultValue={user?.phone || "+7 (999) 123-45-67"}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Дата рождения</label>
                      <input
                        type="date"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        defaultValue="1990-01-01"
                      />
                    </div>
                  </div>
                  <Button>Сохранить изменения</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Пароль</CardTitle>
                  <CardDescription>Обновление пароля</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Текущий пароль</label>
                    <input
                      type="password"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Новый пароль</label>
                    <input
                      type="password"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Подтвердите новый пароль</label>
                    <input
                      type="password"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                  <Button>Обновить пароль</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
