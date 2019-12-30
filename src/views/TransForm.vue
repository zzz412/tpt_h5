<template>
  <div class="bg" v-touch:start="start" v-touch:end="swipeHandler">
    <div class="loading">
      <div class="text">
        <transition-group name="list">
          <p v-for="(item ,index) in data" :key="index">{{item}}</p>
        </transition-group>
      </div>
      <transition name="list" appear>
        <div class="clock">
          <p>{{num}}</p>
          <span class="raduis"></span>
          <img class="bg_clock" src="http://cdn.hwzhj.top/信纸.png" alt />
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
        "成就也还算不赖吗？",
        "站在未来十年的时间起点上，想必你也感慨良多",
        "现在，不妨提笔，写一封信",
        "告诉TA未来十年，您有哪些期许",
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
      this.data.push(this.originData[this.data.length - 1]);
      var tiems = setInterval(() => {
        if (this.data.length === this.originData.length) {
          clearInterval(tiems);
          return;
        }
        this.data.push(this.originData[this.data.length - 1]);
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
  transition: all 1s;
}
.list-enter,
.list-leave-to {
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
      background: url("http://cdn.hwzhj.top/表盘.png") no-repeat;
      background-size: 100%;
      top: 400px;
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
        width: 251px;
        height: 140px;
        top: -35px;
        left: -40px;
        animation: baidong 1.3s ease-in-out infinite alternate;
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
      to {
        transform: rotate(10deg);
        width: 261px;
        opacity: 1;
        // height: 140px;
      }
    }
  }
}
</style>


