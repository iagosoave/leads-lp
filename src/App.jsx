import React from 'react';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { AnimatedBanner } from './components/AnimatedBanner';
import { LeadCapture } from './components/LeadCapture';
import { FloatingForm } from './components/FloatingForm';
import { Popup } from './components/Popup';
import  Footer  from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      <TopBar />
      <Hero />
      <AnimatedBanner />
      <LeadCapture />
      <FloatingForm />
      <Popup />
      <Footer />
    </div>
  );
}

export default App;