class ApplicationController < ActionController::API
    include Pundit::Authorization

    # Include Devise's methods in API controllers
    include ActionController::MimeResponds
    
    # Override authenticate_user! for API usage
    def authenticate_user!
        if request.headers["Authorization"].present?
            jwt_payload = JWT.decode(request.headers["Authorization"].split(" ").last,
                                     Rails.application.secret_key_base).first
            @current_user = User.find(jwt_payload["sub"])
        else
            render json: { error: "Unauthorized" }, status: :unauthorized
        end
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        render json: { error: "Unauthorized" }, status: :unauthorized
    end
    
    def current_user
        @current_user || nil
    end

    def pundit_user
        current_user
    end


    protected

    # Handle Pundit authorization failures
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

    def user_not_authorized
        render json: { error: "You are not authorized to perform this action" }, status: :forbidden
    end
end
