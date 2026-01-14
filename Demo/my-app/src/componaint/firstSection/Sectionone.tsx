'use client'
import React from 'react'
import "./Sectionone.css"
function Sectionone() {
  return (
      <div>
           <section className={"hero-section"}>
        <div className={"hero-overlay"}></div>
        <div className={"hero-content"}>
            <h1 className={"hero-title"}>
                بوابتك للشحن الآمن حول العالم
                <span className={"title-underline"}></span>
            </h1>
            
            <div className={"hero-subtitle-wrapper"}>
                <span className={"decorative-line"}></span>
                <h2 className={"hero-subtitle"}>تتبع شحنتك في الوقت الحقيقي</h2>
                <span className={"decorative-line"}></span>
            </div>
            
            <p className={"hero-description"}>
                أدخل رقم التتبع الخاص بك للحصول على تحديثات فورية حول حالة شحنتك
            </p>
            
            <div className={"tracking-form"}>
                <input 
                    type="text" 
                    className={"tracking-input"} 
                    placeholder="(مثال: FGE1234567890)"
                    dir="ltr"
                />
                <button className={"tracking-button"}>
                    <svg className={"search-icon"} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                </button>
                <button className={"submit-button"}>تتبع الشحنة</button>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Sectionone