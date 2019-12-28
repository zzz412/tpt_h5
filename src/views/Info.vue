<template>
  <div class="bg" v-touch:swipe.bottom="swipeHandler" v-touch:swipe.top="swipeTopHandler">
    <div class="loading">
      <div class="top">
        <div class="text">你的信件署名</div>
        <div class="input_bg">
          <input type="text" />
        </div>
      </div>
      <div class="bottom">
        <div class="text">你的信件署名</div>
        <div class="year_bg"></div>
      </div>
      <img src="@/assets/index/向上滑动.png" class="up" alt />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    swipeHandler() {
      this.$router.back();
    },
	swipeTopHandler(){
      this.$router.push("/select");
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
  .loading {
    position: relative;
    margin: 0 auto;
    height: 100%;
    width: 90%;
    display: flex;
    justify-content: center;
    .text {
      color: #fff;
      font-size: 15px;
      width: 100%;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.8;
      text-align: center;
    }
    .top {
      position: absolute;
      top: 80px;
      .input_bg {
        width: 200px;
        height: 47px;
        background: url("../assets/info/署名底框.png") no-repeat;
        background-size: 100%;
        margin-top: 20px;
        input {
          width: 100%;
          background-color: transparent;
          border: none;
          outline: none;
          font-size: 25px;
          color: #c06c2c;
          text-align: center;
          margin-top: 6px;
        }
      }
    }
    .bottom {
      position: absolute;
      top: 312px;
      .year_bg {
        width: 200px;
        height: 156px;
        background: url("../assets/info/年代-背景.png") no-repeat;
        background-size: 100%;
        margin-top: 20px;
      }
    }

    .up {
      position: absolute;
      width: 52.5px;
      bottom: 40px;
    }
  }
}
</style>
