<template>
  <div class="bg" v-touch:swipe.top="swipeHandler">
    <div class="loading">
      <div class="loading-top">
        <div class="amd line"></div>
        <div class="amd pen"></div>
      </div>
      <div class="loading-bottom">
        <div class="amd loading_text"></div>
      </div>
      <!-- <van-button @click="fade=!fade">点我</van-button>
      <transition name="van-slide-up">
        <div v-show="fade">Slide Up</div>
      </transition> -->
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
      console.log(11);
      this.$router.push("/home");
    }
    // goHome()
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
      .line {
        background-image: url("../assets/loading/钢笔轨迹.png");
        width: 215px;
        height: 20px;
        left: 64px;
        top: 0;
      }
      .pen {
        background-image: url("../assets/loading/钢笔.png");
        width: 103px;
        height: 84px;
        top: -64px;
        left: 227px;
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
