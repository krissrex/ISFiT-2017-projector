<template>
  <div>
    <span class="info">
      Send a tweet with <b>#isfit17</b> or <b>#labelme</b>
    </span>
    <transition-group class="tweets" name="slide" tag="div">
      <Tweet class="tweet" v-for="tweet in tweets" :key="tweet.id" :tweet="tweet"></Tweet>
    </transition>
  </div>
</template>

<style scoped>
  .tweets {
    width: 100%;
    height: 100%;
    position: relative;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;
    align-items: center;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.3em;
  }

  .info {
    visibility: hidden;
    position: relative;
    left: 20px;
    top: 1em;
    font-family: Arial, Helvetica, sans-serif;
    color: #eee;
    font-size: 2em;
  }
  .info b {
    font-weight: bold;
    font-size: 1.1em;
  }

  .slide-enter-active {
    transition: opacity 2s;
    transition-delay: 1s;
  }
  .slide-leave-active {
    transition: opacity 1s;
  }
  .slide-enter {
    opacity: 0;
  }
  .slide-enter-to {
    opacity: 1;
  }
  .slide-leave {
    opacity: 1;
  }
  .slide-leave-to {
    opacity: 0;
  }
</style>

<script>
const io = require('socket.io-client')
const Tweet = require('./Tweet')
const MAX_TWEETS = 3

export default {
  name: 'twitter',
  created () {
    let socket = io(':80/twitter')
    socket.on('connect', () => console.log('Connected to /twitter'))
    socket.on('new', (tweet) => {
      console.log('Got tweet:', tweet)

      this.tweets.push(tweet)
      this.trimTweets()
    })
    socket.on('old', (tweetArray) => {
      console.log('Got list of old tweets:', tweetArray)

      this.tweets = tweetArray
      this.trimTweets()
    })
    socket.on('delete', (tweet) => {
      let match = this.tweets.find((it) => it.id === tweet.id)
      if (match) {
        this.tweets.splice(this.tweets.indexOf(match), 1)
      }
    })
  },
  components: {
    Tweet
  },
  data () {
    return {
      tweets: []
    }
  },
  methods: {
    trimTweets () {
      if (this.tweets.length > MAX_TWEETS) {
        this.tweets.splice(0, this.tweets.length - MAX_TWEETS)
      }
    }
  }
}
</script>
