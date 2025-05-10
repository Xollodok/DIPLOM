import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FeaturedProducts from "@/components/featured-products"
import { ArrowRight, Brush, ShieldCheck, Truck } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <Image
          src="/placeholder.svg?height=500&width=1200"
          alt="КолорКрафт Лакокрасочные Материалы"
          width={1200}
          height={500}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 lg:px-24 text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Качественные краски для любого проекта</h1>
          <p className="text-lg sm:text-xl mb-8 max-w-xl">
            Откройте для себя нашу премиальную коллекцию аэрозольных красок, лаков и грунтовок для воплощения ваших
            идей.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/products">
                Купить сейчас <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10" asChild>
              <Link href="/about">Узнать больше</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают КолорКрафт?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Brush className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Премиальное качество</h3>
              <p className="text-muted-foreground">
                Все наши продукты тщательно разработаны для обеспечения исключительных результатов с долговечным
                покрытием.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-muted-foreground">
                Наслаждайтесь быстрой доставкой благодаря нашему эффективному процессу отправки. Получайте товары, когда
                они вам нужны.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-muted-foreground">
                Не довольны покупкой? Наша 30-дневная гарантия возврата денег защищает вас.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12 bg-slate-50 dark:bg-slate-900">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Популярные товары</h2>
          <Button variant="outline" asChild>
            <Link href="/products">Все товары</Link>
          </Button>
        </div>
        <FeaturedProducts />
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы начать свой проект?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Просмотрите наш обширный каталог премиальных лакокрасочных материалов и получите именно то, что вам нужно
            для вашего следующего творения.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/products">Купить сейчас</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
