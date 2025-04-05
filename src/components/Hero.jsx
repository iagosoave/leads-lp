import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ebook from './ebook.png';
import ato from './ato.png';

export const Hero = () => {
  const scrollToLeadCapture = () => {
    const leadCaptureSection = document.getElementById('lead-form');
    if (leadCaptureSection) {
      leadCaptureSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 lg:py-20 relative">
      {/* Center Logo - Positioned on top and centered on all devices */}
      <motion.div 
        className="flex justify-center mb-6 md:mb-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img
          src={ato}
          alt="Método ATO Logo"
          className="w-auto h-auto max-h-24 md:max-h-32 object-contain"
        />
      </motion.div>
      
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Left side - CTA */}
        <motion.div
          className="w-full lg:w-5/12 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="text-white block">Multiplique seu Impacto</span>
            <span className="text-amber-500 block">Como Mentor Atômico</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0">
            Desbloqueie estratégias revolucionárias para transformar seu conhecimento 
            em um negócio de mentoria de alto impacto e alta performance.
          </p>
          
          <motion.button
            onClick={scrollToLeadCapture}
            className="bg-amber-500 text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg flex items-center gap-2 mx-auto lg:mx-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mx-auto lg:mx-0">Começar Minha Transformação</span>
            <ArrowRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>
        </motion.div>
        
        {/* Right side - E-book image */}
        <motion.div
          className="w-full lg:w-5/12 mt-8 lg:mt-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img
            src={ebook}
            alt="E-book Método ATO"
            className="w-full max-w-sm mx-auto drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
};