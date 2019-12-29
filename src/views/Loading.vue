<template>
  <div class="bg" v-touch:swipe.top="swipeHandler">
    <div class="loading">
      <div class="loading-top">
        <div class="amdline">
          <div class="amd line"></div>
        </div>
        <div class="amd pen"></div>
      </div>
      <div class="loading-bottom">
        <div class="amd loading_text"></div>
      </div>
      <!-- <van-button @click="fade=!fade">点我</van-button>
      <transition name="van-slide-up">
        <div v-show="fade">Slide Up</div>
      </transition>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fade: false
    };
  },
  methods: {
    swipeHandler() {
      // console.log(11);
      // this.$router.push("/home");
    }
    // goHome()
  },
  mounted() {
    setTimeout(() => {
      this.$router.push("/home");
    }, 5000);
  }
};
</script>

<style lang="scss" scoped>
.bg {
  height: 100%;
  background-image: url("../assets/loading/BG.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  position: relative;
  .loading {
    position: absolute;
    top: calc(50% - 50px);
    height: 100px;
    width: 100%;
    .amd {
      position: absolute;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .loading-top {
      height: 28px;
      //   background: red;
      display: flex;
      .amdline {
        width: 215px;
        height: 20px;
        position: absolute;
        left: 64px;
        top: 0;
        overflow: hidden;
      }
      .line {
        background-image: url("../assets/loading/钢笔轨迹.png");
        width: 215px;
        height: 20px;
        left: -215px;
        animation: line 5s ease-out forwards;
        // left: 64px;
        // top: 0;
      }
      @keyframes line {
        100% {
          left: 0;
        }
      }
      .pen {
        background-image: url("../assets/loading/钢笔.png");
        width: 103px;
        height: 84px;
        top: -64px;
        left: 12px;
        animation: pen 5s ease-out forwards;
      }
      @keyframes pen {
        100% {
          left: 227px;
        }
      }
    }
    .loading-bottom {
      height: 20px;
      position: relative;
      .loading_text {
        width: 70px;
        height: 40px;
        background-image: url("../assets/loading/加载中.png");
        top: 0;
        left: calc(50% - 35px);
      }
    }
  }
}
</style>
