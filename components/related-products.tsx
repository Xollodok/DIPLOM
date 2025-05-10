import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"

type RelatedProductsProps = {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden group">
          <div className="relative h-40 sm:h-48">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </Link>
          </div>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
            <Link href={`/products/${product.id}`} className="hover:underline">
              <h3 className="font-medium line-clamp-1">{product.name}</h3>
            </Link>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-bold">{product.price.toFixed(2)} ₽</span>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/products/${product.id}`}>Посмотреть</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
