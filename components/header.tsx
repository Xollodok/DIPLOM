"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { ChevronDown, Menu, Search, ShoppingCart, User, X } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const { cart } = useCart()
  const { isAuthenticated, user, isAdmin, logout } = useAuth()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  // Track scrolling for header styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  const navItems = [
    { name: "Главная", path: "/" },
    {
      name: "Товары",
      path: "/products",
      submenu: [
        { name: "Аэрозольные краски", path: "/products?category=Spray Paint" },
        { name: "Лаки", path: "/products?category=Varnish" },
        { name: "Грунтовки", path: "/products?category=Primer" },
      ],
    },
    { name: "О нас", path: "/about" },
    { name: "Контакты", path: "/contact" },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white dark:bg-slate-900 shadow-md" : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md"
      }`}
    >
      {/* Top bar - desktop only */}
      <div className="hidden md:block border-b border-muted">
        <div className="container mx-auto px-4 flex items-center justify-between h-10 text-xs">
          <div>Бесплатная доставка при заказе от 5000 ₽</div>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:text-primary">
              Связаться с нами
            </Link>
            <Link href="/track-order" className="hover:text-primary">
              Отследить заказ
            </Link>
            <Link href="/find-store" className="hover:text-primary">
              Найти магазин
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <SheetHeader className="mb-4">
                <SheetTitle>Меню</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <SheetClose asChild>
                      <Link
                        href={item.path}
                        className={`block py-2 px-3 rounded-lg hover:bg-muted ${
                          isActive(item.path) ? "font-medium text-primary" : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                    {item.submenu && (
                      <div className="pl-4 space-y-1 my-1">
                        {item.submenu.map((subitem) => (
                          <SheetClose key={subitem.name} asChild>
                            <Link
                              href={subitem.path}
                              className="block py-2 px-3 rounded-lg hover:bg-muted text-muted-foreground text-sm"
                            >
                              {subitem.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-8 border-t pt-4">
                {!isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <SheetClose asChild>
                      <Button asChild className="w-full">
                        <Link href="/login">Войти</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/login?tab=register">Создать аккаунт</Link>
                      </Button>
                    </SheetClose>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="font-medium">Здравствуйте, {user?.name || "Пользователь"}</div>
                    <nav className="flex flex-col space-y-1">
                      <SheetClose asChild>
                        <Link href="/account" className="block py-2 px-3 rounded-lg hover:bg-muted">
                          Мой аккаунт
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/account/orders" className="block py-2 px-3 rounded-lg hover:bg-muted">
                          Мои заказы
                        </Link>
                      </SheetClose>
                      {isAdmin && (
                        <SheetClose asChild>
                          <Link href="/admin" className="block py-2 px-3 rounded-lg hover:bg-muted">
                            Панель администратора
                          </Link>
                        </SheetClose>
                      )}
                      <SheetClose asChild>
                        <button
                          onClick={logout}
                          className="block py-2 px-3 rounded-lg hover:bg-muted text-left text-red-500"
                        >
                          Выйти
                        </button>
                      </SheetClose>
                    </nav>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=32&width=32" alt="КолорКрафт Логотип" fill />
              </div>
              <span className="font-bold text-xl hidden sm:inline-block">КолорКрафт</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <div>
                    <button
                      className={`flex items-center gap-1 px-1 py-2 ${
                        isActive(item.path) ? "text-primary font-medium" : ""
                      } hover:text-primary transition-colors`}
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4 opacity-75" />
                    </button>
                    <div className="absolute left-0 top-full w-48 invisible group-hover:visible bg-white dark:bg-slate-900 shadow-lg rounded-md overflow-hidden border opacity-0 group-hover:opacity-100 transition-all">
                      <div className="py-2">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.path}
                            className="block px-4 py-2 hover:bg-muted text-sm"
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={`px-1 py-2 ${
                      isActive(item.path) ? "text-primary font-medium" : ""
                    } hover:text-primary transition-colors`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-2">
            {/* Desktop search */}
            <div className="hidden md:block relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Поиск..." className="pl-10 w-full" />
            </div>

            {/* Mobile search toggle */}
            <div className="md:hidden flex items-center">
              {isMobileSearchOpen ? (
                <div className="absolute inset-0 z-40 flex items-center justify-between bg-background px-4 h-16">
                  <div className="relative w-full mr-2">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="search" placeholder="Поиск..." className="pl-10 w-full" autoFocus />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileSearchOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setIsMobileSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Поиск</span>
                </Button>
              )}
            </div>

            {/* User menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Меню пользователя</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account">Личный кабинет</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders">Мои заказы</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/wishlist">Избранное</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Панель администратора</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/products">Управление товарами</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Войти</span>
                </Link>
              </Button>
            )}

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalCartItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalCartItems}
                  </Badge>
                )}
                <span className="sr-only">Корзина</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
