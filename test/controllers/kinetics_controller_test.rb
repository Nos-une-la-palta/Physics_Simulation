require 'test_helper'

class KineticsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get kinetics_index_url
    assert_response :success
  end

end
