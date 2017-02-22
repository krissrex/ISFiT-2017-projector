<template>
  <div class="tweet" :class="{'tweet--deleted': deleted}">
    <button class="tweet-delete" @click="ban" v-if="!deleted">Delete</button>
    <span class="tweet-name">{{this.tweet.name}}</span>
    <span class="tweet-handle">{{this.tweet.handle}}</span>
    <span class="tweet-time">{{this.timestampToTimeAgo}}</span>
    <p class="tweet-message">
      {{tweet.message}}
    </p>    
  </div>
</template>
    
<style scoped>
  .tweet {
    position: relative;
    background: #EAEAEA;
    padding: 15px;
    display: inline-block;
    box-sizing: border-box;
    margin: 10px;
    width: 30%;
    height: 60%;
    border-radius: 20px;
    font-size: 1.1em;
  }
  .tweet--deleted {
    opacity: 0.5;
  }
  .tweet-delete {
    position: absolute;
    right: 8px;
    top: 8px;
    background-color: red;
    height: 50px;
    width: 50px;
    border-radius: 25px;
    border: 1px solid black;
    cursor: pointer;
  }
  .tweet-handle {
    color: #8899a6;
    font-size: 0.8em;    
  }
  .tweet-handle::before {
    content: '@';
  }
  .tweet-name {
    font-weight: bold;
    color: #292f33;
  }
  .tweet-message {
    color: #292f33;
    margin-top: 20px;

    -ms-word-break: break-all;
        word-break: break-all;

        /* Non standard for webkit */
        word-break: break-word;

    -webkit-hyphens: auto;
      -moz-hyphens: auto;
        -ms-hyphens: auto;
            hyphens: auto;
  }
  .tweet-time {
    color: #8899a6;
    font-size: 0.8em;
  }
  .tweet-time::before {
    content: "\00b7";
  }
</style>

<script>
export default {
  name: 'tweet',
  props: ['tweet'],
  data () {
    return {
      deleted: false
    }
  },
  methods: {
    ban () {
      if (confirm('Delete this tweet? This can\'t be undone')) {
        console.log('Delete')
        if (window.banTweet) {
          window.banTweet(this.tweet)
          this.deleted = true
        }
      } else {
        console.log('Cant')
      }
    }
  },
  computed: {
    timestampToTimeAgo () {
      let minutesAgo = Math.max((new Date().getTime() - this.tweet.timestamp) / (1000 * 60), 0)
      if (minutesAgo >= 60) {
        let hoursAgo = Math.max(minutesAgo / 60, 0)
        return `${Math.floor(hoursAgo)}h`
      }
      return `${Math.floor(minutesAgo)}m`
    }
  }
}
</script>
