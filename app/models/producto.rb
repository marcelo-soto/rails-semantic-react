class Producto < ActiveRecord::Base
	validates :codigo, presence: true, length: { minimum: 2 }
end
