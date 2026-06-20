import React, { useEffect } from 'react';
import { motion, useMotionValue, animate, useTransform } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  language?: 'en' | 'bn';
}

export default function AnimatedCounter({ value, language = 'en' }: AnimatedCounterProps) {
  const count = useMotionValue(0);
  
  const toBnNo = (numStr: string) => {
    if (language !== 'bn') return numStr;
    const map: Record<string, string> = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
      ',': ','
    };
    return numStr.split('').map(char => map[char] || char).join('');
  };

  const rounded = useTransform(count, (latest) => {
    const formatted = Math.round(latest).toLocaleString('en-IN');
    return toBnNo(formatted);
  });

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}
