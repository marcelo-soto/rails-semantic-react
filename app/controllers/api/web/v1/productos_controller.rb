class Api::Web::V1::ProductosController < ApplicationController
  def index
    @productos = Producto.all.order(:codigo)
    render json: @productos
  end

  def set_active
    salida = begin
      Producto.update(params[:producto_id], esta_activo: true)
      {status: :ok}
    rescue
      {status: :nk}
    end
    render json: salida
  end

  def set_inactive
    salida = begin
      Producto.update(params[:producto_id], esta_activo: false)
      {status: :ok}
    rescue
      {status: :nk}
    end
    render json: salida
  end

end
