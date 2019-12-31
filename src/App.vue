<template>
  <div id="app">
    <audio src="http://cdn.hwzhj.top/h5BG.mp3" id="audios" autoplay preload loop="loop"></audio>
    <!-- <transition name="van-slide-down" mode="out-in"> -->
    <router-view />
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  mounted() {
    this.audioAutoPlay("audios");
  },
  beforeDestroy() {
    this.bgMusic.pause();
  },
  data() {
    return {
      bgMusic: ""
    };
  },
  methods: {
    audioAutoPlay(id) {
      var audio = (this.bgMusic = document.getElementById(id)),
        play = function() {
          audio.play();
          document.removeEventListener("touchstart", play, false);
        };
      audio.play();
      document.addEventListener(
        "WeixinJSBridgeReady",
        function() {
          play();
        },
        false
      );
      document.addEventListener(
        "YixinJSBridgeReady",
        function() {
          play();
        },
        false
      );
      document.addEventListener("touchstart", play, false);
    }
  }
};
</script>
<style lang="scss">
@import url(../public/reset.css);
@font-face {
  font-family: "方正准圆简体";
  src: url("http://cdn.hwzhj.top/FZY3JW.TTF");
  // src: url("../public/FZY3JW.TTF");
}

@font-face {
  src: url("http://cdn.hwzhj.top/FZZZHONGJW.TTF");
  // src: url("../public/FZZZHONGJW.TTF");
  font-family: "方正正中黑简体";
}

html {
  font-family: "方正正中黑简体", "方正准圆简体";
  height: 100%;
}
body,
#app {
  height: 100%;
  font-size: 37.5px;
  // background-image: url("./assets/loading/BG.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  overflow: hidden;
}
.txt-enter {
  opacity: 0;
  transform: translateX(50px);
}
.txt-enter-active {
  transition: all 0.7s;
}
</style>
