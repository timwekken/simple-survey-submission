class SurveyQuestionsController < ApplicationController

    before_action :authenticate_user!

    # GET /survey_questions/by_survey/1
    def by_survey
        survey_id = params[:survey_id]
        if SurveyAssignment.where(user_id: current_user.id, survey_id: survey_id).exists? || current_user.admin? || current_user.manager?
            @survey_questions = SurveyQuestion.where(survey_id: survey_id)
            render json: @survey_questions
        end
    end
end
