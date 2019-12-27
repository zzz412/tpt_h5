<template>
  <div class="bg" v-touch:swipe.top="swipeHandler">
    <div class="loading">
      <img src="@/assets/index/Logo.png" class="logo" alt />
      <img src="@/assets/index/文字.png" class="txt" alt />
      <img src="@/assets/index/向上滑动.png" class="up" alt />
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
export default {
  methods: {
    swipeHandler() {
      console.log(11);
      this.$router.push("/transform");
    }
  }
};
</script>

<style lang="scss" scoped>
.bg {
  height: 100%;
  background-image: url("../assets/loading/BG.png");
  height: 100%;
  background-image: url(/img/BG.3edc58dd.png);
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
    }
  }
}
</style>
