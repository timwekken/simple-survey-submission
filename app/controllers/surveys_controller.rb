class SurveysController < ApplicationController
    # GET /surveys
    def index
        @q = Survey.ransack(params[:q])
        @surveys = @q.result(distinct: true).includes(survey_assignment: :user)
        render json: @surveys.as_json(
            include: {
                survey_assignment: {
                    include: {
                        user: { only: [:id, :email] }
                    },
                }
            }
        )
    end

    # GET /survey/1
    def show
        @survey = Survey.find(params[:id])
        if @survey
            render json: @survey
        else
            render json: { error: "Survey not found" }, status: :not_found
        end
    end

    # POST /surveys
    def create
        @survey = Survey.new(survey_params)
        if @survey.save
            render json: @survey, status: :created, location: @survey
        else
            render json: @survey.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /surveys/1
    def update
        if @survey.update(survey_params)
            render json: @survey
        else
            render json: @survey.errors, status: :unprocessable_entity
        end
    end

    # DELETE /surveys/1
    def destroy
        survey_id = params[:id]
        @survey = Survey.find(survey_id)
        @survey_questions = SurveyQuestion.where(survey_id: survey_id)

        if @survey_questions.destroy_all && @survey.destroy
            render json: { message: 'Survey successfully deleted' }, status: :ok
        else
            render json: { error: 'Failed to delete survey or associated questions' }, status: :unprocessable_entity
        end
    end
end
