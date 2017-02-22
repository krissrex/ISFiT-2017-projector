const Tweet = require('../data/tweet')
const Twitter = require('node-tweet-stream')
const TwitterRest = require('twitter-node-client').Twitter
const colors = require('colors/safe') //https://www.npmjs.com/package/colors
const auth = require('../tokens').twitter

const debug = false;

const TAGS = debug ? ['#rextest'] : ['#isfit17', '#labelme']
const USERS = debug ? ['33492562'] : ['14432975'] // user krissrex or isfit. Use this to find id: http://gettwitterid.com/
const USER_NAMES = debug ? ['KrissRex'] : ['ISFiT']

let oldTweets = []
const tweetCache = []
const clients = []
const deleted = []
const MAX_TWEETS = 6 // limits the number of tweets in the cache

// Query for existing tweets
const tRest = new TwitterRest({
    	"consumerKey": auth.consumer_key,
    	"consumerSecret": auth.consumer_secret,
    	"accessToken": auth.access_token,
    	"accessTokenSecret": auth.access_secret,
    	"callBackUrl": auth.callback_url
})

function apiToModel(apiObject) {
  let pic = apiObject.user.profile_image_url
  let timestamp = new Date(apiObject.created_at).getTime()
  return new Tweet(pic, apiObject.text, apiObject.user.screen_name, apiObject.user.name, apiObject.favorite_count, apiObject.retweet_count, timestamp, apiObject.id)
}

/* 
Get a list of already existing tweets to serve to new clients.
Docs at https://dev.twitter.com/
Hardcoded to use "since" and "util" within ISFiT 2017s timespan.  
*/
tRest.getSearch({'q':`${TAGS.join(' OR ')} OR ${ USER_NAMES.map((it) => 'from:' + it).join(' OR ') } since:2017-02-9 until:2017-02-20`, 'count': 5, 'result\_type':'recent'}, 
  (err, response, body) => {
    console.error('Searching for tweets failed', err, response, body)
  }, 
  (data) => {
    console.log('Found old tweets', data)
    data = JSON.parse(data)
    oldTweets = data.statuses.map(apiToModel).sort((a, b) => a.timestamp > b.timestamp)
  }
);


const tStream = new Twitter({
    consumer_key: auth.consumer_key,
    consumer_secret: auth.consumer_secret,
    token: auth.access_token,
    token_secret: auth.access_secret
  })

tStream.on('error', function (err) {
  console.error(`Twitter error: ${err}`)
})


tStream.track(TAGS)
tStream.follow(USERS)

console.log('Tracking', TAGS, USERS)

/*
Get a live stream of new tweets as they are tweeted,
and save them for clients that connect later
 */
tStream.on('tweet', function (tweet) {
    let t = apiToModel(tweet)
    console.log(colors.magenta('tweet received:\n' + t))

    tweetCache.push(t)
    if (tweetCache.length > MAX_TWEETS) {
      tweetCache.splice(0, tweetCache.length - MAX_TWEETS)
    }

    clients.forEach((client) => client.emit('new', t));
})

/**
 * Combines the old tweets found on server startup with the new tweets cached from the live stream
 */
function oldAndCache () {
  let tweets = oldTweets.concat(tweetCache).sort((a, b) => a.timestamp > b.timestamp)
  // remove duplicates by comparing id
  for (let x = tweets.length - 1; x >= 0; x--) {
    for (let y = x-1; y >= 0; y--) {
      if (tweets[x].id == tweets[y].id) {
        tweets.splice(x, 1)
        break
      }
    }

  // Remove tweets that are banned/deleted by admin
  for (let y = 0; y < deleted.length; y++) {
      if (tweets[x].id == deleted[y].id) {
        tweets.splice(x, 1)
        break
      }
    }
  }
  console.log('Old and cache: ', tweets)
  return tweets
}

/**
 * @return a callback for admmins to delete tweets with
 */
module.exports = function(socketIo) {
  const twitterSocket = socketIo
    .of('/twitter')
    .on('connection', function (socket) {
      console.log(`Socket connected to twitter with id ${socket.id}`)
      clients.push(socket)

      socket.on('disconnect', () => {
        console.log(`Socket disconnected from twitter with id ${socket.id}`)
        clients.splice(clients.indexOf(socket), 1)
      })

      socket.emit('old', oldAndCache())
    })
    
    return (tweet) => {
      deleted.push(tweet)
      clients.forEach( (it) => it.emit('delete', tweet))
    }
}