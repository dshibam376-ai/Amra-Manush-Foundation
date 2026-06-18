import React, { useEffect } from 'react';
import { motion, useMotionValue, animate, useTransform } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
}

export default function AnimatedCounter({ value }: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString('en-IN'));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}
