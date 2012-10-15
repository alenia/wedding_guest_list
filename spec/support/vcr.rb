require 'vcr'

VCR.configure do |c|
  c.cassette_library_dir = 'spec/fixtures/vcr_cassettes'
  c.default_cassette_options = {
    serialize_with: :json
  }
  c.hook_into :webmock
  c.ignore_localhost = true
end
