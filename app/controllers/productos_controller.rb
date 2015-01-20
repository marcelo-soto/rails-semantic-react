class ProductosController < ApplicationController
  def index
    @productos = Producto.all.order(:codigo)
  end
  def new
  	@producto = Producto.new
  end

  def create
  	@producto = Producto.new producto_params
  	if @producto.valid?
  		@producto.save
  		redirect_to root_path, notice: "Producto creado exitosamente"
  	else
  		render "new"
  	end
  end

  def edit
    @producto = Producto.new
    if Producto.exists?(params[:id])
      @producto = Producto.find params[:id]
    else
      redirect_to root_path, alert: "Producto no existe"
    end
  end

  def update
    if Producto.exists?(params[:producto][:id])
      Producto.update(params[:producto][:id], producto_params)
      redirect_to root_path, notice: "Producto editado exitosamente"
    else
      redirect_to root_path, alert: "Producto no existe"
    end
  end

  private
  def producto_params
  	params.require(:producto).permit(:codigo, :descripcion, :esta_activo)
  end
end
