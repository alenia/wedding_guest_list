require 'spec_helper'

describe 'app!' do
  it 'should do things' do
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
end
