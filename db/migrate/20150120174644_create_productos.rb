class CreateProductos < ActiveRecord::Migration
  def change
    create_table :productos do |t|
      t.string :codigo
      t.string :descripcion
      t.boolean :esta_activo, default: true

      t.timestamps null: false
    end
  end
end
