require 'spec_helper'

describe Guest do
  describe 'categories' do
    it 'should have a constant for the categories' do
      Guest::CATEGORIES.should == [
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
    end

    it 'should validate category based on the possible values' do
      Guest.new(first_name: 'Betty', last_name: 'Boop', category: "Daniela's coworker").should be_valid
      Guest.new(first_name: 'Betty', last_name: 'Boop', category: "").should be_valid
      Guest.new(first_name: 'Betty', last_name: 'Boop', category: "Giant monkey").should_not be_valid
    end
  end
end
