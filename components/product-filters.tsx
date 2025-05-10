"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

type ProductFiltersProps = {
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
}

export default function ProductFilters({ selectedCategories, onCategoryChange }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 5000])

  const categories = [
    { id: "spray-paint", name: "Аэрозольная краска" },
    { id: "varnish", name: "Лак" },
    { id: "primer", name: "Грунтовка" },
  ]

  const colors = [
    { id: "black", name: "Черный" },
    { id: "white", name: "Белый" },
    { id: "red", name: "Красный" },
    { id: "blue", name: "Синий" },
    { id: "green", name: "Зеленый" },
    { id: "yellow", name: "Желтый" },
    { id: "gold", name: "Золотой" },
    { id: "silver", name: "Серебряный" },
  ]

  const finishes = [
    { id: "gloss", name: "Глянцевый" },
    { id: "matte", name: "Матовый" },
    { id: "satin", name: "Сатиновый" },
    { id: "metallic", name: "Металлик" },
    { id: "chalk", name: "Меловой" },
  ]

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category))
    } else {
      onCategoryChange([...selectedCategories, category])
    }
  }

  // In a real app, these filters would update the product list
  // For now, only the category filter is fully implemented

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Фильтры</h3>
        <Button variant="outline" size="sm" className="w-full" onClick={() => onCategoryChange([])}>
          Очистить все фильтры
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Категории</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={() => handleCategoryChange(category.name)}
                  />
                  <Label htmlFor={`category-${category.id}`} className="text-sm">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Диапазон цен</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={priceRange} max={5000} step={100} onValueChange={setPriceRange} />
              <div className="flex items-center justify-between">
                <span className="text-sm">{priceRange[0]} ₽</span>
                <span className="text-sm">{priceRange[1]} ₽</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors">
          <AccordionTrigger>Цвета</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {colors.map((color) => (
                <div key={color.id} className="flex items-center space-x-2">
                  <Checkbox id={`color-${color.id}`} />
                  <Label htmlFor={`color-${color.id}`} className="text-sm">
                    {color.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="finish">
          <AccordionTrigger>Покрытие</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {finishes.map((finish) => (
                <div key={finish.id} className="flex items-center space-x-2">
                  <Checkbox id={`finish-${finish.id}`} />
                  <Label htmlFor={`finish-${finish.id}`} className="text-sm">
                    {finish.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
