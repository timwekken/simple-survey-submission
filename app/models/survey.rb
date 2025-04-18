class Survey < ApplicationRecord
    has_one :survey_assignment, dependent: :destroy
    has_one :user, through: :survey_assignment

    def self.ransackable_attributes(auth_object = nil)
        ["title", "description"]
    end
    def self.ransackable_associations(auth_object = nil)
        []
    end
end
