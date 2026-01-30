
import React, { useState, useEffect } from 'react';
import { Copy, Check, Send, ShieldCheck, Zap, MessageSquare, Target, Clock } from 'lucide-react';

const Gift: React.FC = () => {
  const [promoCode, setPromoCode] = useState('STATSKY2026');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('last_promo_code');
    if (saved) setPromoCode(saved);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(promoCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const telegramLink = `https://t.me/igor_cross_marketing?text=${encodeURIComponent(
    `Здравствуйте! Прошёл опрос от Статского Советника. Мой промокод: ${promoCode}`
  )}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
        <div className="w-full lg:w-1/2">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-xl" />
            <img 
              src="https://picsum.photos/id/64/600/800" 
              alt="Игорь Иванов" 
              className="relative w-full h-[500px] object-cover rounded-2xl shadow-2xl border-2 border-white"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-secondary/10">
              <p className="font-serif text-2xl text-dark font-bold">Игорь Иванов</p>
              <p className="text-primary font-sans font-semibold text-sm uppercase tracking-wider">Эксперт по кросс-маркетингу</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <span className="text-secondary font-sans font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Ваш результат</span>
          <h1 className="font-serif text-5xl md:text-6xl text-dark mb-6 leading-tight">
            Персональный стратегический разбор
          </h1>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-gray/50 line-through text-2xl font-serif">Ценность: 25 000 ₽</span>
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xl font-bold font-serif">Для вас: 0 ₽</span>
          </div>
          
          <p className="text-gray text-lg leading-relaxed mb-8">
            Игорь Иванов — практик с 10-летним опытом. Он помогает бизнесу расти не за счет рекламных бюджетов, а за счет правильных партнерств и математически выверенных воронок.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg mt-1"><ShieldCheck className="w-4 h-4 text-primary" /></div>
              <p className="text-sm font-sans font-medium text-dark"><span className="font-bold">Audit & Mapping:</span> Где вы теряете трафик прямо сейчас?</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg mt-1"><MessageSquare className="w-4 h-4 text-primary" /></div>
              <p className="text-sm font-sans font-medium text-dark"><span className="font-bold">Скрипты:</span> Как договориться с топами рынка.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg mt-1"><Zap className="w-4 h-4 text-primary" /></div>
              <p className="text-sm font-sans font-medium text-dark"><span className="font-bold">Расчёт LTV:</span> Как зарабатывать на тех, кто не купил.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg mt-1"><Clock className="w-4 h-4 text-primary" /></div>
              <p className="text-sm font-sans font-medium text-dark"><span className="font-bold">Формат:</span> 60 минут (Zoom) + План действий.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Code Block */}
      <div className="max-w-3xl mx-auto bg-white rounded-[32px] border-2 border-secondary/20 shadow-2xl p-8 md:p-12 text-center mb-12">
        <h3 className="font-serif text-2xl text-muted mb-6">🎫 Ваш персональный промокод:</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
          <div className="bg-cream px-10 py-6 rounded-2xl border-2 border-dashed border-secondary/30">
            <span className="font-serif text-5xl md:text-6xl text-dark font-bold tracking-widest">{promoCode}</span>
          </div>
          <button 
            onClick={copyToClipboard}
            className={`flex items-center gap-2 px-8 py-6 rounded-2xl font-sans font-bold transition-all ${
              isCopied ? 'bg-green-500 text-white' : 'bg-dark text-white hover:bg-dark/90'
            }`}
          >
            {isCopied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
            {isCopied ? 'СКОПИРОВАНО' : 'КОПИРОВАТЬ'}
          </button>
        </div>

        <div className="space-y-6 text-left max-w-xl mx-auto mb-10">
          <p className="font-serif text-2xl text-dark font-bold text-center">Как получить консультацию:</p>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary shrink-0">1</div>
            <p className="text-gray">Скопируйте ваш уникальный промокод выше.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary shrink-0">2</div>
            <p className="text-gray">Нажмите на кнопку ниже, чтобы перейти в Telegram к Игорю Иванову.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary shrink-0">3</div>
            <p className="text-gray">Отправьте предзаполненное сообщение с кодом и выберите удобное время для Zoom-встречи.</p>
          </div>
        </div>

        <a 
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary hover:bg-primary/90 text-white px-12 py-6 rounded-2xl text-2xl font-sans font-bold shadow-xl shadow-primary/30 transition-all transform hover:-translate-y-1 inline-flex items-center gap-4"
        >
          НАПИСАТЬ ИГОРЮ В TELEGRAM
          <Send className="w-8 h-8" />
        </a>

        <div className="mt-12 p-6 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4 text-left">
          <div className="bg-red-500 p-2 rounded-lg text-white mt-1 shrink-0"><Target className="w-5 h-5" /></div>
          <div>
            <p className="font-sans font-bold text-red-900 mb-1 uppercase tracking-wider text-xs">Важное примечание</p>
            <p className="text-red-800 text-sm leading-relaxed">
              Это не массовый вебинар. Это личная работа один на один. Если вы не планируете внедрять партнёрские инструменты и менять подход к маркетингу, пожалуйста, передайте этот промокод другому предпринимателю.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gift;
