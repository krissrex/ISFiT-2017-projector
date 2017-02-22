

module.exports = {
  instagram: {
    /*
    Ignore this. Instagram doesn't work anyways 
    */
    client_id: '',
    client_secret: '',
    access_token: '' // krissrex
  },
  admin: {
    /*
    You choose
    */
    password: ''
  },
  twitter: {
    /*
    Get this from https://apps.twitter.com/ :
    1. Sign up and create an app. Fill inn needed details
    2. Go to "Keys and Access Tokens"
    3. Copy "Consumer Key" and "Consumer Secret" from "Application Settings"
    4. Get an "Access Token" for your user by authenticating on the bottom of the page
    5. Copy the "Access Token" and "Access Token Secret"
    */
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_secret: '',
    callback_url: 'http://isfit.gobiapp.com'
  }
}