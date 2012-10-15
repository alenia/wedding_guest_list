class FacebookGuestsController < ApplicationController
  def new
    person = params[:token_for] || "Daniela"

    graph = koala_graph_for(person)
    friends = graph.get_connections("me", "friends", {"fields" => "first_name,last_name"})
    @friend_guests = friends.map do |friend|
      friend["facebook_id"] = friend.delete("id")
      next if guest_facebook_ids.include? friend["facebook_id"]
      Guest.new(friend, without_protection: true) # since first_name, last_name, and facebook_id are the only attributes
    end.compact
  end

  private

  def guest_facebook_ids
    @guest_facebook_ids ||= Guest.all.map(&:facebook_id)
  end

  def koala_graph_for(person)
    token_key = "#{person}_FB_TOKEN".upcase
    file = File.read('lib/facebook_access_tokens.json') unless Rails.env == 'production'
    access_token = Rails.env == 'production' ? ENV[token_key] : JSON.parse(file)[token_key]
    Koala::Facebook::API.new(access_token)
  end
end
