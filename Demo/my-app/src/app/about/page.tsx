import React from "react";
import Sectiontwo from "@/componaint/Secondsection/Sectiontwo";
import StatsSection from "@/componaint/theredsection/StatesSection";
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
          main={"من نحن"}
          second="Fleet Gate Express"
          therd="شريكك الموثوق في النقل البري والخدمات المتكاملة، نربط المدن والشركات بحلول نقل مبتكرة وموثوقة على مدار 15 عامًا من التميز"
        ></Sectiontwo>
      </div>
      <StatsSection></StatsSection>
    </>
  );
}

export default page;
