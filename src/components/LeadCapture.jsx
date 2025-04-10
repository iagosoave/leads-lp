import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Target, Coins, Mail, User, ArrowRight, CheckCircle2, AlertCircle, Lock, CheckCircle } from 'lucide-react';
import juliana from './juliana.jpeg';

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
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 py-16 md:py-24" id="lead-form">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section title */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="text-white">Baixe o e-book gratuito:</span>
              <span className="block text-amber-400 mt-2">"O Caminho para Transformar seu Conhecimento em uma Mentoria Lucrativa"</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
              Um roteiro estratégico para transformar seu conhecimento em um modelo de negócio rentável através de mentorias que geram resultados reais.
            </p>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16">
            {/* Left side - Features */}
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl text-white font-semibold mb-6">
                O que você vai aprender neste e-book gratuito:
              </h3>
              
              <div className="space-y-4 sm:space-y-5 mb-8">
                {[
                  {
                    text: "Como identificar o seu diferencial e posicionar sua experiência como um método."
                  },
                  {
                    text: "O mapa do método ATO para estruturar mentorias com clareza e propósito."
                  },
                  {
                    text: "As principais armadilhas que impedem coaches, consultores e especialistas de viver da própria mentoria."
                  },
                  {
                    text: "Ferramentas práticas para sair da ideia e entrar em ação — ainda esta semana."
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.15
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-slate-800 border border-amber-400 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-amber-400" />
                    </div>
                    <p className="text-slate-300">{item.text}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-8 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 bg-slate-800 relative">
                      <div className="w-full h-auto aspect-[4/5] md:h-full relative">
                        <img 
                          src={juliana}
                          alt="Juliana Ribeiro" 
                          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-800/90 md:bg-gradient-to-r md:from-transparent md:to-slate-800/90"></div>
                      </div>
                    </div>
                    
                    <div className="p-5 md:p-6 md:w-1/2 relative flex flex-col justify-center">
                      <svg className="text-amber-400/10 h-12 w-12 absolute top-3 left-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      
                      <div className="relative z-10">
                        <p className="text-slate-200 text-lg font-light leading-relaxed italic">
                          "Esse e-book clareou meu posicionamento. Já estou com minha primeira turma em andamento."
                        </p>
                        
                        <div className="flex items-center mt-4 border-t border-slate-700/30 pt-4">
                          <p className="text-amber-400 font-medium">Juliana Ribeiro</p>
                          <span className="mx-2 text-slate-600">|</span>
                          <p className="text-slate-300 text-sm">Mentora de Comunicação</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 sm:p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white text-lg font-medium mb-4">Este e-book é ideal para quem:</h4>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mr-2 mt-2 flex-shrink-0"></span>
                    <span>Sente que tem muito conhecimento, mas não consegue monetizar.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mr-2 mt-2 flex-shrink-0"></span>
                    <span>Já tentou vender mentorias, mas sem método, não foi pra frente.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mr-2 mt-2 flex-shrink-0"></span>
                    <span>Quer viver de propósito, com liberdade e impacto real.</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
            
            {/* Right side - Form */}
            <motion.div 
              className="w-full lg:w-5/12 mt-8 lg:mt-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-white/10 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
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
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
                      Você não precisa de mais conteúdo aleatório.<br/> 
                      <span className="text-amber-400">Precisa de direção.</span>
                    </h3>
                    <p className="text-slate-300 text-center mb-6 text-sm sm:text-base">
                      Baixe agora o e-book e dê o primeiro passo para transformar seu conhecimento em uma mentoria lucrativa.
                    </p>
                  </motion.div>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
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
                        className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-white/20 backdrop-blur-lg border-2 border-white/30 focus:border-amber-400 focus:outline-none text-white placeholder-slate-300 transition-all duration-300"
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
                        className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-white/20 backdrop-blur-lg border-2 border-white/30 focus:border-amber-400 focus:outline-none text-white placeholder-slate-300 transition-all duration-300"
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={formStatus.isSubmitting}
                      className="relative w-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                          Quero meu e-book gratuito
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
                  
                  <div className="mt-6">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="text-center">
                        <p className="text-xs text-slate-400 flex items-center justify-center">
                          <Lock className="h-4 w-4 mr-2 text-slate-500" />
                          Seus dados estão protegidos. Nada de spam, só conteúdo de valor.
                        </p>
                      </div>
                    </motion.div>
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