import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Download, ChevronRight, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser'; // Importar o EmailJS
import ebookPDF from './ato.pdf'; // Importar o PDF diretamente

// Componente para o ícone do WhatsApp
const WhatsAppIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

// Função de formatação para telefone brasileiro com +55 (DDD) XXXXX-XXXX
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

// Função para extrair apenas os números
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

// Função para criar um link do WhatsApp a partir do número de telefone
const formatWhatsAppLink = (phoneNumber) => {
  // Remover todos os caracteres não numéricos
  const numbersOnly = phoneNumber.replace(/\D/g, '');
  
  // Certificar-se de que o número começa com 55 (código do Brasil)
  const whatsappNumber = numbersOnly.startsWith('55') ? numbersOnly : `55${numbersOnly}`;
  
  // Gerar o link do WhatsApp
  return `https://api.whatsapp.com/send/?phone=${whatsappNumber}`;
};

export const FloatingForm = () => {
  // Referência para EmailJS
  const formRef = useRef();
  // Definir isVisible direto como true para testar
  const [isVisible, setIsVisible] = useState(true);
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [displayPhone, setDisplayPhone] = useState(''); // Para exibição formatada

  // Link do grupo de WhatsApp
  const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/DTm2RaRYGrUEGNZz7JiLlb";
  // Link do calendário
  const CALENDAR_LINK = "https://calendar.app.google/zNT351dZ1eH8kAAaA";

  // Configurações do EmailJS - Formulário Original
  const EMAILJS_SERVICE_ID = 'service_90vuf6r';
  const EMAILJS_TEMPLATE_ID = 'template_itq8opk';
  const EMAILJS_PUBLIC_KEY = '0GCowirbv2hrggGDt';

  // Configurações do EmailJS - Novo Email de Boas-vindas
  const WELCOME_EMAIL_SERVICE_ID = 'service_rfhmc3p';
  const WELCOME_EMAIL_TEMPLATE_ID = 'template_89t9kr9';

  // Não estamos usando useEffect para decidir mostrar o popup
  // Ele já está visível por padrão

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Formata o número para exibição
      const formattedDisplay = formatBrazilianPhone(value);
      setDisplayPhone(formattedDisplay);
      
      // Salva o valor sem formatação no estado, mas com prefixo 55
      if (formattedDisplay) {
        const rawValue = unformatPhone(value);
        setFormData(prev => ({
          ...prev,
          [name]: rawValue
        }));
      } else {
        // Se o valor formatado for vazio, limpa também o formData
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

  // Função para lidar com eventos de teclado específicos no campo de telefone
  const handlePhoneKeyDown = (e) => {
    // Implementação especial para Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      
      // Extraímos apenas os números da string atual
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
      // Não falharemos o fluxo principal se o email de boas-vindas falhar
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false
    });

    try {
      // Preparar os dados para o EmailJS com link do WhatsApp
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone, // Número sem formatação com prefixo 55
        phone_display: displayPhone, // Número formatado para exibição
        phone_link: formatWhatsAppLink(formData.phone), // Link do WhatsApp
        date: new Date().toLocaleString('pt-BR')
      };
      
      // 1. Enviar o email principal usando EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      console.log('Email principal enviado com sucesso');
      
      // 2. Enviar o email de boas-vindas personalizado
      await sendWelcomeEmail({
        name: formData.name,
        email: formData.email
      });
      
      // 3. Iniciar o download do arquivo
      const downloadLink = document.createElement('a');
      downloadLink.href = ebookPDF;
      downloadLink.download = 'mentoria-metodoato-ebook.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      console.log('Download iniciado com sucesso');
      
      // Salvar o lead
      const newLead = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: new Date().toISOString()
      };
      
      // Salvar no localStorage
      const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
      localStorage.setItem('leads', JSON.stringify([...existingLeads, newLead]));
      
      // Atualizar status do formulário
      setFormStatus({
        isSubmitting: false,
        isSuccess: true,
        isError: false
      });
      
      // Limpar o formulário
      setFormData({
        name: '',
        email: '',
        phone: ''
      });
      setDisplayPhone(''); // Limpa também o telefone formatado
      
    } catch (error) {
      console.error('Erro ao processar o formulário:', error);
      
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true
      });
    }
  };

  const joinWhatsAppGroup = () => {
    window.open(WHATSAPP_GROUP_LINK, '_blank');
    handleClose();
  };

  // Para teste: log para ver se o componente está sendo renderizado
  console.log('FloatingForm renderizado, isVisible:', isVisible);

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md mx-auto bg-slate-800 rounded-2xl shadow-2xl border border-amber-500/30 overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white bg-slate-700 hover:bg-slate-600 rounded-full p-2 z-10"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-4 flex items-center">
              <Download className="h-6 w-6 text-slate-900 mr-2" />
              <h3 className="font-bold text-base sm:text-lg text-slate-900">E-book Grátis do Método ATO</h3>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6">
              {!formStatus.isSuccess ? (
                // Formulário
                <>
                  <p className="text-white mb-4 text-center text-sm sm:text-base">
                    Preencha os campos abaixo para receber imediatamente nosso e-book exclusivo!
                  </p>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 sm:h-5 sm:w-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome"
                        required
                        className="w-full pl-9 sm:pl-10 pr-4 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 sm:h-5 sm:w-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Seu e-mail"
                        required
                        className="w-full pl-9 sm:pl-10 pr-4 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    {/* Campo de telefone ATUALIZADO com formatação */}
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 sm:h-5 sm:w-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={displayPhone}
                        onChange={handleInputChange}
                        onKeyDown={handlePhoneKeyDown}
                        placeholder="Seu telefone com DDD"
                        required
                        className="w-full pl-9 sm:pl-10 pr-4 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus.isSubmitting}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 py-2.5 sm:py-3 rounded-lg font-bold flex items-center justify-center text-sm sm:text-base disabled:opacity-70"
                    >
                      {formStatus.isSubmitting ? (
                        <div className="flex items-center">
                          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processando...
                        </div>
                      ) : (
                        <>
                          Baixar Agora
                          <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                // Tela de sucesso e convite para WhatsApp
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  
                  <h4 className="text-white font-bold text-lg mb-2">E-book Enviado!</h4>
                  <p className="text-slate-300 text-sm mb-6">
                    Seu download está sendo iniciado... <br />
                    <a href={ebookPDF} download="mentoria-metodoato-ebook.pdf" className="text-amber-400 underline">
                      Clique aqui se não iniciar automaticamente
                    </a>
                  </p>
                  
                  <div className="bg-[#075E54]/20 rounded-xl p-4 border border-[#25D366]/30 text-left mb-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center mr-2 flex-shrink-0">
                        <WhatsAppIcon className="h-4 w-4 text-white" />
                      </div>
                      <h5 className="text-white font-medium">Grupo do WhatsApp</h5>
                    </div>
                    <p className="text-slate-300 text-sm mb-3">
                      Junte-se ao nosso grupo exclusivo para receber conteúdos extras e suporte direto!
                    </p>
                    <button
                      onClick={joinWhatsAppGroup}
                      className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-2 rounded-lg font-medium text-sm flex items-center justify-center"
                    >
                      <WhatsAppIcon className="h-4 w-4 mr-2" />
                      Entrar no Grupo
                    </button>
                  </div>
                  
                  <button
                    onClick={handleClose}
                    className="text-slate-400 hover:text-white text-sm"
                  >
                    Fechar esta janela
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};