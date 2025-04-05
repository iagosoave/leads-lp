import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export const TopBar = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isSticky, setIsSticky] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsSticky(latest > 100);
  });

  useEffect(() => {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 3);
    countdownDate.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = countdownDate.getTime() - now.getTime();

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => time.toString().padStart(2, '0');

  return (
    <motion.div
      className={`
        ${isSticky 
          ? 'fixed top-0 left-0 right-0 z-50 shadow-lg' 
          : 'sticky top-0 z-50'
        } 
        bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800
        py-4 px-4 flex items-center justify-center 
        text-white font-medium
        border-b border-amber-400/20
      `}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 120, 
        damping: 20 
      }}
    >
      <div className="max-w-6xl w-full mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <span className="text-sm sm:text-base font-semibold mr-4">
            E-book Método ATO: Oferta Exclusiva
          </span>

          {/* Countdown */}
          <div className="flex items-center space-x-1">
            {[
              { value: timeLeft.days, label: 'Dias' },
              { value: timeLeft.hours, label: 'Hrs' },
              { value: timeLeft.minutes, label: 'Min' },
              { value: timeLeft.seconds, label: 'Seg' }
            ].map(({ value, label }, index) => (
              <div 
                key={label}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 flex flex-col items-center"
              >
                <span className="text-xs sm:text-sm font-bold text-amber-400">
                  {formatTime(value)}
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:block">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Time Indicator */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-amber-400"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 10, ease: "linear" }}
      />
    </motion.div>
  );
};