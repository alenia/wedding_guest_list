require 'spec_helper'

describe 'app!' do
  it 'should allow people to enter guests' do
    visit '/'
    page.should have_content 'Daniela and Harold'
    fill_in 'First name', with: 'Doctor'
    fill_in 'Last name', with: 'Who'
    select "Couple's friend", from: 'Category'
    select "0", from: 'Rank'
    click_button 'Add Guest'
    page.should have_content 'Doctor'
    page.should have_content 'Who'
  end

  it 'should display the guest count based on the number of plus ones' do
    Guest.create(first_name: 'Rory', last_name: 'Williams')
    visit '/'
    page.should have_content('The total number of guests is 1')
    fill_in 'First name', with: 'Amy'
    fill_in 'Last name', with: 'Pond'
    select 'On list', from: 'Plus 1?'
    click_button 'Add Guest'
    page.should have_content('The total number of guests is 2')
    fill_in 'First name', with: 'Doctor'
    fill_in 'Last name', with: 'Who'
    select 'Yes', from: 'Plus 1?'
    click_button 'Add Guest'
    page.should have_content('The total number of guests is 4')
  end
end
