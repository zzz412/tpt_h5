<template>
  <!-- <div class="bg" v-touch:swipe.top="swipeTopHandler"> -->
  <div class="bg">
    <div class="loading">
      <div class="rain one" style="left: 2%;"></div>
      <div class="rain three" style="left: 10%;"></div>
      <div class="rain two" style="left: 25%;"></div>
      <div class="rain five" style="left: 45%;"></div>
      <div class="rain three" style="left: 58%;"></div>
      <div class="rain four" style="left: 72%;"></div>
      <div class="rain two" style="left: 88%;"></div>
      <div class="rain five" style="left: 96%;"></div>
      <transition name="txt" appear>
        <div class="top">
          <div class="text">你的信件署名</div>
          <div class="input_bg">
            <Field type="text" placeholder="署名..." maxlength="10" v-model="userName" />
          </div>
        </div>
      </transition>
      <transition name="txt" appear>
        <div class="bottom">
          <div class="text">拨动数字 选择你的年代</div>
          <!-- <div class="year_bg" @click="show=true"> -->
          <!-- v-touch:swipe.top="yearTop" v-touch:swipe.bottom="yearBottom" -->
          <!-- <div class="year_bg" v-touch:start="start" v-touch:end="swipeHandler"> -->
          <div class="year_bg" v-touch:start="start" v-touch:end="swipeHandler">
            <span>{{yearCopy[2]}}</span>
            <span>{{yearCopy[3]}}</span>
          </div>
          <div class="text2">滑动选择</div>
        </div>
      </transition>
      <img src="http://cdn.hwzhj.top/开始.png" class="up" alt @click="goPage" />
    </div>
    <Popup v-model="show" position="bottom">
      <!-- <div></div> -->
      <Picker :columns="columns" show-toolbar @cancel="show = false" @confirm="onConfirm" />
    </Popup>
  </div>
  <!-- <div class="bg" v-touch:swipe.top="swipeTopHandler"> -->
</template>

<script>
import { Picker, Popup, Toast, Field, Swipe, SwipeItem } from "vant";
//导入vuex state mutations辅助方法
// import mixins from "@/mixins/touchu";
import { mapMutations, mapState } from "vuex";
export default {
  // mixins: [mixins],
  components: {
    Picker,
    Popup,
    Field,
    Swipe,
    SwipeItem
  },
  mounted() {
    this.year = this.userInfo.userYear || "1990";
    this.yearCopy = this.year;
    this.userName = this.userInfo.userName || "";
  },
  computed: {
    ...mapState(["userInfo"])
  },
  data() {
    return {
      show: false,
      columns: ["1960", "1970", "1980", "1990", "2000"],
      year: "1990",
      yearCopy: "1990",
      userName: "",
      startX: 0,
      endX: 0,
      flag: false
    };
  },
  methods: {
    ...mapMutations(["CHANGE_USERINFO"]),
    goPage() {
      if (this.show) return;
      if (!this.userName) {
        Toast("请填写信件署名");
        return;
      }
      // 页面离开时保存用户信息
      this.CHANGE_USERINFO({
        userName: this.userName,
        userYear: this.year.slice(2)
      });
      // this.$router.push("/select");
      this.$store.commit("CHANGE_ROUTER", "Select");
    },
    onConfirm(value) {
      // console.log(value);
      this.year = value;
      this.show = false;
    },
    start(e) {
      this.startX = e.changedTouches[0].screenY;
      // console.log('开始', e)
    },
    swipeHandler(e) {
      // console.log(e)
      this.endX = e.changedTouches[0].screenY;
      if (this.startX - this.endX > 0) {
        // this.goPage();
        this.yearTop();
      } else {
        // this.goPage2();
        this.yearBottom();
      }
    },
    // 数字牌上滑
    yearTop() {
      // e.stopPropagation();
      // [].
      if (this.flag) return;
      this.flag = true;
      let index = this.columns.findIndex(item => item === this.year);
      if (index == this.columns.length - 1) {
        index = 0;
      } else {
        index++;
      }
      // this.year = this.columns[index];
      this.numRunFun(this.year - 0, this.columns[index] - 0);
    },
    // 数字牌下滑
    yearBottom() {
      // e.stopPropagation();
      // [].
      if (this.flag) return;
      this.flag = true;
      let index = this.columns.findIndex(item => item === this.year);
      if (index == 0) {
        index = this.columns.length - 1;
      } else {
        index--;
      }
      // this.year = this.columns[index];
      // console.log(this.year - 0);
      // console.log(this.columns[index] - 0);
      this.numRunFun(this.year - 0, this.columns[index] - 0);
    },
    /**
     * 数字滚动
     * @param {Object} num 		开始值
     * @param {Object} maxNum	最大值,最终展示的值
     */
    numRunFun(num, maxNum) {
      var numText = num;
      var golb; // 为了清除requestAnimationFrame
      if (maxNum > num) {
        var numSlideFun = () => {
          numText += 1; // 速度的计算可以为小数
          if (numText >= maxNum) {
            numText = maxNum;
            cancelAnimationFrame(golb);
          } else {
            golb = requestAnimationFrame(numSlideFun);
            if (maxNum == numText + 1) {
              this.year = ~~numText + 1 + "";
              this.flag = false;
            }
          }
          this.yearCopy = ~~numText + "";
        };
      } else {
        var numSlideFun = () => {
          numText -= 1; // 速度的计算可以为小数
          if (numText <= maxNum) {
            numText = maxNum;
            cancelAnimationFrame(golb);
          } else {
            golb = requestAnimationFrame(numSlideFun);
            if (maxNum == numText - 1) {
              this.year = ~~numText - 1 + "";
              this.flag = false;
            }
          }
          this.yearCopy = ~~numText + "";
        };
      }
      numSlideFun();
    }
  }
  // mounted() {
  //   this.numRunFun(1000, 0);
  // }
};
</script>

<style lang="scss" scoped>
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
      font-size: 15px;
      width: 100%;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.8;
      text-align: center;
    }

    .top {
      position: absolute;
      top: 110px;

      .input_bg {
        width: 200px;
        height: 47px;
        background: url("http://cdn.hwzhj.top/署名底框.png") no-repeat;
        background-size: 100%;
        margin-top: 20px;
      }
    }

    .bottom {
      position: absolute;
      top: 245px;

      .year_bg {
        width: 200px;
        height: 156px;
        background: url("http://cdn.hwzhj.top/年代-背景.png") no-repeat;
        background-size: 100%;
        margin-top: 20px;
        position: relative;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: space-around;

        span {
          display: block;
          font-size: 110px;
          color: #c16929;
        }
      }

      .text2 {
        color: #a24b0b;
        font-size: 15px;
        width: 100%;
        line-height: 1.8;
        text-align: center;
      }
    }

    .up {
      position: absolute;
      width: 112.5px;
      top: 540px;
      // animation: mymove 1.3s ease-in-out infinite alternate;
      // @keyframes mymove {
      //   from {
      //     transform: translate(0, 0);
      //   }
      //   to {
      //     transform: translate(0, 6px);
      //   }
      // }
    }
  }
}
</style>
<style lang="scss">
.input_bg {
  .van-cell {
    padding: 0;
    background: transparent;
  }

  .van-field__control {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 25px;
    color: transparent;
    text-shadow: 0 0 0 #c06c2c;
    // color: #c06c2c;
    text-align: center;
    margin-top: 6px;

    &::placeholder {
      color: #c06c2c;
      padding-top: 2px;
      line-height: normal;
    }
  }
}
</style>
