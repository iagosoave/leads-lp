import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Download } from 'lucide-react';

export const AnimatedBanner = () => {
  const BannerItem = () => (
    <div className="flex items-center whitespace-nowrap">
      <Download className="h-6 w-6 text-slate-900 mr-2" />
      <span className="text-xl font-bold text-slate-900 mr-2">E-BOOK GRÁTIS</span>
      <ChevronRight className="h-6 w-6 text-slate-900" />
      <span className="text-xl font-bold text-slate-900 mx-4">MÉTODO ATO</span>
      <ChevronRight className="h-6 w-6 text-slate-900" />
      <span className="text-xl font-bold text-slate-900 mx-4">TORNE-SE UM MENTOR ATÔMICO</span>
      <ChevronRight className="h-6 w-6 text-slate-900" />
    </div>
  );

  return (
    <div className="bg-amber-500 py-4 relative overflow-hidden my-8">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-amber-500 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-amber-500 to-transparent z-10 pointer-events-none"></div>
      
      <div className="max-w-full overflow-hidden">
        <div className="inline-flex animate-banner">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-4">
              <BannerItem />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes bannermove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-banner {
          display: inline-flex;
          animation: bannermove 15s linear infinite;
        }
      `}</style>
    </div>
  );
};