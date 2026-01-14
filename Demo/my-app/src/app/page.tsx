"use client";
import React from "react";
import Sectionone from "@/componaint/firstSection/Sectionone";
import Sectiontwo from "@/componaint/Secondsection/Sectiontwo";
import ServiceCard from "@/componaint/Card/Cart";
import StatsSection from "@/componaint/theredsection/StatesSection";
import { motion } from "framer-motion";
import { SlideFromLeft } from "@/componaint/animation/slide";
import { SlideFromRight } from "@/componaint/animation/right";
import { Package, MapPin, TrendingUp, Clock } from "lucide-react";
// import  {Footer}  from '@/componaint/layout/layout';
function page() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Sectionone></Sectionone>
      <Sectiontwo
        main={"حلول متكامله"}
        second="حلول النقل المتكامل"
        therd="نقدم نظاماً متكاملاً للنقل البري يدير كافة جوانب شحنتك من البداية إلى النهاية"
      ></Sectiontwo>
      <motion.div
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
        <SlideFromLeft>
          <ServiceCard
            icon={<Package size={32} strokeWidth={2} />}
            title="حلول النقل بالتبريد"
            description="نظام نقل متكامل للبضائع الحساسة مع مراقبة مستمرة وضبط دقيق لدرجات الحرارة."
            points={["تواصل مستمر ", "سرعه شحن", "وصول لاي مكان", "تتبع مكان"]}
          />
        </SlideFromLeft>
        <SlideFromLeft>
          <ServiceCard
            icon={
              <svg
                className={"search-icon"}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              ></svg>
            }
            title="حلول النقل السريع "
            description="نظام للشحنات العاجلة مع مسارات مخصصة و توصيل فوري ."
            points={["محافظه علي الشحنه ", "تحلي بيانات", "وصول سريع"]}
          />
        </SlideFromLeft>
        <SlideFromLeft>
          <ServiceCard
            icon={<Package size={32} strokeWidth={2} />}
            title="حلول اداره التوريد"
            description="نظام متكامل لإدارة كامله للتوريد من التخزين إلى التوزيع النهائي."
            points={[
              "متابعه مستمره",
              "تحليل بيانات",
              "توزيع استراتيجي",
              "تتخزين زكي ",
            ]}
          />
        </SlideFromLeft>
      </motion.div>
      <Sectiontwo
        main="لماذا تختارنا؟"
        second="لماذا تختارFleet Gate Express؟"
        therd="اختبر الفرق مع نهجنا القائم على التكنولوجيا والجودة في مجال النقل البري"
      ></Sectiontwo>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "30px",
          padding: "50px 20px",
          backgroundColor: "#f9f9f9",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <SlideFromRight>
          <ServiceCard
            icon={<MapPin size={32} strokeWidth={2} />}
            title="حلول اداره التوريد"
            description="نظام متكامل لإدارة كامله للتوريد من التخزين إلى التوزيع النهائي."
            points={[
              "متابعه مستمره",
              "تحليل بيانات",
              "توزيع استراتيجي",
              "تتخزين زكي ",
            ]}
          />
        </SlideFromRight>
        <SlideFromRight>
          <ServiceCard
            icon={<TrendingUp size={32} strokeWidth={2} />}
            title="حلول اداره التوريد"
            description="نظام متكامل لإدارة كامله للتوريد من التخزين إلى التوزيع النهائي."
            points={[
              "متابعه مستمره",
              "تحليل بيانات",
              "توزيع استراتيجي",
              "تتخزين زكي ",
            ]}
          />
        </SlideFromRight>
        <SlideFromRight>
          <ServiceCard
            icon={<Clock size={32} strokeWidth={2} />}
            title="حلول اداره التوريد"
            description="نظام متكامل لإدارة كامله للتوريد من التخزين إلى التوزيع النهائي."
            points={[
              "متابعه مستمره",
              "تحليل بيانات",
              "توزيع استراتيجي",
              "تتخزين زكي ",
            ]}
          />
        </SlideFromRight>
        <SlideFromRight>
          <ServiceCard
            icon={<Package size={32} strokeWidth={2} />}
            title="حلول اداره التوريد"
            description="نظام متكامل لإدارة كامله للتوريد من التخزين إلى التوزيع النهائي."
            points={[
              "متابعه مستمره",
              "تحليل بيانات",
              "توزيع استراتيجي",
              "تتخزين زكي ",
            ]}
          />
        </SlideFromRight>
        <SlideFromRight>
          <ServiceCard
            title="حلول اداره التوريد"
            icon={<Package size={32} strokeWidth={2} />}
            description="نظام متكامل لإدارة كامله للتوريد من التخزين إلى التوزيع النهائي."
            points={[
              "متابعه مستمره",
              "تحليل بيانات",
              "توزيع استراتيجي",
              "تتخزين زكي ",
            ]}
          />
        </SlideFromRight>
        <SlideFromRight>
          <ServiceCard
            icon={<Package size={32} strokeWidth={2} />}
            title="حلول اداره التوريد"
            description="نظام متكامل لإدارة كامله للتوريد من التخزين إلى التوزيع النهائي."
            points={[
              "متابعه مستمره",
              "تحليل بيانات",
              "توزيع استراتيجي",
              "تتخزين زكي ",
            ]}
          />
        </SlideFromRight>
        <SlideFromRight>
          <ServiceCard
            icon={<TrendingUp size={32} strokeWidth={2} />}
            title="حلول اداره التوريد"
            description="نظام متكامل لإدارة كامله للتوريد من التخزين إلى التوزيع النهائي."
            points={[
              "متابعه مستمره",
              "تحليل بيانات",
              "توزيع استراتيجي",
              "تتخزين زكي ",
            ]}
          />
        </SlideFromRight>
        <SlideFromRight>
          <ServiceCard
            icon={<MapPin size={32} strokeWidth={2} />}
            title="حلول اداره التوريد"
            description="نظام متكامل لإدارة كامله للتوريد من التخزين إلى التوزيع النهائي."
            points={[
              "متابعه مستمره",
              "تحليل بيانات",
              "توزيع استراتيجي",
              "تتخزين زكي ",
            ]}
          />
        </SlideFromRight>
      </div>
      <StatsSection></StatsSection>
      {/* <Footer></Footer> */}
    </motion.div>
  );
}

export default page;
