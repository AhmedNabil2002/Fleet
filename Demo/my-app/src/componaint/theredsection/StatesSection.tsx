'use client';

import React from 'react';
import { Package, TrendingUp, MapPin, Clock, Users, Truck } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  title: string;
  subtitle: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, number, title, subtitle }) => {
  return (
    <div style={{
      position: 'relative',
    }}>
      {/* Card */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '24px',
        padding: '32px',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      >
        {/* Icon */}
        <div style={{
          width: '64px',
          height: '64px',
          backgroundColor: 'white',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          transition: 'transform 0.3s ease',
        }}>
          <div style={{ color: '#ff6b35' }}>
            {icon}
          </div>
        </div>

        {/* Number */}
        <div style={{
          color: 'white',
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
        }}>
          {number}
        </div>

        {/* Title */}
        <h3 style={{
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '8px',
        }}>
          {title}
        </h3>

        {/* Subtitle */}
        <p style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '1rem',
        }}>
          {subtitle}
        </p>

        {/* Decorative dot */}
        <div style={{
          width: '8px',
          height: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '50%',
          marginTop: '16px',
        }}></div>
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <Package size={32} strokeWidth={2} />,
      number: '٩٨%',
      title: 'رضا العملاء',
      subtitle: 'معدل التقييم',
    },
    {
      icon: <TrendingUp size={32} strokeWidth={2} />,
      number: '+١٣٠,٠٠٠',
      title: 'كيلومتر مسافة',
      subtitle: 'قطعت شهرياً',
    },
    {
      icon: <MapPin size={32} strokeWidth={2} />,
      number: '+٥٠',
      title: 'مدينة مغطاة',
      subtitle: 'في جميع أنحاء المنطقة',
    },
    {
      icon: <Clock size={32} strokeWidth={2} />,
      number: '٩٩.٥%',
      title: 'التزام بالمواعيد',
      subtitle: 'نسبة الدقة في التسليم',
    },
    {
      icon: <Users size={32} strokeWidth={2} />,
      number: '+٥٠٠',
      title: 'عميل راض',
      subtitle: 'يثقون بخدماتنا',
    },
    {
      icon: <Truck size={32} strokeWidth={2} />,
      number: '+١٥,٠٠٠',
      title: 'شحنة مكتملة',
      subtitle: 'تم تسليمها بنجاح',
    },
  ];

  return (
    <section style={{
      position: 'relative',
      padding: '80px 0',
      background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 50%, #ffa94d 100%)',
      overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '40px',
        width: '128px',
        height: '128px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(60px)',
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '80px',
        right: '40px',
        width: '160px',
        height: '160px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(60px)',
      }}></div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '64px',
        }}>
          <h2 style={{
            color: 'white',
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '16px',
          }}>
            أرقام تتحدث عن نجاحنا
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.25rem',
          }}>
            إنجازاتنا وأرقامنا تعكس التزامنا بالتميز في كل شحنة
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              number={stat.number}
              title={stat.title}
              subtitle={stat.subtitle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;