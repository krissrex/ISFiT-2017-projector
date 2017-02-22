<template>
  <div class="tweet">
    <div class="tweet-meta">
      <span class="tweet-name">{{this.tweet.name}}</span>
      <span class="tweet-handle">{{this.tweet.handle}}</span>
      <span class="tweet-time">{{this.timeAgo}}</span>
    </div>
    <p class="tweet-message">
      {{tweet.message}}
    </p>    
  </div>
</template>
    
<style scoped>
  .tweet {
    background: #EAEAEA;
    padding: 10px;
    display: inline-block;
    box-sizing: border-box;
    margin: 10px;
    width: 30%;
    height: 80%;
    border-radius: 20px;
    font-size: 0.9em;
    overflow: hidden;
  }
  .tweet-meta {
    font-size: 0.8em;
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
    margin-top: 10px;

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
      timeAgo: '0m',
      update: -1
    }
  },
  created () {
    const updateTime = () => {
      console.log('Updating time ago')
      let minutesAgo = Math.max((new Date().getTime() - this.tweet.timestamp) / (1000 * 60), 0)
      if (minutesAgo >= 60) {
        let hoursAgo = Math.max(minutesAgo / 60, 0)
        this.timeAgo = `${Math.floor(hoursAgo)}h`
      }
      this.timeAgo = `${Math.floor(minutesAgo)}m`

      this.update = setInterval(updateTime, 60 * 1000)
    }

    updateTime()
  },
  destroyed () {
    if (this.updateTime) {
      clearInterval(this.updateTime)
      this.updateTime = -1
    }
  }
}
</script>
