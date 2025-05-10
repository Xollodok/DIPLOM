"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/auth-context"
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Package,
  FileText,
  Truck,
} from "lucide-react"

export default function AdminSidebar({ activeItem = "dashboard" }: { activeItem?: string }) {
  const pathname = usePathname()
  const { logout } = useAuth()

  const isActive = (path: string) => pathname?.includes(path) || activeItem === path

  const navItems = [
    { name: "Панель управления", path: "/admin", icon: LayoutDashboard, id: "dashboard" },
    { name: "Товары", path: "/admin/products", icon: ShoppingBag, id: "products" },
    { name: "Заказы", path: "/admin/orders", icon: Package, id: "orders" },
    { name: "Клиенты", path: "/admin/customers", icon: Users, id: "customers" },
    { name: "Склад", path: "/admin/inventory", icon: Truck, id: "inventory" },
    { name: "Отчеты", path: "/admin/reports", icon: BarChart3, id: "reports" },
    { name: "Контент", path: "/admin/content", icon: FileText, id: "content" },
    { name: "Настройки", path: "/admin/settings", icon: Settings, id: "settings" },
  ]

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center font-semibold">
          <span className="text-lg font-bold">Панель администратора</span>
        </Link>
      </div>
      <div className="flex-1 p-4">
        <nav className="grid items-start gap-2">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant={isActive(item.id) ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href={item.path} className="flex items-center">
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Separator className="mb-4" />
        <div className="grid gap-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Вернуться в магазин
          </Link>
          <Button variant="ghost" className="w-full justify-start" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Выйти
          </Button>
        </div>
      </div>
    </div>
  )
}
