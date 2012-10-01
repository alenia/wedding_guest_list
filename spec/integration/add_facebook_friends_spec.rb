require 'spec_helper'

describe 'adding friends from facebook friend checklists' do
  it "should give you a list of Daniela's facebook friends" do
    # Not well testing this right now because I need to do some stubbing and I'm going to
    # super change how this page works
    visit '/facebook_checker?token_for=Harold'
    page.should have_content 'Kara'
  end
end
