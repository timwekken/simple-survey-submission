# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

require 'faker'

statuses = ["new", "assigned", "completed"]
data_types = ["text", "number", "boolean", "date", "select", "radio", "checkbox"]

# Clear old data
SurveyAssignment.destroy_all
SurveyQuestion.destroy_all
Survey.destroy_all
# User.destroy_all

# Create users
# TODO: Add these

# Create surveys
surveys = 10.times.map do
  Survey.create!(
    title: Faker::Company.name() + " " + Faker::Lorem.word.capitalize,
    description: Faker::Lorem.sentence(word_count: 12)
  )
end

# Create survey questions for surveys
surveys.each do |survey|
  rand(3..7).times do
    SurveyQuestion.create!(
        survey: survey,
        label: Faker::Commerce.product_name() + " " + Faker::Lorem.word.capitalize,
        data_type: data_types.sample,
        info: Faker::Lorem.sentence(word_count: 12) + "?",
        status: statuses.sample
    )
  end
end