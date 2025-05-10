import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import type { Product } from "@/types"

type ProductGridProps = {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden group h-full flex flex-col">
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
            {product.inventory === 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Badge variant="outline" className="text-white border-white">
                  Нет в наличии
                </Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4 flex-grow">
            <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
            <Link href={`/products/${product.id}`} className="hover:underline">
              <h3 className="font-medium">{product.name}</h3>
            </Link>
            <p className="text-sm line-clamp-2 text-muted-foreground mt-1">{product.description}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="font-bold">{product.price.toFixed(2)} ₽</span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">{product.oldPrice.toFixed(2)} ₽</span>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button variant="secondary" className="w-full" size="sm" disabled={product.inventory === 0} asChild>
              <Link href={`/products/${product.id}`}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inventory === 0 ? "Нет в наличии" : "Посмотреть товар"}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
