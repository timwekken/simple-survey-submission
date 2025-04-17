class SurveysController < ApplicationController
    # GET /surveys
    def index
        @surveys = Survey.all
        render json: @surveys
    end

    # GET /survey/1
    def show
        render json: @survey
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
        @survey.destroy
    end
end
