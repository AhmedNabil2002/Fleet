'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
interface Props {
  children: ReactNode;
}
export function SlideFromRight({ children }:Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once:false }}
    >
      {children}
    </motion.div>
  );
}