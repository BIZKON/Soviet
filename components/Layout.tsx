
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-12 bg-cream/80 backdrop-blur-md sticky top-0 z-50 border-b border-secondary/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <span className="text-white font-serif font-bold text-xl">СС</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl text-dark leading-none font-semibold uppercase tracking-wider">Статский Советник</span>
            <span className="text-[10px] text-primary tracking-[0.2em] font-sans font-medium uppercase">Бухгалтерские услуги</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-2 text-muted text-sm font-medium">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Анонимный опрос</span>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 md:px-12 border-t border-secondary/10 mt-20">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm text-muted mb-4 font-sans leading-relaxed">
          🔒 Этот опрос полностью анонимен. Мы не собираем ваше имя, email, телефон или другие данные, позволяющие вас идентифицировать. Ответы используются только для улучшения наших услуг в обобщённом виде.
        </p>
        <p className="text-xs text-muted/60 font-sans">
          &copy; 2026 ООО «Статский Советник». Все права защищены.
        </p>
      </div>
    </footer>
  );
};
