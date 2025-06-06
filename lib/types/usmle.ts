// The new, hierarchical category type
export interface UsmleCategory {
  id: string; // e.g., 'subj_anatomy' or 'sys_cardio'
  name: string; // e.g., 'Anatomy' or 'Cardiovascular System'
  parent_id: string | null; // e.g., 'subject' or 'system'
  grouping: 'Subject' | 'System' | 'General Principles';
  questionCount: number;
}

// A simplified Question type for mocks, ensuring it links via category_id
export interface UsmleQuestion {
  id: string;
  question_text: string;
  options: { id: string; text: string }[];
  correct_option_id: string;
  explanation: string;
  category_id: string; // This MUST match the 'id' of a UsmleCategory
  difficulty: 'easy' | 'medium' | 'hard';
}