get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/grid1' do 
	erb :grid1
end

get '/one-ajax-trip' do
	erb :ajaxOnLoad_manyTriggers, :layout => false
end