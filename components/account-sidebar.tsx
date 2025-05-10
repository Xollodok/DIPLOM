"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/auth-context"
import { User, Package, CreditCard, Heart, MapPin, Settings, LogOut } from "lucide-react"

export default function AccountSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { name: "Обзор аккаунта", path: "/account", icon: User },
    { name: "Заказы", path: "/account/orders", icon: Package },
    { name: "Способы оплаты", path: "/account/payment", icon: CreditCard },
    { name: "Избранное", path: "/account/wishlist", icon: Heart },
    { name: "Адреса", path: "/account/addresses", icon: MapPin },
    { name: "Настройки аккаунта", path: "/account/settings", icon: Settings },
  ]

  return (
    <div className="w-full p-1 md:pr-6">
      <div className="space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.name}
            variant={isActive(item.path) ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link href={item.path} className="flex items-center">
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          </Button>
        ))}
      </div>
      <Separator className="my-4" />
      <Button variant="ghost" className="w-full justify-start text-red-500" onClick={logout}>
        <LogOut className="mr-2 h-4 w-4" />
        Выйти
      </Button>
    </div>
  )
}
