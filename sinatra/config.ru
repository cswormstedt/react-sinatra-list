require 'sinatra/base'

require './controllers/ApplicationController'
require './controllers/ItemController'

require './models/ItemModel'


map('/') {run ApplicationController}
map('/items') {run ItemController}
