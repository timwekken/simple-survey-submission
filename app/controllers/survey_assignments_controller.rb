class SurveyAssignmentsController < ApplicationController

    before_action :authenticate_user!

    # POST /survey_assignments
    def create_or_update_assignment
        puts "Creating or updating assignment with params: #{params.inspect}"
        assignment = SurveyAssignment.find_or_initialize_by(user_id: params[:user_id], survey_id: params[:survey_id])
        assignment.attributes = assignment_params

        if assignment.save
            render json: { message: 'Assignment successfully created or updated.' }, status: :ok
        else
            render json: { errors: assignment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def assignment_params
        params.require(:survey_assignment).permit(:status, :due_date)
    end
end
