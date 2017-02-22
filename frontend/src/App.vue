<template>
  <div id="app">
    <Gobi id="gobi"></Gobi>
    <Twitter id="twitter"></Twitter>
    <Samfundet id="samfundet"></Samfundet>
  </div>
</template>

<style>
  #gobi {
    position: absolute;
    top: 0;
    left: 0;
    right: 56.25vh;
    bottom: 31.640625vh;
    overflow: hidden;
  }
  #instagram {
    position: absolute;
    top: 0;
    left: 121.527778vh;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  #twitter {
    position: absolute;
    top: 68.359375vh;
    left: 0;
    right: 56.25vh;
    bottom: 0;
    background-color: #2b87ab;
    overflow: hidden;
  }
  #samfundet {
    background-color: #F5F5F5;
    position: absolute;
    top: 0;
    left: 121.527778vh;
    right: 0;
    bottom: 0;
  }
</style>

<script>
import Twitter from './components/Twitter'
import Instagram from './components/Instagram'
import Gobi from './components/Gobi'
import Samfundet from './components/Samfundet'

export default {
  name: 'app',
  components: {
    Twitter,
    Instagram,
    Gobi,
    Samfundet
  }
}
</script>
