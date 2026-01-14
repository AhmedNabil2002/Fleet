import React from "react";
import Sectiontwo from "@/componaint/Secondsection/Sectiontwo";
// import { motion } from "framer-motion"; // removed unused import
import { SlideFromLeft } from "@/componaint/animation/slide";
import ServiceCard from "@/componaint/Card/Cart";
import { MapPin, TrendingUp, Clock } from "lucide-react";
import { Form } from "@/components/ui/form";
function page() {
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(135deg, #1a1f3a 0%, #2d3561 50%, #3d4a7a 100%)",
          height: "500px",
        }}
      >
        <Sectiontwo
          main={"تواصل معنا "}
          second="نحن هنا لمساعدتك"
          therd="فريقنا متاح دائمًا للإجابة على استفساراتك وتقديم أفضل الحلول المتكاملة المناسبة لاحتياجات عملك"
        ></Sectiontwo>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
          padding: "50px 20px",
          backgroundColor: "#f9f9f9",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <SlideFromLeft>
          <ServiceCard
            icon={<MapPin size={32} strokeWidth={2} />}
            title="حلول النقل الدولي"
            description="حلول شاملة للنقل العابر للحدود مع إدارة الوثائق والامتثال التنظيمي."
            points={[
              "تخليص جمركي",
              "امتثال تنظيمي",
              "وثائق متكاملة",
              "شبكة دولية",
            ]}
          />
        </SlideFromLeft>
        <SlideFromLeft>
          <ServiceCard
            icon={<TrendingUp size={32} strokeWidth={2} />}
            title="حلول النقل بالحموله كامله "
            description="نقل متكامل للشحنات الكبيرة بشاحنات مخصصة مع تتبع ذكي وإدارة كاملة لعملية الشحن."
            points={[
              "شاحنات مخصصة",
              "تتبع مباشر",
              "إدارة متكاملة",
              "تقارير مفصلة",
            ]}
          />
        </SlideFromLeft>
        <SlideFromLeft>
          <ServiceCard
            icon={<Clock size={32} strokeWidth={2} />}
            title="حلول النقل بالحموله الجزئيه"
            description="نظام متكامل للشحنات الصغيرة والمتوسطة مع تحسين التكاليف وضمان المواعيد."
            points={[
              "توفير تكاليف",
              "جدوله مرنه ",
              "مرج الشحنات ",
              "توصيل موثوق",
            ]}
          />
        </SlideFromLeft>
          </div>
    </>
  );
}

export default page;
