class SurveyQuestionsController < ApplicationController
    # GET /survey_questions/by_survey/1
    def by_survey
        survey_id = params[:survey_id]
        @survey_questions = SurveyQuestion.where(survey_id: survey_id)
        render json: @survey_questions
    end
end
