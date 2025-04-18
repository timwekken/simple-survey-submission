class SurveyResponsesController < ApplicationController

    before_action :authenticate_user!

    # POST /survey_responses
    def create
        @survey_response = SurveyResponse.new(
            survey_id: params[:survey_id],
            submitted_at: params[:submitted_at],
            response_data: params[:response_data],
            user: current_user
        )
        if @survey_response.save
            render json: {
                message: 'Survey response submitted successfully',
                survey_response: @survey_response
            }, status: :created
        else
            render json: { 
                errors: @survey_response.errors.full_messages 
            }, status: :unprocessable_entity
        end
    end
  
    # GET /survey_responses/for_survey/:survey_id
    def for_survey
        @survey = Survey.find(params[:survey_id])
        @response = SurveyResponse.find_by(survey_id: @survey.id)
        if @response
            render json: @response
        else
            render json: { message: 'No response found for this survey' }, status: :not_found
        end
    end

end
