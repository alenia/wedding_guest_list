require 'spec_helper'

describe 'app!' do
  it 'should do things' do
    visit '/'
    page.should have_content 'Daniela and Harold'
  end
end
