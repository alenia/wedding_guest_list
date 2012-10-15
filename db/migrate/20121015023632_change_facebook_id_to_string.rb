class ChangeFacebookIdToString < ActiveRecord::Migration
  def up
    remove_column :guests, :facebook_id
    add_column :guests, :facebook_id, :string
  end

  def down
    remove_column :guests, :facebook_id
    add_column :guests, :facebook_id, :integer
  end
end
