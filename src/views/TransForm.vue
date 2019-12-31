<template>
  <div class="bg" v-touch:start="start" v-touch:end="swipeHandler">
    <div class="loading">
      <div class="rain one" style="left: 2%;"></div>
      <div class="rain three" style="left: 10%;"></div>
      <div class="rain two" style="left: 25%;"></div>
      <div class="rain five" style="left: 45%;"></div>
      <div class="rain three" style="left: 58%;"></div>
      <div class="rain four" style="left: 72%;"></div>
      <div class="rain two" style="left: 88%;"></div>
      <div class="rain five" style="left: 96%;"></div>
      <div class="text">
        <transition-group name="list">
          <p v-for="(item ,index) in data" :key="index">{{item}}</p>
        </transition-group>
      </div>
      <transition name="clock" appear>
        <div class="clock">
          <p>{{num}}</p>
          <span class="raduis"></span>
          <img class="bg_clock" src="http://cdn.hwzhj.top/背景光斑.png" alt />
          <img class="bg_leftclock" src="http://cdn.hwzhj.top/左侧信纸.png" alt />
          <img class="bg_rightclock" src="http://cdn.hwzhj.top/右信纸.png" alt />
          <img class="bg_hour" src="http://cdn.hwzhj.top/指针-短.png" alt />
          <img class="bg_minute" src="http://cdn.hwzhj.top/指针-长.png" alt />
        </div>
      </transition>
      <!-- <div class="bg_clock"></div> -->

      <img src="http://cdn.hwzhj.top/向上滑动.png" class="up" alt />
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/touchu";
export default {
  mixins: [mixins],
  data() {
    return {
      originData: [
        "回首来路，这十年你过得如何？",
        "坚持的事能令你无悔吗？",
        "成就也还算不赖吗？",
        "这一路风雨兼程，每一刻都值得反复怀念",
        "2020，一切从零出发",
        "站在未来十年的时间起点上，想必你也感慨良多",
        "现在，不妨提笔，写一封信",
        "告诉TA未来十年，你有哪些期许",
        "而收件人，是未来的自己"
      ],
      data: [],
      num: 2020,
      loading: false
    };
  },
  methods: {
    goPage() {
      this.$store.commit("CHANGE_ROUTER", "Info");
    },
    addDate() {
      this.data.push(this.originData[0]);
      var tiems = setInterval(() => {
        if (this.data.length === this.originData.length) {
          clearInterval(tiems);
          return;
        }
        this.data.push(this.originData[this.data.length]);
      }, 700);
    },
    /**
     * 数字滚动
     * @param {Object} num 		开始值
     * @param {Object} maxNum	最大值,最终展示的值
     */
    numRunFun(num, maxNum) {
      var numText = num;
      var golb; // 为了清除requestAnimationFrame
      const numSlideFun = () => {
        numText += 0.04; // 速度的计算可以为小数
        if (numText >= maxNum) {
          numText = maxNum;
          cancelAnimationFrame(golb);
        } else {
          golb = requestAnimationFrame(numSlideFun);
        }
        this.num = ~~numText;
      };
      numSlideFun();
    }
    // 运行
    // numRunFun(0,10)
  },
  mounted() {
    this.addDate();
    this.numRunFun(2020, 2030);
    this.loading = true;
  }
};
</script>

<style lang="scss" scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 3s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  // transform: translateY(30px);
}

.clock-enter-active,
.clock-leave-active {
  transition: all 2s;
}

.clock-enter,
.clock-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.bg {
  height: 100%;
  background-image: url("http://cdn.hwzhj.top/BG.jpg");
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;

  .rain {
    width: 2px;
    height: 135px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.25)
    );
    position: absolute;
  }

  .one {
    animation: downRain 1.5s infinite;
  }

  .two {
    animation: downRain 1.3s infinite;
  }

  .three {
    animation: downRain 1.8s infinite;
  }

  .four {
    animation: downRain 1.9s infinite;
  }

  .five {
    animation: downRain 2.2s infinite;
  }

  @keyframes downRain {
    0% {
      top: -10px;
    }

    100% {
      top: 100%;
    }
  }

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
      top: 40px;
      position: absolute;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.8;
      text-align: center;
    }

    .clock {
      position: absolute;
      width: 200px;
      height: 160px;
      background: url("http://cdn.hwzhj.top/表盘.png") no-repeat;
      background-size: 100%;
      top: 350px;
      display: flex;
      align-items: flex-end;
      justify-content: center;

      .raduis {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #87462c;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        top: 95px;
        left: 96px;
        z-index: 99;
      }

      .bg_clock {
        position: absolute;
        width: 275px;
        // height: 240px;
        top: -30px;
        left: -52px;
        animation: ss 1s ease-out infinite alternate;
      }

      .bg_leftclock {
        width: 80px;
        position: absolute;
        left: -45px;
        top: 60px;
        animation: fly1 4s ease-out forwards;
      }
      .bg_rightclock {
        width: 70px;
        position: absolute;
        right: -25px;
        top: -32px;
        animation: fly2 4s ease-out forwards;
      }
      .bg_hour {
        width: 6px;
        top: 50px;
        left: 96px;
        position: absolute;
        transform-origin: right bottom;
        animation: clock 10s ease-out forwards;
      }

      .bg_minute {
        position: absolute;
        width: 34px;
        top: 46px;
        left: 68px;
        transform-origin: right bottom;
        animation: minter 10s ease-out forwards;
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

    @keyframes minter {
      from {
        transform: rotate(-50deg);
        top: 46px;
        left: 68px;
      }

      to {
        transform: rotate(100deg);
        top: 48px;
        left: 64px;
      }
    }

    @keyframes ss {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    @keyframes clock {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(30deg);
      }
    }

    @keyframes baidong {
      from {
        transform: rotate(-10deg);
        width: 241px;
        opacity: 0.7;
        // height: 140px;
      }
      // .光斑 {
      //   position: absolute;
      //   left: 0px;
      //   top: 0px;
      //   width: 1125px;
      //   height: 2436px;
      //   z-index: 22;
      // }
      // .图层11 {
      //   background-image: url("图层11.png");
      //   position: absolute;
      //   left: 221px;
      //   top: 1267px;
      //   width: 232px;
      //   height: 48px;
      //   z-index: 21;
      // }
      // .图层12 {
      //   background-image: url("图层12.png");
      //   position: absolute;
      //   left: 224px;
      //   top: 1247px;
      //   width: 231px;
      //   height: 72px;
      //   z-index: 20;
      // }

      to {
        transform: rotate(10deg);
        width: 261px;
        opacity: 1;
        // height: 140px;
      }
    }

    @keyframes fly1 {
      0% {
        width: 180px;
        left: -200px;
        transform: rotateY(180deg);
        opacity: 0;
      }
      //   60% {
      //     transform: rotateY(-60deg);
      //   }
      100% {
        width: 80px;
        left: -45px;
      }
    }
    @keyframes fly2 {
      0% {
        width: 180px;
        right: -200px;
        transform: rotateY(180deg);
        opacity: 0;
      }
      //   60% {
      //     transform: rotateY(-60deg);
      //   }
      100% {
        width: 70px;
        right: -25px;
      }
    }
  }
}
</style>
