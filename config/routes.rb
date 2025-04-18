Rails.application.routes.draw do
  resources :survey_assignments do
    collection do
      post 'create_or_update', to: 'survey_assignments#create_or_update_assignment'
    end
  end
  resources :survey_questions do
    collection do
      get 'by_survey/:survey_id', to: 'survey_questions#by_survey'
    end
  end
  resources :survey_responses do
    collection do
      get 'for_survey/:survey_id', to: 'survey_responses#for_survey'
    end
  end
  resources :surveys
  resources :users
  devise_for :users, path: '', path_names: { 
    sign_in: 'login',
    sign_out: 'logout',
    registratrion: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
  }

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

end
