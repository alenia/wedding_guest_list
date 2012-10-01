class FacebookCheckerController < ApplicationController
  def index
    #Yeah yeah, really ugly untested code that I usually don't do. WILL CHANGE. Need to commit my spike.
    person = params[:token_for] || "Daniela"
    token_key = "#{person}_FB_TOKEN".upcase
    file = File.read('lib/facebook_access_tokens.json') unless Rails.env == 'production'
    access_token = Rails.env == 'production' ? ENV[token_key] : JSON.parse(file)[token_key]
    graph = graph = Koala::Facebook::API.new(access_token)
    friends = graph.get_connections("me", "friends", {"fields" => "first_name,last_name"})
    @friend_guests = friends.map do |friend|
      Guest.new(friend)
    end
  end
end
