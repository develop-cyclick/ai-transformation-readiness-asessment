export type QuestionType = 'text' | 'textarea' | 'number' | 'select' | 'multiselect' | 'percentage';

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface Section {
  id: number;
  title: string;
  description?: string;
  questions: Question[];
}

export interface QuestionnaireData {
  title: string;
  description: string;
  sections: Section[];
}

export interface Answer {
  questionId: number;
  sectionId: number;
  value: string | number | string[];
}

export interface ResponseData {
  id?: string;
  businessName?: string;
  email?: string;
  answers: Answer[];
  progress: number;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
