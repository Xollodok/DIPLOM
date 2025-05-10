import type { Product } from "@/types"

// Mock product data
const products: Product[] = [
  {
    id: "sp-001",
    name: "Премиальная глянцевая аэрозольная краска",
    description: "Высококачественная глянцевая аэрозольная краска для гладкого, профессионального покрытия.",
    fullDescription:
      "Наша премиальная глянцевая аэрозольная краска обеспечивает исключительное, прочное покрытие на различных поверхностях. Разработана для быстрого высыхания и отличного покрытия, эта краска идеально подходит для DIY-проектов, ремесел и профессионального применения.",
    price: 899.99,
    oldPrice: 1099.99,
    category: "Аэрозольная краска",
    inventory: 25,
    rating: 4.5,
    reviews: 128,
    colors: ["Черный", "Белый", "Красный", "Синий", "Зеленый", "Желтый"],
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    features: [
      "Быстросохнущая формула",
      "Отличное покрытие",
      "Устойчивость к сколам и выцветанию",
      "Для внутреннего и наружного применения",
      "Удобное нанесение с комфортным наконечником",
    ],
    specifications: {
      size: "400мл",
      coverage: "2 кв. метра на баллон",
      dryTime: "15-20 минут",
      finish: "Глянцевый",
      application: "Распыление",
      use: "Внутри/Снаружи",
    },
    createdAt: "2023-01-15T00:00:00Z",
  },
  {
    id: "sp-002",
    name: "Матовая черная аэрозольная краска",
    description: "Премиальная матовая черная аэрозольная краска для современного, изысканного покрытия.",
    price: 999.99,
    category: "Аэрозольная краска",
    inventory: 8,
    rating: 4.7,
    reviews: 95,
    colors: ["Черный"],
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    features: [
      "Современное матовое покрытие",
      "Превосходное покрытие",
      "Быстрое высыхание",
      "Не требует грунтовки на большинстве поверхностей",
    ],
    createdAt: "2023-02-10T00:00:00Z",
  },
  {
    id: "sp-003",
    name: "Металлическая золотая аэрозольная краска",
    description: "Роскошная металлическая золотая аэрозольная краска для богатого, премиального покрытия.",
    price: 1199.99,
    category: "Аэрозольная краска",
    inventory: 15,
    rating: 4.8,
    reviews: 63,
    colors: ["Золотой"],
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    features: [
      "Аутентичный металлический вид",
      "Долговечный блеск",
      "Устойчивость к потускнению",
      "Отлично подходит для декоративных проектов",
    ],
    createdAt: "2023-03-05T00:00:00Z",
  },
  {
    id: "vn-001",
    name: "Прозрачный глянцевый лак",
    description: "Защитный прозрачный лак для прочного, высокоглянцевого покрытия.",
    price: 1399.99,
    category: "Лак",
    inventory: 20,
    rating: 4.6,
    reviews: 74,
    colors: ["Прозрачный"],
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    features: ["Кристально чистое покрытие", "УФ-защита", "Водостойкость", "Подчеркивает естественную текстуру дерева"],
    createdAt: "2023-01-20T00:00:00Z",
  },
  {
    id: "vn-002",
    name: "Лак с сатиновым покрытием",
    description: "Премиальный лак, обеспечивающий красивое сатиновое покрытие.",
    price: 1499.99,
    category: "Лак",
    inventory: 12,
    rating: 4.4,
    reviews: 52,
    colors: ["Прозрачный"],
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    features: ["Элегантный сатиновый блеск", "Превосходная защита", "Устойчивость к царапинам", "Легкое нанесение"],
    createdAt: "2023-02-15T00:00:00Z",
  },
  {
    id: "pr-001",
    name: "Универсальная грунтовка",
    description: "Универсальная грунтовка, которая прилипает к различным поверхностям для лучшего сцепления краски.",
    price: 1299.99,
    category: "Грунтовка",
    inventory: 30,
    rating: 4.5,
    reviews: 88,
    colors: ["Белый", "Серый"],
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    features: [
      "Работает на дереве, металле, пластике и других материалах",
      "Создает гладкую поверхность для покраски",
      "Блокирует пятна",
      "Быстросохнущая формула",
    ],
    createdAt: "2023-01-25T00:00:00Z",
  },
  {
    id: "pr-002",
    name: "Антикоррозийная грунтовка",
    description: "Специализированная грунтовка, предотвращающая ржавчину на металлических поверхностях.",
    price: 1399.99,
    category: "Грунтовка",
    inventory: 18,
    rating: 4.7,
    reviews: 45,
    colors: ["Красный"],
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    features: [
      "Предотвращает образование ржавчины",
      "Отличное сцепление с металлом",
      "Продлевает срок службы краски",
      "Для внутреннего и наружного применения",
    ],
    createdAt: "2023-03-10T00:00:00Z",
  },
  {
    id: "sp-004",
    name: "Аэрозольная краска с меловым покрытием",
    description: "Ультраматовая меловая аэрозольная краска для винтажных и шебби-шик проектов.",
    price: 1099.99,
    category: "Аэрозольная краска",
    inventory: 22,
    rating: 4.3,
    reviews: 37,
    colors: ["Белый", "Бежевый", "Серый", "Черный"],
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    features: [
      "Ультраматовое меловое покрытие",
      "Не требует шлифовки или грунтовки",
      "Легко состаривается для винтажного вида",
      "Формула с низким запахом",
    ],
    createdAt: "2023-04-05T00:00:00Z",
  },
]

// Get all products
export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products
}

// Get a single product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products.find((product) => product.id === id)
}

// Get related products based on category
export async function getRelatedProducts(category: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products.filter((product) => product.category === category)
}

// Get featured products for homepage
export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  // Return a subset of products as featured
  return products.slice(0, 4)
}

// Add a new product (mock implementation)
export async function addProduct(product: Omit<Product, "id" | "createdAt">): Promise<Product> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newProduct: Product = {
    ...product,
    id: `prod-${Math.random().toString(36).substring(2, 9)}`,
    createdAt: new Date().toISOString(),
  }

  // In a real app, this would add to a database
  products.push(newProduct)

  return newProduct
}

// Delete a product (mock implementation)
export async function deleteProduct(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = products.findIndex((product) => product.id === id)
  if (index !== -1) {
    products.splice(index, 1)
    return true
  }

  return false
}

// Update a product (mock implementation)
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = products.findIndex((product) => product.id === id)
  if (index !== -1) {
    products[index] = { ...products[index], ...updates }
    return products[index]
  }

  return undefined
}
