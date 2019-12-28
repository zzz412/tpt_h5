<template>
  <div class="bg" v-touch:swipe.top="swipeHandler">
    <div class="loading">
      <div class="text">
        <p>回首来路，这十年你过得如何？</p>
        <p>坚持的事能令你无悔吗？</p>
        <p>成就也还算不赖吗？</p>
        <p>这一路风雨兼程，每一刻都值得反复怀念</p>
        <p>2020，一切从零出发</p>
        <p>成就也还算不赖吗？</p>
        <p>站在未来十年的时间起点上，想必你也感慨良多</p>
        <p>现在，不妨提笔，写一封信</p>
        <p>告诉TA未来十年，您有哪些期许</p>
        <p>而收件人，是未来的自己</p>
      </div>
      <div class="clock">
        <p>2020</p>
        <img class="bg_clock" src="@/assets/transform/信纸.png" alt />
        <img class="bg_hour" src="@/assets/transform/指针-短.png" alt />
        <img class="bg_minute" src="@/assets/transform/指针-长.png" alt />
      </div>
      <!-- <div class="bg_clock"></div> -->

      <img src="@/assets/index/向上滑动.png" class="up" alt />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    swipeHandler() {
      this.$router.push('/info');
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
      font-size: 14px;
      width: 100%;
      top: 70px;
      position: absolute;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.8;
      text-align: center;
    }
    .clock {
      position: absolute;
      width: 200px;
      height: 160px;
      background: url("../assets/transform/表盘.png") no-repeat;
      background-size: 100%;
      top: 400px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      .bg_clock {
        position: absolute;
        width: 251px;
        height: 140px;
        top: -35px;
        left: -40px;
      }
      .bg_hour {
        width: 6px;
        top: 50px;
        left: 96px;
        position: absolute;
      }
      .bg_minute {
        position: absolute;
        width: 34px;
        top: 47px;
        left: 67px;
      }
      p {
        color: #fff;
        font-size: 22px;
        margin-bottom: 26px;
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
