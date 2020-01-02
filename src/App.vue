<template>
  <div id="app">
    <img
      :src="bgState?'http://cdn.hwzhj.top/musicPause.png':'http://cdn.hwzhj.top/musicPlay.png'"
      alt
      ref="au"
      class="musicBtn"
      @click="musicContrl"
    />
    <!-- http://cdn.hwzhj.top/musicPlay.png -->
    <audio src="http://cdn.hwzhj.top/新生代bg.mp3" id="audios" autoplay preload loop="loop"></audio>
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
      bgMusic: "",
      bgState: false
    };
  },
  methods: {
    // bgState() {
    //   var au = document.getElementById("audios") || false;
    //   console.log(au)
    //   if (au) {
    //     return au.paused;
    //   }
    //   return true;
    // },
    audioAutoPlay(id) {
      var audio = (this.bgMusic = document.getElementById(id)),
        play = () => {
          audio.play();
          this.bgState = false;
          document.removeEventListener("touchstart", play, false);
        };
      audio.play();
      document.addEventListener(
        "WeixinJSBridgeReady",
        () => {
          play();
          this.bgState = false;
        },
        false
      );
      document.addEventListener(
        "YixinJSBridgeReady",
        () => {
          play();
          this.bgState = false;
        },
        false
      );
      document.addEventListener("touchstart", play, false);
    },
    musicContrl() {
      if (this.bgState) {
        // console.log("开始", this.bgState);
        this.bgMusic.play();
        this.bgState = false;
      } else {
        // console.log("暂停", this.bgState);
        this.bgMusic.pause();
        this.bgState = true;
      }
    }
  }
};
</script>
<style lang="scss">
@import url(../public/reset.css);
@font-face {
  font-family: "方正准圆简体";
  src: url("https://ecustomer.cntaiping.com/static/font/FZY3JW.TTF");
  // src: url("../public/FZY3JW.TTF");
}

@font-face {
  src: url("https://ecustomer.cntaiping.com/static/font/FZZZHONGJW.TTF");
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
  position: relative;
}
.txt-enter {
  opacity: 0;
  transform: translateX(50px);
}
.txt-enter-active {
  transition: all 0.7s;
}
</style>
<style lang="scss" scoped>
.musicBtn {
  position: absolute;
  width: 30px;
  top: 10px;
  right: 10px;
  z-index: 99;
  padding: 10px;
}
</style>
