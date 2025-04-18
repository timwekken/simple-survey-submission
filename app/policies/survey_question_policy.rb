class SurveyQuestionPolicy < ApplicationPolicy
  def by_survey?
    true
  end

  def index?
    true
  end
  
  def show?
    true
  end
  
  def create?
    admin? || manager?
  end
  
  def update?
    admin? || manager?
  end
  
  def destroy?
    admin?
  end

end