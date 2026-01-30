
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Fix: Add ArrowRight to the imports from lucide-react
import { Gift, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { SURVEY_SECTIONS } from '../questions';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Sparkles className="text-primary w-10 h-10" />
        </div>
        
        <h1 className="font-serif text-5xl md:text-6xl text-dark mb-6">Спасибо! Ваш вклад огромен. 🎉</h1>
        <p className="font-serif text-2xl text-secondary mb-12 italic">
          Вы честно ответили на 50 вопросов. Мы держим слово.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {SURVEY_SECTIONS.map((section, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-secondary/10 shadow-soft">
              <span className="text-3xl mb-3 block">{section.icon}</span>
              <div className="h-1 w-full bg-secondary/10 rounded-full mb-3">
                <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
              </div>
              <p className="text-[10px] font-sans font-bold text-muted uppercase tracking-wider leading-tight">
                {section.title}
              </p>
              <div className="flex items-center justify-center gap-1 mt-2 text-primary">
                <CheckCircle2 className="w-3 h-3" />
                <span className="text-[10px] font-bold">100%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gift Unlock Block */}
        <div className="bg-cream border-2 border-secondary/20 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Gift className="w-32 h-32 text-secondary rotate-12" />
          </div>
          
          <div className="relative z-10">
            <h2 className="font-serif text-3xl text-dark mb-4">🎁 Ваш подарок разблокирован!</h2>
            <p className="text-gray text-lg mb-8 max-w-xl mx-auto">
              Мы подготовили для вас персональную стратегическую сессию по кросс-маркетингу с Игорем Ивановым.
            </p>
            
            <button 
              onClick={() => navigate('/gift')}
              className="bg-secondary hover:bg-secondary/90 text-white px-12 py-5 rounded-2xl text-xl font-sans font-bold shadow-lg shadow-secondary/20 transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
              ЗАБРАТЬ ПОДАРОК
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
