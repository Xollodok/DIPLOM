"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import AdminSidebar from "@/components/admin-sidebar"
import { ChevronLeft } from "lucide-react"

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    inventory: "",
    colors: "",
    features: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Здесь был бы API-запрос для создания товара
    setTimeout(() => {
      toast({
        title: "Товар создан",
        description: "Новый товар был успешно добавлен в каталог.",
      })

      setIsSubmitting(false)
      router.push("/admin/products")
    }, 1000)
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AdminSidebar activeItem="products" />

      <div className="flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-2" asChild>
              <Link href="/admin/products">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Назад
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Добавить новый товар</h1>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Информация о товаре</CardTitle>
                <CardDescription>Заполните информацию о новом товаре</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Название товара</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Категория</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Аэрозольная краска">Аэрозольная краска</SelectItem>
                        <SelectItem value="Лак">Лак</SelectItem>
                        <SelectItem value="Грунтовка">Грунтовка</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Цена (₽)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inventory">Количество на складе</Label>
                    <Input
                      id="inventory"
                      name="inventory"
                      type="number"
                      min="0"
                      value={formData.inventory}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="colors">Доступные цвета (через запятую)</Label>
                    <Input
                      id="colors"
                      name="colors"
                      value={formData.colors}
                      onChange={handleChange}
                      placeholder="Черный, Белый, Красный"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Особенности (каждая с новой строки)</Label>
                  <Textarea
                    id="features"
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Быстросохнущая формула&#10;Отличное покрытие&#10;Устойчивость к сколам"
                  />
                </div>

                {/* Здесь можно добавить загрузку изображений */}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/admin/products">Отмена</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Сохранение..." : "Сохранить товар"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
}
