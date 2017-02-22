const auth = require('../tokens').instagram


/*
Instagram doesn't want you to use their API for this.
Public data is NOT available in the API unless you submit an application, and this use case is not accepted.
Thanks, Instagram...

So none of this works, as it was abandoned.
*/




// Max = 8 per minute
// Should be 30*1000 for 0.5 minutes per poll
const INSTAGRAM_POLL_MS = 30 * 1000;

const ig = require('instagram-node').instagram();
ig.use({ 
  client_id: auth.client_id,
  client_secret: auth.client_secret,
  access_token: auth.access_token
});

const tagHandler =  function(err, medias, pagination, remaining, limit) {
  if (err) {
    try {
      console.error(`Got error: ${err.code} - ${err.error_type} - ${err.error_message} \n\t${err.status_code} - ${err.body}`)
    } catch (undefinedField) {
      // Ignored
    } finally {
      return
      // or: err.retry()
    }
  }

  console.log('Found medias: ' + medias)
  if (pagination.next) {
    console.log('Has more pages')
    // pagination.next(tagHandler) gets second page
  }
}

function loadInsta() {
  console.log('Polling instagram');
  /* OPTIONS: { [min_tag_id], [max_tag_id] }; */
  ig.tag_media_recent('tag', tagHandler);
 
  setTimeout(loadInsta, INSTAGRAM_POLL_MS);
}

module.exports = loadInsta