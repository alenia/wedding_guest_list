class Guest < ActiveRecord::Base
  CATEGORIES = [
    "Couple's friend",
    "Harold's family",
    "Harold's friend",
    "Harold's family-friend",
    "Harold's coworker",
    "Daniela's family",
    "Daniela's friend",
    "Daniela's family-friend",
    "Daniela's coworker"
  ]

  attr_accessible :first_name, :last_name, :category, :rank, :facebook_id, :plus_one
  validates_presence_of :first_name, :last_name
  validates_inclusion_of :category, in: CATEGORIES, allow_blank: true

  def plus_one_option
    case plus_one
    when 0
      'On list'
    when 1
      'Yes'
    end
  end

  def self.count_with_plus_ones
    Guest.count + Guest.where(plus_one: 1).count
  end
end
