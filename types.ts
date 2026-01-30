
export enum QuestionType {
  SINGLE = 'single',
  MULTI = 'multi',
  TEXT = 'text'
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
}

export interface SurveySection {
  title: string;
  icon: string;
  color: string;
  questions: Question[];
}

export interface SurveyState {
  answers: Record<string, any>;
  currentSectionIndex: number;
  isCompleted: boolean;
  promoCode?: string;
}

export interface SurveySession {
  id: string;
  answers: Record<string, any>;
  current_section: number;
  is_completed: boolean;
  promo_code: string | null;
  created_at: string;
  completed_at: string | null;
}
