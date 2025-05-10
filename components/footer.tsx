import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Newsletter Section */}
        <div className="py-8 border-b">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-2">Подпишитесь на нашу рассылку</h3>
            <p className="text-muted-foreground mb-4">
              Подпишитесь на нашу рассылку, чтобы получать обновления, новости и эксклюзивные предложения.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input type="email" placeholder="Введите ваш email" className="sm:flex-1" />
              <Button>Подписаться</Button>
            </div>
          </div>
        </div>

        {/* Footer Main Content */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4">О КолорКрафт</h4>
            <p className="text-muted-foreground mb-4">
              Мы предоставляем высококачественные лакокрасочные материалы для энтузиастов DIY, профессионалов и
              любителей. Наша миссия — помочь вам воплотить ваше творческое видение в жизнь.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Магазин</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=Spray Paint" className="text-muted-foreground hover:text-foreground">
                  Аэрозольные краски
                </Link>
              </li>
              <li>
                <Link href="/products?category=Varnish" className="text-muted-foreground hover:text-foreground">
                  Лаки
                </Link>
              </li>
              <li>
                <Link href="/products?category=Primer" className="text-muted-foreground hover:text-foreground">
                  Грунтовки
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  Все товары
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-muted-foreground hover:text-foreground">
                  Специальные предложения
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Обслуживание клиентов</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Связаться с нами
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  Часто задаваемые вопросы
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                  Информация о доставке
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                  Возврат и обмен
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-muted-foreground hover:text-foreground">
                  Отследить заказ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Контактная информация</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">ул. Красочная 123, г. Москва, 123456</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">+7 (495) 123-45-67</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">info@colorcraft.ru</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges Section */}
        <div className="py-6 border-t">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center">
              <Truck className="h-5 w-5 mr-2 text-muted-foreground" />
              <span className="text-sm">Бесплатная доставка при заказе от 5000 ₽</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-muted-foreground" />
              <span className="text-sm">30-дневная гарантия возврата денег</span>
            </div>
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
              <span className="text-sm">Безопасная оплата</span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} КолорКрафт. Все права защищены.
          </div>
          <div className="flex gap-4 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground">
              Условия использования
            </Link>
            <Link href="/sitemap" className="text-muted-foreground hover:text-foreground">
              Карта сайта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
