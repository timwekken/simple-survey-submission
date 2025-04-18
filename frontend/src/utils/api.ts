import { SurveyType } from "../types/survey";
import { User } from "@/types/user";

const BASE_URL = "http://localhost:5000";

// Base API client to reduce duplication
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("authToken");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    if (response.status === 204) {
      return {} as T;
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

export const getSurveys = async (searchText = ""): Promise<SurveyType[]> => {
  return apiRequest<SurveyType[]>(
    `/surveys?q[title_or_description_cont]=${encodeURIComponent(searchText)}`
  );
};

export const getSurveyQuestionsById = async (surveyId: number) => {
  return apiRequest(`/survey_questions/by_survey/${surveyId}`);
};

export const deleteSurveyById = async (surveyId: number): Promise<void> => {
  await apiRequest(`/surveys/${surveyId}`, { method: "DELETE" });
};

export const getUsers = async (): Promise<User[]> => {
  return apiRequest<User[]>(`/users`);
};

export const assignSurveyToUser = async (
  surveyId: number,
  userId: number
): Promise<void> => {
  await apiRequest(`/survey_assignments/create_or_update`, {
    method: "POST",
    body: JSON.stringify({
      survey_id: surveyId,
      user_id: userId,
      survey_assignment: { status: "assigned" }, // Add required nested object
    }),
  });
};

export const getSurveyResponses = async (surveyId: number) => {
  try {
    return await apiRequest(`/survey_responses/for_survey/${surveyId}`);
  } catch (error) {
    // Only silence 404 errors, rethrow others
    if (error instanceof Error && !error.message.includes("404")) {
      throw error;
    }
    return null;
  }
};

export const submitSurveyResponse = async (
  surveyId: number,
  responseData: Record<number, string>
): Promise<void> => {
  await apiRequest(`/survey_responses`, {
    method: "POST",
    body: JSON.stringify({
      survey_id: surveyId,
      submitted_at: new Date().toISOString(),
      response_data: responseData,
    }),
  });
};

export default {
  getSurveys,
  getSurveyQuestionsById,
  deleteSurveyById,
  getUsers,
  assignSurveyToUser,
  getSurveyResponses,
  submitSurveyResponse,
};
