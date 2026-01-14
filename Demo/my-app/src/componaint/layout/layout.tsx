"use client";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
// import { cn } from "@/lib/utils"; // removed unused import
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Mobile view with Tabs */}
        <div className="lg:hidden">
          <Tabs defaultValue="support" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 bg-gray-800 p-1 rounded-lg">
              <TabsTrigger
                value="support"
                className="text-xs data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded px-2 py-1.5"
              >
                الدعم
              </TabsTrigger>
              <TabsTrigger
                value="company"
                className="text-xs data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded px-2 py-1.5"
              >
                الشركة
              </TabsTrigger>
              <TabsTrigger
                value="services"
                className="text-xs data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded px-2 py-1.5"
              >
                خدماتنا
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="text-xs data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded px-2 py-1.5"
              >
                التواصل
              </TabsTrigger>
            </TabsList>

            <TabsContent value="support" className="space-y-4">
              <FooterSection title="الدعم" items={supportItems} />
            </TabsContent>

            <TabsContent value="company" className="space-y-4">
              <FooterSection title="الشركة" items={companyItems} />
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <FooterSection title="خدماتنا" items={servicesItems} />
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <ContactInfo />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop view with NavigationMenu */}
        <div className="hidden lg:block">
          <NavigationMenu className="w-full">
            <NavigationMenuList className="grid grid-cols-4 gap-8 w-full">
              <div className="space-y-4">
                <FooterSection title="الدعم" items={supportItems} />
              </div>

              <div className="space-y-4">
                <FooterSection title="الشركة" items={companyItems} />
              </div>

              <div className="space-y-4">
                <FooterSection title="خدماتنا" items={servicesItems} />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-6 text-right">
                    Fleet Gate Express
                  </h3>
                  <p className="text-gray-300 text-sm text-right mb-6 leading-relaxed">
                    حلول متكاملة سريعة، موثوقة، وتقنية للنقل البري عبر المنطقة
                    بأكملها
                  </p>
                  <div className="flex gap-4 justify-end mb-6">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                      <Phone size={20} />
                    </div>
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                      <Mail size={20} />
                    </div>
                  </div>
                </div>
                <ContactInfo />
              </div>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Fleet Gate Express. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}

interface FooterSectionProps {
  title: string;
  items: string[];
}

function FooterSection({ title, items }: FooterSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4 text-right">{title}</h3>
      <ul className="space-y-3 text-right">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-gray-300 hover:text-white text-sm transition-colors block py-1"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="space-y-4 text-right">
      <div className="flex items-center justify-end gap-3">
        <div className="text-gray-300 text-sm">
          <p className="font-semibold">الهاتف</p>
          <p>4567 123 55 966+</p>
        </div>
        <Phone size={20} className="text-gray-400" />
      </div>

      <div className="flex items-center justify-end gap-3">
        <div className="text-gray-300 text-sm">
          <p className="font-semibold">رد سريع خلال 24 ساعة</p>
        </div>
        <Clock size={20} className="text-gray-400" />
      </div>

      <div className="flex items-center justify-end gap-3">
        <div className="text-gray-300 text-sm">
          <p className="font-semibold">العنوان</p>
          <p>3 اسماعيل القباني متفرع من الطيران</p>
          <p className="text-gray-400 mt-1">المقر الرئيسي</p>
        </div>
        <MapPin size={20} className="text-gray-400" />
      </div>
    </div>
  );
}

// Data arrays
const supportItems = [
  "اتصل بنا",
  "تتبع الشحنة",
  "طلب عرض سعر",
  "الأسئلة الشائعة",
  "المستندات",
  "الشكاوى",
];

const companyItems = [
  "من نحن",
  "وظائف",
  "الأخبار",
  "الاستدامة",
  "الشركاء",
  "الشهادات",
];

const servicesItems = [
  "النقل الدولي",
  "نقل الحمولة الكاملة",
  "نقل الحمولة الجزئية",
  "النقل المبرد",
  "التوصيل السريع",
  "إدارة سلسلة للتوريد",
];
