"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"
import AdminSidebar from "@/components/admin-sidebar"
import {
  BarChart,
  PieChart,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { AlertCircle, ArrowUpRight, CreditCard, DollarSign, ShoppingCart, Users } from "lucide-react"

// Mock data for charts
const salesData = [
  { name: "Янв", sales: 400000 },
  { name: "Фев", sales: 300000 },
  { name: "Мар", sales: 500000 },
  { name: "Апр", sales: 450000 },
  { name: "Май", sales: 600000 },
  { name: "Июн", sales: 550000 },
]

const categoryData = [
  { name: "Аэрозольная краска", value: 45 },
  { name: "Лаки", value: 30 },
  { name: "Грунтовки", value: 15 },
  { name: "Другое", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

// Recent orders data
const recentOrders = [
  {
    id: "ORD-1234",
    customer: "Иванов Иван",
    date: "2023-05-01",
    amount: 12999.99,
    status: "delivered",
  },
  {
    id: "ORD-1235",
    customer: "Петров Петр",
    date: "2023-05-02",
    amount: 8995.95,
    status: "processing",
  },
  {
    id: "ORD-1236",
    customer: "Сидорова Елена",
    date: "2023-05-02",
    amount: 24550.5,
    status: "shipped",
  },
  {
    id: "ORD-1237",
    customer: "Козлов Роберт",
    date: "2023-05-03",
    amount: 6499.99,
    status: "processing",
  },
  {
    id: "ORD-1238",
    customer: "Волкова Лиза",
    date: "2023-05-03",
    amount: 17285.85,
    status: "shipped",
  },
]

// Low inventory products
const lowInventoryProducts = [
  { id: "PRD-001", name: "Матовая черная аэрозольная краска", stock: 5, threshold: 10 },
  { id: "PRD-015", name: "Прозрачный глянцевый лак", stock: 3, threshold: 10 },
  { id: "PRD-022", name: "Белая грунтовка", stock: 7, threshold: 15 },
  { id: "PRD-034", name: "Металлическая золотая аэрозольная краска", stock: 2, threshold: 10 },
]

export default function AdminDashboard() {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/admin")
      return
    }

    if (!isAdmin) {
      router.push("/account")
    }
  }, [isAuthenticated, isAdmin, router])

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Доступ запрещен</h1>
          <p className="text-muted-foreground mb-6">Для доступа к этой странице необходимы права администратора.</p>
          <Button asChild>
            <a href="/">Вернуться на главную</a>
          </Button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Доставлен"
      case "shipped":
        return "Отправлен"
      case "processing":
        return "В обработке"
      case "cancelled":
        return "Отменен"
      default:
        return status
    }
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AdminSidebar activeItem="dashboard" />

      <div className="flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-2xl font-semibold">Панель администратора</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Добро пожаловать, {user?.name || "Администратор"}</span>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="orders">Заказы</TabsTrigger>
              <TabsTrigger value="inventory">Склад</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Общая выручка</p>
                      <h3 className="text-2xl font-bold mt-1">2 453 295 ₽</h3>
                      <p className="text-green-600 text-sm flex items-center mt-1">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        +12.5% с прошлого месяца
                      </p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Заказы</p>
                      <h3 className="text-2xl font-bold mt-1">354</h3>
                      <p className="text-green-600 text-sm flex items-center mt-1">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        +8.2% с прошлого месяца
                      </p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <ShoppingCart className="h-6 w-6 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Клиенты</p>
                      <h3 className="text-2xl font-bold mt-1">892</h3>
                      <p className="text-green-600 text-sm flex items-center mt-1">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        +5.7% с прошлого месяца
                      </p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Средний чек</p>
                      <h3 className="text-2xl font-bold mt-1">6 932 ₽</h3>
                      <p className="text-green-600 text-sm flex items-center mt-1">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        +3.1% с прошлого месяца
                      </p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ежемесячные продажи</CardTitle>
                    <CardDescription>Динамика продаж за последние 6 месяцев</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Продажи по категориям</CardTitle>
                    <CardDescription>Распределение продаж по категориям товаров</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Последние заказы</CardTitle>
                  <CardDescription>Последние заказы клиентов</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID заказа</TableHead>
                        <TableHead>Клиент</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Сумма</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                          <TableCell>{order.amount.toFixed(2)} ₽</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Просмотр
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">
                      Все заказы
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Low Inventory Alert */}
              <Card>
                <CardHeader className="bg-yellow-50 dark:bg-yellow-900/20 border-b">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mr-2" />
                    <CardTitle>Предупреждение о низком запасе</CardTitle>
                  </div>
                  <CardDescription>Товары, которые скоро нужно будет пополнить</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID товара</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Текущий запас</TableHead>
                        <TableHead>Порог пополнения</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lowInventoryProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.id}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell className="text-red-500 font-medium">{product.stock}</TableCell>
                          <TableCell>{product.threshold}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Пополнить
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Управление заказами</CardTitle>
                  <CardDescription>Просмотр и управление всеми заказами клиентов</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    Здесь будет реализована функциональность управления заказами
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Управление складом</CardTitle>
                  <CardDescription>Управление запасами товаров</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    Здесь будет реализована функциональность управления складом
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
