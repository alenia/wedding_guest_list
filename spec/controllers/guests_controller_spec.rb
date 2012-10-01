require 'spec_helper'

describe GuestsController do
  it 'should work' do
    get :index
    response.should be_success
  end
end
