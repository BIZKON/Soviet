
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Gift } from 'lucide-react';
import { SURVEY_SECTIONS } from '../questions';
import { QuestionType } from '../types';
import { databaseService } from '../services/databaseService';

const Survey: React.FC = () => {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize Session
  useEffect(() => {
    const init = async () => {
      const id = await databaseService.createSession();
      setSessionId(id);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentSection = SURVEY_SECTIONS[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];
  const totalQuestionsInSection = currentSection.questions.length;
  
  // Overall Progress
  const totalQuestions = SURVEY_SECTIONS.reduce((acc, s) => acc + s.questions.length, 0);
  const completedQuestionsCount = SURVEY_SECTIONS.slice(0, currentSectionIndex).reduce((acc, s) => acc + s.questions.length, 0) + currentQuestionIndex;
  const overallProgress = (completedQuestionsCount / totalQuestions) * 100;

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = useCallback(async () => {
    if (currentQuestionIndex < totalQuestionsInSection - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentSectionIndex < SURVEY_SECTIONS.length - 1) {
      // Save section progress
      if (sessionId) {
        await databaseService.updateSession(sessionId, {
          answers,
          current_section: currentSectionIndex + 1
        });
      }
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final Finish
      setIsSubmitting(true);
      const promo = databaseService.generatePromoCode();
      if (sessionId) {
        await databaseService.updateSession(sessionId, {
          answers,
          is_completed: true,
          promo_code: promo,
          completed_at: new Date().toISOString()
        });
        localStorage.setItem('last_promo_code', promo);
      }
      setTimeout(() => navigate('/thank-you'), 800);
    }
  }, [currentQuestionIndex, totalQuestionsInSection, currentSectionIndex, sessionId, answers, navigate]);

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      setCurrentQuestionIndex(SURVEY_SECTIONS[currentSectionIndex - 1].questions.length - 1);
    }
  };

  const isAnswered = answers[currentQuestion.id] !== undefined && 
    (Array.isArray(answers[currentQuestion.id]) ? answers[currentQuestion.id].length > 0 : answers[currentQuestion.id] !== '');

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-sans font-bold uppercase tracking-widest text-muted mb-2">
          <span>Прогресс: {Math.round(overallProgress)}%</span>
          <span>{completedQuestionsCount + 1} из {totalQuestions}</span>
        </div>
        <div className="h-1.5 w-full bg-secondary/10 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-500" 
            style={{ width: `${overallProgress}%`, backgroundColor: currentSection.color }}
          />
        </div>
      </div>

      {/* Section Badge */}
      <div 
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-sans font-bold uppercase tracking-wider"
        style={{ backgroundColor: `${currentSection.color}15`, color: currentSection.color }}
      >
        <span className="text-lg">{currentSection.icon}</span>
        <span>Секция {currentSectionIndex + 1}: {currentSection.title}</span>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-soft border border-secondary/10 p-8 md:p-12 mb-8 min-h-[400px] flex flex-col justify-between transition-all">
        <div>
          <span className="block text-xs font-sans font-bold text-muted mb-4 uppercase tracking-widest">ВОПРОС {completedQuestionsCount + 1}</span>
          <h2 className="font-serif text-3xl md:text-4xl text-dark mb-10 leading-tight">
            {currentQuestion.text}
          </h2>

          <div className="space-y-4">
            {currentQuestion.type === QuestionType.SINGLE && currentQuestion.options?.map((opt, idx) => (
              <label 
                key={idx}
                className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  answers[currentQuestion.id] === opt 
                    ? 'border-primary bg-primary/5 shadow-md shadow-primary/5' 
                    : 'border-secondary/10 hover:border-primary/30'
                }`}
              >
                <input 
                  type="radio" 
                  className="hidden" 
                  name={currentQuestion.id} 
                  value={opt}
                  checked={answers[currentQuestion.id] === opt}
                  onChange={() => handleAnswer(opt)}
                />
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  answers[currentQuestion.id] === opt ? 'border-primary bg-primary' : 'border-secondary/30'
                }`}>
                  {answers[currentQuestion.id] === opt && <Check className="w-4 h-4 text-white" />}
                </div>
                <span className="text-gray text-lg font-medium">{opt}</span>
              </label>
            ))}

            {currentQuestion.type === QuestionType.MULTI && currentQuestion.options?.map((opt, idx) => {
              const currentAnswers = Array.isArray(answers[currentQuestion.id]) ? answers[currentQuestion.id] : [];
              const isChecked = currentAnswers.includes(opt);
              return (
                <label 
                  key={idx}
                  className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    isChecked
                      ? 'border-primary bg-primary/5 shadow-md shadow-primary/5' 
                      : 'border-secondary/10 hover:border-primary/30'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={isChecked}
                    onChange={() => {
                      const nextAnswers = isChecked 
                        ? currentAnswers.filter((a: string) => a !== opt)
                        : [...currentAnswers, opt];
                      handleAnswer(nextAnswers);
                    }}
                  />
                  <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${
                    isChecked ? 'border-primary bg-primary' : 'border-secondary/30'
                  }`}>
                    {isChecked && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className="text-gray text-lg font-medium">{opt}</span>
                </label>
              );
            })}

            {currentQuestion.type === QuestionType.TEXT && (
              <textarea 
                className="w-full p-5 rounded-xl border-2 border-secondary/10 focus:border-primary focus:ring-0 outline-none min-h-[150px] text-lg transition-all"
                placeholder="Напишите ваш ответ здесь..."
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
              />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-12 pt-8 border-t border-secondary/10">
          <button 
            onClick={handlePrev}
            className={`flex items-center gap-2 text-muted font-sans font-bold hover:text-dark transition-colors ${
              (currentSectionIndex === 0 && currentQuestionIndex === 0) ? 'invisible' : ''
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            НАЗАД
          </button>

          <button 
            disabled={!isAnswered || isSubmitting}
            onClick={handleNext}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-sans font-bold transition-all ${
              isAnswered 
                ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:-translate-y-1' 
                : 'bg-secondary/10 text-muted cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'ОБРАБОТКА...' : (
              currentSectionIndex === SURVEY_SECTIONS.length - 1 && currentQuestionIndex === totalQuestionsInSection - 1 
                ? 'ЗАВЕРШИТЬ ОПРОС' 
                : 'ДАЛЕЕ'
            )}
            {!isSubmitting && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Survey;
