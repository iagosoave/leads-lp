// Footer.jsx - Sem ícone do Instagram

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    // Div externa com estilo fixo
    <div style={{
      width: '100%',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '16px 0',
      textAlign: 'center',
      position: 'relative',
      zIndex: 5
    }}>
      {/* Container interno */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
        backgroundColor: '#000000'
      }}>
        {/* Copyright */}
        <p style={{
          color: '#ffffff',
          margin: '0 0 8px 0',
          fontSize: '14px',
          backgroundColor: '#000000'
        }}>
          © {currentYear} Cristofer Leone. Todos os direitos reservados.
        </p>
        
        {/* Desenvolvido por */}
        <p style={{
          color: '#ffffff',
          margin: '0',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000'
        }}>
          Desenvolvido por{" "}
          <a 
            href="https://www.instagram.com/webbrazee/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: '#e19d24',
              marginLeft: '4px',
              textDecoration: 'none',
              backgroundColor: '#000000'
            }}
          >
            WebBraze
          </a>
        </p>
      </div>
      
      {/* Sobrepor qualquer outro estilo */}
      <style jsx global>{`
        /* Força o fundo preto em todo o rodapé */
        #root footer, 
        footer, 
        footer div, 
        footer p, 
        footer span, 
        footer svg {
          background-color: #000000 !important;
          background: #000000 !important;
          background-image: none !important;
          box-shadow: none !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default Footer;