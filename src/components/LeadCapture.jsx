import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Target, Coins, Mail, User, ArrowRight, CheckCircle2, AlertCircle, Lock, CheckCircle, MessageCircle, Users, ExternalLink, Share2, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';
import juliana from './juliana.jpeg';
import ebookPDF from './ato.pdf';

// Links
const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/DTm2RaRYGrUEGNZz7JiLlb";
const CALENDAR_LINK = "https://calendar.app.google/zNT351dZ1eH8kAAaA";

// Configurações do EmailJS - Formulário Original
const EMAILJS_SERVICE_ID = 'service_90vuf6r';
const EMAILJS_TEMPLATE_ID = 'template_itq8opk';
const EMAILJS_PUBLIC_KEY = '0GCowirbv2hrggGDt';

// Configurações do EmailJS - Novo Email de Boas-vindas
const WELCOME_EMAIL_SERVICE_ID = 'service_rfhmc3p';
const WELCOME_EMAIL_TEMPLATE_ID = 'template_89t9kr9';

// Componente para o ícone do WhatsApp
const WhatsAppIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

// Função de formatação revisada:
const formatBrazilianPhone = (value) => {
  // Remove todos os caracteres não numéricos
  const numbers = value.replace(/\D/g, '');
  
  // Se não tiver números, retorna vazio
  if (!numbers) return '';
  
  // Vamos sempre tratar o número como se já tivesse o prefixo 55
  // Se começa com 55, usamos como está, senão adicionamos o 55
  const fullNumber = numbers.startsWith('55') ? numbers : '55' + numbers;
  
  // Extrair as partes do número
  const country = '+55';
  const ddd = fullNumber.substring(2, 4);
  const rest = fullNumber.substring(4);
  
  // Montamos o número formatado progressivamente
  
  // Se não tiver DDD ainda, retorna apenas o que foi digitado
  if (ddd.length === 0) {
    // Se temos apenas o 55 implícito, não mostramos nada
    return '';
  }
  
  // Se tiver DDD parcial, mostra apenas os dígitos sem formatação
  if (ddd.length === 1) {
    return ddd;
  }
  
  // Se tiver DDD completo, formata com parênteses
  let formatted = country + ' (' + ddd + ')';
  
  // Se tiver parte do número além do DDD
  if (rest.length > 0) {
    formatted += ' ' + rest;
    
    // Se tiver pelo menos 5 dígitos do número, adiciona o hífen
    if (rest.length >= 5) {
      formatted = formatted.substring(0, country.length + 4 + 1); // +55 (DD) 
      formatted += rest.substring(0, 5) + '-' + rest.substring(5);
    }
  }
  
  return formatted;
};

// Função para extrair apenas os números (mantém comportamento original)
const unformatPhone = (formattedValue) => {
  // Remove todos os caracteres não numéricos
  let numericValue = formattedValue.replace(/\D/g, '');
  
  // Se já começar com 55, mantém como está, senão adiciona
  if (numericValue.startsWith('55')) {
    return numericValue;
  } else {
    return '55' + numericValue;
  }
};

export const LeadCapture = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [displayPhone, setDisplayPhone] = useState(''); // Para exibição formatada
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    downloadComplete: false
  });
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é um dispositivo móvel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Função handleInputChange revisada:
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Extrai apenas os números da entrada
      const numbersOnly = value.replace(/\D/g, '');
      
      // Limita a entrada a 13 dígitos (considerando 55 + DDD + 9 dígitos)
      const limitedNumbers = numbersOnly.slice(0, 13);
      
      // Formata para exibição
      const formattedDisplay = formatBrazilianPhone(limitedNumbers);
      setDisplayPhone(formattedDisplay);
      
      // Salva o valor no formData
      if (formattedDisplay) {
        // Extrai os números para salvar no formData
        let rawValue = limitedNumbers;
        
        // Certifica-se de que começa com 55
        if (!rawValue.startsWith('55')) {
          rawValue = '55' + rawValue;
        }
        
        setFormData(prev => ({
          ...prev,
          [name]: rawValue
        }));
      } else {
        // Se não houver mais números, limpa o campo
        setFormData(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    } else {
      // Para outros campos, comportamento normal
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Função handlePhoneKeyDown revisada:
  const handlePhoneKeyDown = (e) => {
    // Implementação especial para Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      
      // Extraímos apenas os números da string atual (sem o +55 na frente)
      const numbersOnly = displayPhone.replace(/\D/g, '');
      
      // Remove o último dígito
      const newNumbers = numbersOnly.slice(0, -1);
      
      // Formata e atualiza o estado de exibição
      const formatted = formatBrazilianPhone(newNumbers);
      setDisplayPhone(formatted);
      
      // Atualiza o formData
      if (newNumbers.length > 0) {
        // Se ainda houver números, certifique-se de adicionar o 55 na frente
        const rawValue = newNumbers.startsWith('55') ? newNumbers : '55' + newNumbers;
        setFormData(prev => ({
          ...prev,
          phone: rawValue
        }));
      } else {
        // Se não houver mais números, limpa o campo
        setFormData(prev => ({
          ...prev,
          phone: ''
        }));
      }
    }
  };

  // Função para enviar o email personalizado de boas-vindas
  const sendWelcomeEmail = async (userData) => {
    try {
      // Preparar os parâmetros para o email de boas-vindas
      const welcomeParams = {
        name: userData.name,
        email: userData.email,
        calendar_link: CALENDAR_LINK,
        whatsapp_link: WHATSAPP_GROUP_LINK
      };
      
      // Enviar o email de boas-vindas
      const welcomeResult = await emailjs.send(
        WELCOME_EMAIL_SERVICE_ID,
        WELCOME_EMAIL_TEMPLATE_ID,
        welcomeParams,
        EMAILJS_PUBLIC_KEY
      );
      
      console.log('Email de boas-vindas enviado com sucesso:', welcomeResult.text);
      return true;
    } catch (error) {
      console.error('Erro ao enviar o email de boas-vindas:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      downloadComplete: false
    });

    try {
      // 1. Primeiro enviamos o formulário original como já estava implementado
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone, // Já está com o formato 55DDDNNNNNNN
        date: new Date().toLocaleString('pt-BR')
      };
      
      // Enviar o email principal usando EmailJS
      const emailResult = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      console.log('Email principal enviado com sucesso:', emailResult.text);
      
      // 2. Agora enviamos o email de boas-vindas personalizado
      await sendWelcomeEmail({
        name: formData.name,
        email: formData.email
      });
      
      // 3. Iniciamos o download do arquivo
      const downloadLink = document.createElement('a');
      downloadLink.href = ebookPDF;
      downloadLink.download = 'mentoria-metodoato-ebook.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      console.log('Download iniciado com sucesso');
      
      // Opcional: salvar o lead em algum lugar (localStorage, banco de dados, etc.)
      const newLead = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: new Date().toISOString()
      };
      
      // Exemplo: salvar no localStorage
      const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
      localStorage.setItem('leads', JSON.stringify([...existingLeads, newLead]));
      
      // Atualizar status do formulário
      setFormStatus({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        downloadComplete: true
      });

      // Limpar o formulário
      setFormData({
        name: '',
        email: '',
        phone: ''
      });
      setDisplayPhone(''); // Limpa também o telefone formatado
      
      // Opcional: Rolar a tela para a seção do WhatsApp após 1 segundo
      setTimeout(() => {
        const whatsappSection = document.getElementById('whatsapp-community');
        if (whatsappSection) {
          whatsappSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao processar o envio:', error);
      
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        downloadComplete: false
      });
    }
  };

  const joinWhatsAppGroup = () => {
    window.open(WHATSAPP_GROUP_LINK, '_blank');
  };

  return (
    <>
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

<form ref={form} onSubmit={handleSubmit} className="space-y-5">
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

{/* Campo de telefone - CORRIGIDO para permitir apagar caracteres */}
<div className="relative group">
  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
    <Phone className="text-slate-400 group-focus-within:text-amber-500 h-5 w-5 transition-all duration-300" />
  </div>
  <motion.input
    type="tel"
    name="phone"
    value={displayPhone}
    onChange={handleInputChange}
    onKeyDown={handlePhoneKeyDown}
    placeholder="Seu telefone com DDD"
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
    <span>E-book baixado com sucesso! Se o download não iniciar automaticamente, <a href={ebookPDF} download="mentoria-metodoato-ebook.pdf" className="underline">clique aqui</a>.</span>
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
    <span>Erro ao baixar. Por favor, tente novamente ou <a href={ebookPDF} download="mentoria-metodoato-ebook.pdf" className="underline">clique aqui</a>.</span>
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

{/* WhatsApp Community Section - Aparece após download bem-sucedido */}
{formStatus.isSuccess && (
<motion.div 
id="whatsapp-community"
className="bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#075E54] py-16 md:py-20"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.8, delay: 0.3 }}
>
<div className="container mx-auto px-4 sm:px-6">
<div className="max-w-4xl mx-auto">
<div className="text-center mb-10">
{/* Bolhas flutuantes de WhatsApp (elementos decorativos) */}
<motion.div
className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white/5 hidden md:block"
animate={{ 
y: [0, -15, 0],
scale: [1, 1.1, 1]
}}
transition={{
duration: 8,
repeat: Infinity,
repeatType: "reverse"
}}
></motion.div>
<motion.div
className="absolute bottom-20 right-20 w-16 h-16 rounded-full bg-white/5 hidden md:block"
animate={{ 
y: [0, 20, 0],
scale: [1, 1.05, 1]
}}
transition={{
duration: 7,
repeat: Infinity,
repeatType: "reverse"
}}
></motion.div>

<motion.div
initial={{ scale: 0 }}
animate={{ scale: 1 }}
transition={{ 
type: "spring", 
stiffness: 260, 
damping: 20, 
delay: 0.5 
}}
className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-white rounded-full shadow-lg border-4 border-white/80 relative overflow-hidden"
>
<WhatsAppIcon className="h-12 w-12 text-[#25D366]" />

{/* Pulse animation */}
<motion.div 
className="absolute inset-0 rounded-full"
animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
transition={{ 
duration: 2,
repeat: Infinity,
repeatType: "loop"
}}
style={{ border: '2px solid #25D366' }}
></motion.div>
</motion.div>

<motion.h2
initial={{ y: 30, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.6, delay: 0.7 }}
className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
>
Parabéns pelo primeiro passo!
</motion.h2>

<motion.p
initial={{ y: 20, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.6, delay: 0.9 }}
className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto"
>
Agora, que tal continuar sua jornada com mentores e pessoas que compartilham os mesmos objetivos que você?
</motion.p>
</div>

<motion.div
initial={{ y: 40, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.8, delay: 1.1 }}
className="bg-white rounded-3xl overflow-hidden shadow-xl border border-white/30 md:flex"
>
{/* Imagem do WhatsApp (apenas em desktop) */}
<div className="hidden md:block md:w-2/5 bg-[#ECE5DD] relative overflow-hidden">
<div className="absolute inset-0 bg-[#128C7E] opacity-10"></div>
<div className="flex flex-col h-full justify-between p-6">
<div className="flex items-center">
<WhatsAppIcon className="h-8 w-8 text-[#25D366]" />
<h3 className="ml-3 text-[#075E54] font-semibold text-lg">Comunidade</h3>
</div>

<div className="bg-white rounded-lg p-4 shadow-md">
<div className="flex items-start">
  <div className="flex-shrink-0 bg-[#DCF8C6] rounded-full p-2">
    <Users className="h-6 w-6 text-[#075E54]" />
  </div>
  <div className="ml-3">
    <p className="text-[#075E54] text-sm font-medium">Método ATO</p>
    <p className="text-gray-600 text-sm mt-1">Olá! Bem-vindo(a) à comunidade, estamos ansiosos para te conhecer!</p>
    <p className="text-gray-500 text-xs mt-2 text-right">10:42</p>
  </div>
</div>
</div>

<div>
<div className="flex justify-between items-center mb-4">
  <div className="w-2 h-2 rounded-full bg-[#25D366]"></div>
</div>
</div>
</div>
</div>

{/* Conteúdo principal */}
<div className="p-6 md:p-8 md:w-3/5 bg-white">
<div className="flex flex-col h-full justify-between">
<div>
<div className="flex items-center mb-4">
  <div className="w-10 h-10 md:hidden flex-shrink-0 bg-[#25D366] rounded-full flex items-center justify-center mr-3">
    <WhatsAppIcon className="h-6 w-6 text-white" />
  </div>
  <h3 className="text-xl md:text-2xl font-bold text-gray-800">Comunidade Método ATO</h3>
</div>

<p className="text-gray-600 mb-6">Junte-se a outros mentores e especialistas para trocar experiências, tirar dúvidas e acelerar seu crescimento.</p>

<div className="space-y-4">
  {[
    {
      icon: <Users className="h-5 w-5 text-[#25D366]" />,
      text: "Conteúdos exclusivos que não estão no e-book"
    },
    {
      icon: <MessageCircle className="h-5 w-5 text-[#25D366]" />,
      text: "Suporte direto para suas dúvidas e desafios"
    },
    {
      icon: <Share2 className="h-5 w-5 text-[#25D366]" />,
      text: "Networking com mentores de diversas áreas"
    }
  ].map((item, index) => (
    <motion.div 
      key={index}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 1.3 + (index * 0.15) }}
      className="flex items-start"
    >
      <div className="mr-3 flex-shrink-0 bg-[#25D366]/10 p-2 rounded-full">
        {item.icon}
      </div>
      <p className="text-gray-700 pt-1">{item.text}</p>
    </motion.div>
  ))}
</div>
</div>

<motion.div
initial={{ y: 20, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.6, delay: 1.8 }}
className="mt-8"
>
<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
  <p className="text-gray-500 text-sm flex items-center">
    <Lock className="inline h-4 w-4 mr-1 text-[#128C7E]" />
    Grupo privado e moderado
  </p>
</div>

<motion.button
  onClick={joinWhatsAppGroup}
  className="group w-full flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white py-4 sm:py-3 px-6 rounded-xl font-bold text-base shadow-lg transition-all"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
>
  <WhatsAppIcon className="h-5 w-5 mr-2" />
  Entrar no grupo do WhatsApp
  <motion.div
    animate={{ x: [0, 5, 0] }}
    transition={{ 
      duration: 1.5, 
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 1
    }}
    className="ml-2"
  >
    <ExternalLink className="h-5 w-5" />
  </motion.div>
</motion.button>
</motion.div>
</div>
</div>
</motion.div>

<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.6, delay: 2 }}
className="mt-8 text-center"
>
<p className="text-white/80 text-sm">
Os membros mais ativos da comunidade recebem convites para eventos exclusivos
</p>
</motion.div>
</div>
</div>

{/* Mobile scroll indicator */}
{isMobile && (
<motion.div 
className="mt-8 flex justify-center"
initial={{ opacity: 0, y: 10 }}
animate={{ 
opacity: [0, 1, 0], 
y: [0, 10, 0] 
}}
transition={{ 
duration: 2,
repeat: 3,
repeatType: "loop"
}}
>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</motion.div>
)}
</motion.div>
)}
</>
);
};