class AddCategoryAndRankToGuests < ActiveRecord::Migration
  def change
    add_column :guests, :category, :string
    add_column :guests, :rank, :integer
  end
end
