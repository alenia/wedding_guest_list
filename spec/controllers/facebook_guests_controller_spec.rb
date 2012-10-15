require 'spec_helper'

describe FacebookGuestsController do
  describe 'GET #new' do
    before do
      graph = double("graph")
      controller.stub(:koala_graph_for).and_return(graph)
      graph.stub(:get_connections).and_return([
        {"first_name"=>"Tweedle", "last_name"=>"Dee", "id"=>"1234567"},
        {"first_name"=>"Tweedle", "last_name"=>"Dum", "id"=>"100000876543210"}
      ])
    end

    it 'instantiates an array of guests based on the data returned from the koala graph' do
      get :new, token_for: 'Flugbert'
      assigns[:friend_guests].length.should == 2
      dee = assigns[:friend_guests][0]
      dee.facebook_id.should == 1234567
    end

    it 'does not include guests whose id matches real facebook guests' do
      Guest.create(first_name: "Foo", last_name: "Bar", facebook_id: "1234567")
      get :new, token_for: 'Flugbert'
      assigns[:friend_guests].length.should == 1
    end
  end
end
