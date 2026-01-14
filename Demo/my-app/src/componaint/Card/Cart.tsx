'use client'
import React from "react";
import { motion } from "framer-motion";

// Define the props interface
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  points: string[];
  iconBgColor?: string;
  titleColor?: string;
}

// Service Card Component
const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  points,
  iconBgColor = "#ff8c00",
  titleColor = "#333",
}) => {
  return (
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "40px 30px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        border: "1px solid #f0f0f0",
        textAlign: "center",
        minHeight: "450px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Icon Container */}
      <motion.div
        style={{
          width: "80px",
          color: "white",
          height: "80px",
          borderRadius: "16px",
          background: iconBgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "30px",
          boxShadow: "0 4px 15px rgba(255, 140, 0, 0.2)",
        }}
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 360, scale: 1.05 }}
        transition={{ duration: 1.2 }}
      >
        {icon}
      </motion.div>

      {/* Title */}
      <h3
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: titleColor,
          marginBottom: "15px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "1.5rem",
          color: "#666",
          lineHeight: "1.6",
          marginBottom: "25px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {description}
      </p>

      {/* Points List */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          width: "100%",
        }}
      >
        {points.map((point, index) => (
          <motion.li
            key={index}
            whileHover={{ x: -5 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "10px",
              fontSize: "0.95rem",
              color: "#555",
              marginBottom: "12px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <span>{point}</span>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#ff8c00",
                flexShrink: 0,
              }}
            />
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};
export default ServiceCard;
