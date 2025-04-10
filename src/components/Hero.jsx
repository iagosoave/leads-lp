import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ebook from './ebook.png';
import ato from './ato.png';
import criador from './Cristofer.jpeg';

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
            <span className="text-white block">Transforme o que você sabe</span>
            <span className="text-amber-500 block">em uma fonte de renda recorrente</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0">
            Um guia prático e direto ao ponto para quem quer sair do conteúdo gratuito e começar a lucrar 
            com mentorias estruturadas — mesmo sem ser "famoso".
          </p>
          
          <motion.button
            onClick={scrollToLeadCapture}
            className="bg-amber-500 text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg flex items-center gap-2 mx-auto lg:mx-0 mb-6 md:mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mx-auto lg:mx-0">Quero meu e-book gratuito</span>
            <ArrowRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>
          
          {/* Author info below CTA button */}
          <motion.div
            className="flex items-start max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="flex-shrink-0 mr-4">
              <img
                src={criador}
                alt="Cristofer Leone"
                className="w-16 h-16 rounded-full object-contain bg-slate-900/80 p-1 border-2 border-amber-500"
              />
            </div>
            <div className="text-left">
              <p className="text-amber-500 text-xs font-medium uppercase tracking-wide">Autor</p>
              <p className="text-white text-base font-bold">Cristofer Leone</p>
              <p className="text-slate-300 text-sm">
                Mentor com <span className="font-medium">mais de 20 anos de experiência</span> em desenvolvimento humano e liderança no Brasil.
                Criador do <span className="font-medium">Método ATO</span> que já transformou a vida de <span className="font-medium">+500</span> profissionais.
              </p>
            </div>
          </motion.div>
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