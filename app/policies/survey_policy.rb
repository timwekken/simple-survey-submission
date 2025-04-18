class SurveyPolicy < ApplicationPolicy
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
  
  def destroy?
    admin?
  end
  
  class Scope < Scope
    def resolve
      if user.admin?
        scope.all
      elsif user.manager?
        scope.all
      else
        user.surveys
      end
    end
  end

end