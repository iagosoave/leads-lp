import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Download, ChevronRight } from 'lucide-react';

export const FloatingForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    // Show popup when page loads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // 2 seconds delay to not be too aggressive

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically handle form submission
    // For now, we'll just log the data and close the form
    console.log('Form submitted:', formData);
    
    handleClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md bg-slate-800 rounded-xl shadow-2xl border border-amber-500/30 overflow-hidden relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white bg-slate-700 hover:bg-slate-600 rounded-full p-2 z-10"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Header */}
            <div className="bg-amber-500 p-4 flex items-center">
              <Download className="h-6 w-6 text-slate-900 mr-2" />
              <h3 className="font-bold text-lg text-slate-900">E-book Grátis do Método ATO</h3>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-white mb-4 text-center">
                Preencha os campos abaixo para receber imediatamente nosso e-book exclusivo!
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome"
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Seu e-mail"
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-amber-500 text-slate-900 py-3 rounded-lg font-bold flex items-center justify-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Baixar Agora
                  <ChevronRight className="ml-2 h-5 w-5" />
                </motion.button>
              </form>

              <div className="flex items-center justify-center mt-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    78 pessoas baixaram hoje
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};