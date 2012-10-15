class AddFacebookIdToGuests < ActiveRecord::Migration
  def change
    add_column :guests, :facebook_id, :integer
  end
end
