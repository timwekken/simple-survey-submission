class Survey < ApplicationRecord
    has_one :survey_assignment, dependent: :destroy
    has_one :user, through: :survey_assignment
    has_many :survey_questions, dependent: :destroy
    has_many :survey_responses, dependent: :destroy

    def self.ransackable_attributes(auth_object = nil)
        ["title", "description"]
    end
    def self.ransackable_associations(auth_object = nil)
        []
    end
end
