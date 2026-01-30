
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Gift, BarChart3, ArrowRight } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-24 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="font-serif text-5xl md:text-6xl text-dark mb-8 leading-tight">
          Ваше мнение поможет нам стать лучше. <br className="hidden md:block" />
          <span className="text-primary italic">А мы поможем вашему бизнесу заработать.</span>
        </h1>
        <p className="text-secondary text-xl md:text-2xl font-serif mb-10 font-medium">
          Честный обмен: Ваши 15 минут ответов = Стратегическая сессия стоимостью 25 000 руб. в подарок
        </p>
        
        <div className="max-w-2xl mx-auto text-gray text-lg leading-relaxed mb-12 space-y-4">
          <p>
            Мы (компания «Статский Советник») запускаем большое исследование качества нашего продукта. Нам важно знать каждую деталь, поэтому мы подготовили для вас 50 подробных вопросов.
          </p>
          <p>
            Мы понимаем, что ваше время стоит дорого. Поэтому мы не просим вас работать бесплатно. В благодарность за прохождение этого опроса мы оплатили для вас работу ведущего эксперта по кросс-маркетингу Игоря Иванова.
          </p>
        </div>

        <button 
          onClick={() => navigate('/survey')}
          className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-2xl text-xl font-sans font-bold shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-1 flex items-center gap-3 mx-auto"
        >
          НАЧАТЬ ОПРОС И ЗАБРАТЬ ПОДАРОК
          <ArrowRight className="w-6 h-6" />
        </button>
      </section>

      {/* Reward Cards */}
      <section className="mb-20">
        <h2 className="text-center font-serif text-3xl text-dark mb-12">Что вы получите по итогам опроса:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-soft border border-secondary/10 hover:shadow-medium transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <Map className="text-primary w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-dark mb-4">Карта партнёров</h3>
            <p className="text-gray leading-relaxed text-sm">
              Список из 10 компаний, у которых уже есть ваши клиенты, и план по взаимодействию с ними.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-soft border border-secondary/10 hover:shadow-medium transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
              <Gift className="text-secondary w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-dark mb-4">Технология «Подарок»</h3>
            <p className="text-gray leading-relaxed text-sm">
              Как создать продукт с нулевой себестоимостью для массового привлечения качественных лидов.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-soft border border-secondary/10 hover:shadow-medium transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="text-accent w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-dark mb-4">Математика прибыли</h3>
            <p className="text-gray leading-relaxed text-sm">
              Пошаговый расчет, как получать клиентов в ваш бизнес без рекламного бюджета.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="text-center max-w-xl mx-auto py-8 px-6 border border-dashed border-secondary/30 rounded-2xl">
        <p className="text-xs text-muted/80 uppercase tracking-widest font-sans font-semibold mb-2">Конфиденциальность гарантирована</p>
        <p className="text-sm text-muted">
          Опрос проводится анонимно. Мы анализируем общие тенденции рынка для улучшения сервиса. Никакие персональные данные не запрашиваются.
        </p>
      </div>
    </div>
  );
};

export default Landing;
