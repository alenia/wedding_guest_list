class GuestsController < ApplicationController
  def index
    @new_guest = Guest.new
    @guests = Guest.all
  end

  def create
    @new_guest = Guest.new(params[:guest])
    if @new_guest.save
      flash[:notice] = 'New guest created'
      if params[:guest]["facebook_id"]
        redirect_to new_facebook_guest_path
      else
        redirect_to guests_path
      end
    else
      flash[:alert] = 'Sorry, your guest was not created'
      @guests = Guest.all
      render :index
    end
  end
end
