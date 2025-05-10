"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Minus, Plus, ShoppingCart, Star, Truck, Check, Shield } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/context/cart-context"
import { getProductById, getRelatedProducts } from "@/lib/data"
import type { Product } from "@/types"
import RelatedProducts from "@/components/related-products"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const productData = await getProductById(params.id)

        if (!productData) {
          notFound()
        }

        setProduct(productData)
        setSelectedColor(productData.colors[0] || "")

        const related = await getRelatedProducts(productData.category)
        setRelatedProducts(related.filter((p) => p.id !== productData.id).slice(0, 4))
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (!product) return

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      color: selectedColor,
    })

    toast({
      title: "Добавлено в корзину",
      description: `${quantity} × ${product.name} добавлено в вашу корзину`,
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">
          Главная
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/products" className="hover:text-primary">
          Товары
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/products?category=${product.category}`} className="hover:text-primary">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-96 border rounded-lg overflow-hidden">
            <Image
              src={product.images[activeImageIndex] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex gap-3 overflow-auto pb-2">
            {product.images.map((image, idx) => (
              <button
                key={image}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative h-24 w-24 border rounded-md overflow-hidden ${
                  idx === activeImageIndex ? "ring-2 ring-primary" : ""
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - вид ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.reviews} отзывов</span>
            </div>
            <p className="text-2xl font-bold">{product.price.toFixed(2)} ₽</p>
            {product.oldPrice && <p className="text-muted-foreground line-through">{product.oldPrice.toFixed(2)} ₽</p>}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          {/* Product options */}
          <div className="space-y-4">
            {product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Цвет: {selectedColor}</label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-8 w-8 rounded-full border-2 ${
                        selectedColor === color ? "border-primary" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div>
              <label className="block text-sm font-medium mb-2">Количество</label>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center text-sm">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span>{product.inventory > 0 ? "В наличии" : "Нет в наличии"}</span>
          </div>

          {/* Add to cart button */}
          <div className="flex gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={product.inventory === 0}>
              <ShoppingCart className="mr-2 h-5 w-5" />В корзину
            </Button>
          </div>

          {/* Product features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center text-sm">
              <Truck className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Бесплатная доставка от 5000 ₽</span>
            </div>
            <div className="flex items-center text-sm">
              <Check className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Гарантия качества</span>
            </div>
            <div className="flex items-center text-sm">
              <Shield className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>30-дневная гарантия возврата</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product information tabs */}
      <div className="mb-16">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details">Описание товара</TabsTrigger>
            <TabsTrigger value="specifications">Характеристики</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p>{product.fullDescription || product.description}</p>
                  <h4 className="font-medium">Особенности:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="specifications" className="pt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-medium">Размер</div>
                    <div>{product.specifications?.size || "Стандартный"}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-medium">Покрытие</div>
                    <div>{product.specifications?.coverage || "Примерно 2 кв. метра на баллон"}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-medium">Время высыхания</div>
                    <div>{product.specifications?.dryTime || "15-30 минут"}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-medium">Покрытие</div>
                    <div>{product.specifications?.finish || "Глянцевое"}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-medium">Применение</div>
                    <div>{product.specifications?.application || "Распыление"}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-medium">Внутри/Снаружи</div>
                    <div>{product.specifications?.use || "Внутри и снаружи помещений"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="pt-4">
            <Card>
              <CardContent className="pt-6">
                {/* This would be populated with actual reviews */}
                <p className="text-muted-foreground italic">Здесь будут отображаться отзывы клиентов.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
          <RelatedProducts products={relatedProducts} />
        </div>
      )}
    </div>
  )
}
