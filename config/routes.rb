Rails.application.routes.draw do
  resources :survey_assignments
  resources :survey_questions
  resources :surveys
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

  # Defines the root path route ("/")
  # root "posts#index"
end
