import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  BookOpen, 
  Star, 
  Zap 
} from 'lucide-react';

export const Popup = () => {
  const [currentPopupIndex, setCurrentPopupIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  
  // Popup configurations focused on e-book
  const popupConfigs = [
    {
      icon: <Download className="h-10 w-10 text-amber-500" />,
      title: 'E-book Grátis: Método ATO',
      message: 'Descubra os segredos para se tornar um mentor de alto impacto!',
      details: 'Conteúdo exclusivo para transformar sua carreira'
    },
    {
      icon: <BookOpen className="h-10 w-10 text-green-500" />,
      title: 'Mentoria Atômica Revelada',
      message: 'Aprenda estratégias que multiplicam seu alcance como mentor',
      details: 'Insights de especialistas para sua evolução'
    },
    {
      icon: <Star className="h-10 w-10 text-purple-500" />,
      title: 'Conteúdo Exclusivo Liberado',
      message: 'Técnicas comprovadas para destacar-se no mercado de mentoria',
      details: 'Material desenvolvido por top mentores'
    },
    {
      icon: <Zap className="h-10 w-10 text-blue-500" />,
      title: 'Transformação em Suas Mãos',
      message: 'Método ATO: O guia definitivo para mentores de sucesso',
      details: 'Estratégias para impactar e conquistar resultados'
    }
  ];

  useEffect(() => {
    // Show first popup after 3 seconds
    const initialTimer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    // Set up interval to cycle through popups
    const popupCycleTimer = setInterval(() => {
      // Close current popup
      setShowPopup(false);

      // Wait for exit animation before showing next popup
      setTimeout(() => {
        // Cycle to next popup
        setCurrentPopupIndex((prevIndex) => 
          (prevIndex + 1) % popupConfigs.length
        );
        
        // Show new popup
        setShowPopup(true);
      }, 300); // Slight delay to allow exit animation
    }, 10000); // 10 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(popupCycleTimer);
    };
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  // Get current popup configuration
  const currentPopup = popupConfigs[currentPopupIndex];

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div 
          className="fixed bottom-5 right-5 z-50 w-[calc(100%-2.5rem)] max-w-md mx-auto"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <div 
            className="
              bg-gradient-to-br from-slate-900 to-slate-800 
              rounded-xl shadow-2xl border border-white/10 
              overflow-hidden relative
              p-5
            "
          >
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-3 right-3 text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-4">
              {/* Icon */}
              <div>
                {currentPopup.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">
                  {currentPopup.title}
                </h3>
                <p className="text-sm text-slate-300 mb-1">
                  {currentPopup.message}
                </p>
                <p className="text-xs text-slate-400">
                  {currentPopup.details}
                </p>
              </div>
            </div>

            {/* Time Indicator */}
            <motion.div 
              key={currentPopupIndex}
              className="absolute bottom-0 left-0 h-1 bg-amber-500"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 10, ease: "linear" }}
              onAnimationComplete={handleClose}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};