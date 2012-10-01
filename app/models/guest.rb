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

  attr_accessible :first_name, :last_name, :category, :rank
  validates_presence_of :first_name, :last_name
  validates_inclusion_of :category, in: CATEGORIES, allow_blank: true
end
