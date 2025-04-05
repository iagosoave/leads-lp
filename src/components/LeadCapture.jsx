import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Target, Coins, Mail, User, ArrowRight, CheckCircle2, AlertCircle, Lock } from 'lucide-react';

export const LeadCapture = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false
    });

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus({
        isSubmitting: false,
        isSuccess: true,
        isError: false
      });

      setFormData({
        name: '',
        email: ''
      });
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 py-20 md:py-28" id="lead-form">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="text-white">Receba Gratuitamente o</span>
              <span className="block text-amber-400 mt-2">E-book do Método ATO</span>
            </h2>
            <p className="text-slate-300 text-lg mt-4 max-w-2xl mx-auto">
              Descubra os primeiros passos para se tornar um mentor atômico
            </p>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Left side - Features */}
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-slate-300 mb-10">
                Descubra os primeiros passos para se tornar um mentor atômico 
                e revolucionar sua forma de compartilhar conhecimento.
              </p>
              
              <div className="space-y-8">
                {[
                  {
                    icon: BookOpen,
                    title: "Estratégias comprovadas",
                    description: "Métodos testados pelos maiores mentores do mercado",
                    color: "text-amber-400",
                    bgColor: "bg-slate-800"
                  },
                  {
                    icon: Target,
                    title: "Estruturação de conteúdo",
                    description: "Organize seu conhecimento de forma impactante",
                    color: "text-amber-400",
                    bgColor: "bg-slate-800"
                  },
                  {
                    icon: Coins,
                    title: "Monetização inteligente",
                    description: "Como precificar e vender sua mentoria",
                    color: "text-amber-400",
                    bgColor: "bg-slate-800"
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.2 
                    }}
                    viewport={{ once: true }}
                  >
                    <div className={`${feature.bgColor} border-2 border-amber-400 rounded-full p-3 mr-6 shadow-lg group-hover:shadow-xl transition-all`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-medium ${feature.color}`}>{feature.title}</h3>
                      <p className="text-slate-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Right side - Form */}
            <motion.div 
              className="w-full lg:w-5/12 mt-12 lg:mt-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-white/10 backdrop-blur-lg p-8 md:p-10 rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-400/10 opacity-20 -z-10"></div>
                
                {/* Animated background elements */}
                <motion.div 
                  className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                ></motion.div>

                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-2 text-center">
                      Método ATO: Transformação Completa
                    </h3>
                    <p className="text-center text-slate-300 mb-8 text-sm">
                      Preencha seus dados e desbloqueie conhecimento exclusivo
                    </p>
                  </motion.div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="text-slate-400 group-focus-within:text-amber-500 h-5 w-5 transition-all duration-300" />
                      </div>
                      <motion.input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        required
                        initial={{ boxShadow: '0 0 0 0 rgba(0,0,0,0)' }}
                        whileFocus={{ 
                          boxShadow: '0 0 0 4px rgba(245, 158, 11, 0.2)',
                          transition: { duration: 0.3 }
                        }}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/20 backdrop-blur-lg border-2 border-white/30 focus:border-amber-400 focus:outline-none text-white placeholder-slate-300 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="text-slate-400 group-focus-within:text-amber-500 h-5 w-5 transition-all duration-300" />
                      </div>
                      <motion.input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Seu melhor e-mail"
                        required
                        initial={{ boxShadow: '0 0 0 0 rgba(0,0,0,0)' }}
                        whileFocus={{ 
                          boxShadow: '0 0 0 4px rgba(245, 158, 11, 0.2)',
                          transition: { duration: 0.3 }
                        }}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/20 backdrop-blur-lg border-2 border-white/30 focus:border-amber-400 focus:outline-none text-white placeholder-slate-300 transition-all duration-300"
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={formStatus.isSubmitting}
                      className="relative w-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 py-4 rounded-xl font-bold text-lg flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {formStatus.isSubmitting ? (
                        <div className="flex items-center">
                          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </div>
                      ) : (
                        <>
                          Receber E-book Agora
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                  
                  <AnimatePresence>
                    {formStatus.isSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6 bg-green-500/20 border border-green-500/40 text-green-300 px-4 py-3 rounded-xl flex items-center"
                      >
                        <CheckCircle2 className="h-6 w-6 mr-3 text-green-400" />
                        <span>E-book enviado com sucesso! Verifique seu email.</span>
                      </motion.div>
                    )}
                    
                    {formStatus.isError && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6 bg-red-500/20 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl flex items-center"
                      >
                        <AlertCircle className="h-6 w-6 mr-3 text-red-400" />
                        <span>Erro ao enviar. Por favor, tente novamente.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="mt-8 text-center">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="inline-flex items-center justify-center bg-green-100/30 text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-4"
                    >
                      <span className="block h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                      <span>+520 pessoas já baixaram</span>
                    </motion.div>
                    <p className="text-xs text-slate-400 mt-2 flex items-center justify-center">
                      <Lock className="h-4 w-4 mr-2 text-slate-500" />
                      Seus dados estão 100% seguros conosco
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};