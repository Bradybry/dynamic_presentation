'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideTransitionProps {
  children: React.ReactNode;
  direction: number;
  slideKey: number;
}

export const SlideTransition: React.FC<SlideTransitionProps> = ({ 
  children, 
  direction, 
  slideKey 
}) => {
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,  // Reduced distance
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,  // Reduced distance
      opacity: 0
    })
  };

  return (
    <div className="relative h-full w-full">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={slideKey}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 400, damping: 35 },  // Increased stiffness and damping
            opacity: { duration: 0.15 }  // Reduced opacity transition time
          }}
          className="absolute inset-0 w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};