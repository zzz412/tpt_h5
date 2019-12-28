<template>
  <div class="bg" v-touch:swipe.bottom="swipeHandler">
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
      line-height: 2;
      text-align: center;
    }
    .clock {
      position: absolute;
      width: 200px;
      height: 160px;
      background: url(/img/表盘.9d52adc7.png) no-repeat;
      background-size: 100%;
      top: 400px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      p {
        color: #fff;
        font-size: 26px;
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
