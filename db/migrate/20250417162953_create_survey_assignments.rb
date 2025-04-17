class CreateSurveyAssignments < ActiveRecord::Migration[8.0]
  def change
    create_table :survey_assignments do |t|
      t.references :user, null: false, foreign_key: true
      t.references :survey, null: false, foreign_key: true

      t.timestamps
    end
  end
end
