Rails.application.routes.draw do
  get 'kinetics/index'
  root "kinetics#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
