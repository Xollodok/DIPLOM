"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { getFeaturedProducts } from "@/lib/data"
import type { Product } from "@/types"
import { ShoppingCart, Loader2 } from "lucide-react"

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const featuredProducts = await getFeaturedProducts()
        setProducts(featuredProducts)
      } catch (error) {
        console.error("Ошибка загрузки популярных товаров:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      color: product.colors[0],
    })

    toast({
      title: "Добавлено в корзину",
      description: `${product.name} добавлен в вашу корзину.`,
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden group">
          <div className="relative h-48 sm:h-56">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </Link>
            {product.oldPrice && (
              <Badge variant="destructive" className="absolute top-2 right-2">
                Скидка
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
            <Link href={`/products/${product.id}`} className="hover:underline">
              <h3 className="font-medium line-clamp-1">{product.name}</h3>
            </Link>
            <div className="mt-2 flex items-center gap-2">
              <span className="font-bold">{product.price.toFixed(2)} ₽</span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">{product.oldPrice.toFixed(2)} ₽</span>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button variant="secondary" className="w-full" size="sm" onClick={() => handleAddToCart(product)}>
              <ShoppingCart className="h-4 w-4 mr-2" />В корзину
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
