class SurveyAssignment < ApplicationRecord
  belongs_to :user
  belongs_to :survey
end
