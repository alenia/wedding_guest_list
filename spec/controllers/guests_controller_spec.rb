require 'spec_helper'

describe GuestsController do
  it 'has an index that loads a new guest and all the guests' do
    guest = Guest.create!(first_name: 'Rory', last_name: 'Williams')
    get :index
    response.should be_success
    assigns[:new_guest].should be_new_record
    assigns[:guests].should == [guest]
  end

  describe 'POST #create' do
    it 'saves a guest' do
      Guest.count.should == 0
      post :create, guest: { 'first_name' => 'Rory', 'last_name' => 'Williams'}
      response.should redirect_to guests_path
      Guest.first.first_name.should == 'Rory'
    end
  end
end
