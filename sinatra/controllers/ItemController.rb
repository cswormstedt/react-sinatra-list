class ItemController < ApplicationController


  options "*" do
    response.headers["Allow"] = "HEAD,GET,POST,PUT,PATCH,DELETE,OPTIONS"

    # Needed for AngularJS
    response.headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept"
    response['Access-Control-Allow-Origin'] = '*'

    "cool"
  end

  get '/' do
      response['Access-Control-Allow-Origin'] = '*'
      content_type :json

      @items =  Item.all
      @items.to_json
  end

  get '/:id' do
    content_type :json

    id = params[:id]
    @item = Item.find(id)
    @item.to_json
  end

  post '/' do
    response['Access-Control-Allow-Origin'] = '*'
    content_type :json

    puts JSON.parse(request.body.read.to_s)
    @item = Item.new
    @item.title = JSON.parse(request.body.read.to_s)
    @item.save

    @items = Item.all
    @items.to_json
  end

  patch '/:id' do
    content_type :json

    id = params[:id]

    @item = Item.find(id)
    @item.title = params[:title]
    @item.save

    @items = Item.all
    @items.to_json
  end

  delete '/:id' do
    content_type :json

    id = params[:id]

    @item = Item.find(id)
    @item.destroy

    @items = Item.all
    @items.to_json
  end
end
