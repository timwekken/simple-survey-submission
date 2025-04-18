export interface SurveyType {
  id: number;
  title: string;
  description: string;
  survey_assignment?: {
    user: {
      id: number;
      email: string;
    };
  };
  questions?: SurveyQuestionType[];
}

export interface SurveyQuestionType {
  id: number;
  label: string;
  info: string;
  data_type: string;
}
