class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, 
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :survey_assignments
  has_many :surveys, through: :survey_assignments
  has_many :survey_responses
    
  enum :role, { admin: 0, manager: 1, user: 2 }

  def admin?
    role == "admin"
  end
  
  def manager?
    role == "manager"
  end
  
  def regular_user?
    role == "user"
  end

end
