require 'spec_helper'

describe GuestsController do
  describe 'GET #index' do
    it 'loads a new guest' do
      get :index
      response.should be_success
      assigns[:new_guest].should be_new_record
    end

    it 'loads guests sorted alphabetically and by category' do
      a_couple_friend = Guest.create!(first_name: 'Fake', last_name: 'Aaa', category: "Couple's friend")
      z_couple_friend = Guest.create!(first_name: 'Faker', last_name: 'Zzz', category: "Couple's friend")
      a_daniela_friend = Guest.create!(first_name: 'Fakest', last_name: 'Aaa', category: "Daniela's friend")
      get :index
      assigns[:guests].should == [a_couple_friend, z_couple_friend, a_daniela_friend]
    end
  end

  describe 'POST #create' do
    it 'saves a guest' do
      Guest.count.should == 0
      post :create, guest: { 'first_name' => 'Rory', 'last_name' => 'Williams'}
      response.should redirect_to guests_path
      Guest.first.first_name.should == 'Rory'
    end
  end

  describe 'PUT #destroy' do
    it 'deletes a guest' do
      guest = Guest.create!(first_name: 'Rory', last_name: 'Williams')
      put :destroy, id: guest.id
      Guest.count.should == 0
    end
  end

  describe 'GET #edit' do
    it 'works' do
      guest = Guest.create!(first_name: 'Rory', last_name: 'Williams')
      get :edit, id: guest.id
      assigns[:guest].should == guest
    end
  end
end
