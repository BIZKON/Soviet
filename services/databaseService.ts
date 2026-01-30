
import { SurveySession } from '../types';

const STORAGE_KEY = 'statsky_survey_sessions';

/**
 * In a real-world scenario, you would use a Supabase client or a direct 
 * fetch to your Russian backend here.
 */
export const databaseService = {
  async createSession(): Promise<string> {
    const id = crypto.randomUUID();
    const newSession: SurveySession = {
      id,
      answers: {},
      current_section: 0,
      is_completed: false,
      promo_code: null,
      created_at: new Date().toISOString(),
      completed_at: null,
    };
    
    const sessions = this.getAllSessions();
    sessions.push(newSession);
    this.saveSessions(sessions);
    return id;
  },

  async updateSession(id: string, updates: Partial<SurveySession>): Promise<void> {
    const sessions = this.getAllSessions();
    const index = sessions.findIndex(s => s.id === id);
    if (index !== -1) {
      sessions[index] = { ...sessions[index], ...updates };
      this.saveSessions(sessions);
    }
  },

  async getSession(id: string): Promise<SurveySession | null> {
    const sessions = this.getAllSessions();
    return sessions.find(s => s.id === id) || null;
  },

  getAllSessions(): SurveySession[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveSessions(sessions: SurveySession[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  },

  generatePromoCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'STATSKY';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
};
