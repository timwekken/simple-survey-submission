class CreateSurveyQuestions < ActiveRecord::Migration[8.0]
  def change
    create_table :survey_questions do |t|
      t.string :label
      t.string :data_type
      t.text :info
      t.string :status
      t.references :survey, null: false, foreign_key: true

      t.timestamps
    end
  end
end
