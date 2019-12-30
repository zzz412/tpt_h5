<template>
  <div class="bg" v-touch:start="start" v-touch:end="swipeHandler">
    <div class="loading">
      <transition name="txt" appear>
        <img src="http://cdn.hwzhj.top/Logo.png" class="logo" alt />
      </transition>
      <transition name="txt" appear>
        <img src="http://cdn.hwzhj.top/文字.png" class="txt" alt />
      </transition>
      <img src="http://cdn.hwzhj.top/向上滑动.png" class="up" alt />
      <!-- <div class="loading-top">
        <div class="amd line"></div>
        <div class="amd pen"></div>
      </div>-->
      <!-- <div class="loading-bottom">
        <div class="amd loading_text"></div>
      </div>-->
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/touchu";
export default {
  mixins: [mixins],
  methods: {
    goPage() {
      this.$store.commit("CHANGE_ROUTER", "TransForm");
    }
    // start(e){
    //   console.log('开始',e)
    // },
    // swipeHandler(e) {
    //   console.log(e)
    //   // console.log(11);
    //   // this.$router.push("/transform");
    //   // this.$store.commit("CHANGE_ROUTER", "TransForm");
    // }
  }
};
</script>

<style lang="scss" scoped>
.txt-enter {
  opacity: 0;
  // transform: translateX(50px);
  transform: scale(0.3);
}
.txt-enter-active {
  transition: all 1.2s;
}
.bg {
  height: 100%;
  background-image: url("http://cdn.hwzhj.top/BG.jpg");
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  position: relative;
  .loading {
    position: absolute;
    left: calc(50% - 50px);
    height: 100%;
    width: 100px;
    display: flex;
    justify-content: center;
    .logo {
      position: absolute;
      width: 90px;
      top: 65px;
    }
    .txt {
      position: absolute;
      width: 71px;
      top: 149px;
    }
    .up {
      position: absolute;
      width: 52.5px;
      bottom: 40px;
      animation: mymove 1.3s ease-in-out infinite alternate;
      @keyframes mymove {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: translate(0, 6px);
        }
      }
    }
  }
}
</style>
