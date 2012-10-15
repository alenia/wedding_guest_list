require 'spec_helper'

describe FacebookGuestsController do
  describe 'GET #new' do
    it 'instantiates an array of guests based on the data returned from the koala graph' do
      graph = double("graph")
      controller.stub(:koala_graph_for).and_return(graph)
      graph.stub(:get_connections).and_return([
        {"first_name"=>"Tweedle", "last_name"=>"Dee", "id"=>"1234567"},
        {"first_name"=>"Tweedle", "last_name"=>"Dum", "id"=>"100000876543210"}
      ])
      get :new, token_for: 'Flugbert'
      assigns[:friend_guests].length.should == 2
      dee = assigns[:friend_guests][0]
      dee.facebook_id.should == 1234567
    end
  end
end
