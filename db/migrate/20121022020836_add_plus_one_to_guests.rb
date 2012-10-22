class AddPlusOneToGuests < ActiveRecord::Migration
  def change
    add_column :guests, :plus_one, :integer
  end
end
