class SurveyQuestionPolicy < ApplicationPolicy
  def by_survey?
    return true if user.admin? || user.manager?
    return false
  end

  def index?
    true
  end
  
  def show?
    return true if user.admin? || user.manager?
    return false
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