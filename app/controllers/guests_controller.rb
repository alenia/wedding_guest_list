class GuestsController < ApplicationController
  def index
    @new_guest = Guest.new
    @guests = Guest.all
  end

  def create
    ap params[:guest]
    @new_guest = Guest.new(params[:guest])
    if @new_guest.save
      flash[:notice] = 'New guest created'
      redirect_to guests_path
    else
      flash[:alert] = 'Sorry, your guest was not created'
      @guests = Guest.all
      render :index
    end
  end
end
