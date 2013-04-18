require 'spec_helper'

describe 'adding friends from facebook friend checklists' do
  it "should give you a list of Daniela's facebook friends" do
    pending 'figure out how to do this with stubs'
    visit '/facebook_guests/new'
    page.should have_content 'Friend'
  end
end
