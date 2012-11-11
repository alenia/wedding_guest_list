class GuestsController < ApplicationController
  if Rails.env.production?
    http_basic_authenticate_with :name => ENV['BASIC_AUTH_USER'], :password => ENV['BASIC_AUTH_PASSWORD']
  end
  def index
    @new_guest = Guest.new
    @guests = Guest.order('category, last_name, first_name')
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
      @guests = Guest.all(order: 'category, last_name, first_name')
      render :index
    end
  end

  def edit
    @guest = Guest.find(params[:id])
  end

  def update
    @guest = Guest.find(params[:id])

    if @guest.update_attributes(params[:guest])
      redirect_to guests_path, notice: 'Your guest has been updated'
    else
      render :edit
    end
  end

  def destroy
    @guest = Guest.find(params[:id])
    @guest.destroy

    redirect_to guests_path
  end
end
