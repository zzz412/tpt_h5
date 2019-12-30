<template>
  <!-- <div class="bg" v-touch:swipe.top="swipeTopHandler"> -->
  <div class="bg" v-touch:start.stop="start" v-touch:end.stop="swipeHandler">
    <div class="loading">
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
          <div class="text">你生于哪个年代</div>
          <!-- <div class="year_bg" @click="show=true"> -->
          <div class="year_bg" v-touch:swipe.top="yearTop" v-touch:swipe.bottom="yearBottom">
            <span>{{year[0]}}</span>
            <span>{{year[1]}}</span>
          </div>
        </div>
      </transition>
      <img src="http://cdn.hwzhj.top/向上滑动.png" class="up" alt />
    </div>
    <Popup v-model="show" position="bottom">
      <!-- <div></div> -->
      <Picker :columns="columns" show-toolbar @cancel="show = false" @confirm="onConfirm" />
    </Popup>
  </div>
</template>

<script>
import { Picker, Popup, Toast, Field, Swipe, SwipeItem } from "vant";
//导入vuex state mutations辅助方法
import mixins from "@/mixins/touchu";
import { mapMutations, mapState } from "vuex";
export default {
  mixins: [mixins],
  components: {
    Picker,
    Popup,
    Field,
    Swipe,
    SwipeItem
  },
  mounted() {
    this.year = this.userInfo.userYear || "90";
    this.userName = this.userInfo.userName || "";
  },
  computed: {
    ...mapState(["userInfo"])
  },
  data() {
    return {
      show: false,
      columns: ["60", "70", "80", "90", "00"],
      year: "90",
      userName: ""
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
      this.CHANGE_USERINFO({ userName: this.userName, userYear: this.year });
      // this.$router.push("/select");
      this.$store.commit("CHANGE_ROUTER", "Select");
    },
    onConfirm(value) {
      // console.log(value);
      this.year = value;
      this.show = false;
    },
    yearTop(a, e) {
      e.stopPropagation();
      // [].
      let index = this.columns.findIndex(item => item === this.year);
      if (index == this.columns.length - 1) {
        index = 0;
      } else {
        index++;
      }
      this.year = this.columns[index];
    },
    yearBottom(a, e) {
      e.stopPropagation();
      // [].
      let index = this.columns.findIndex(item => item === this.year);
      if (index == 0) {
        index = this.columns.length - 1;
      } else {
        index--;
      }
      this.year = this.columns[index];
    }
  }
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
        background: url("http://cdn.hwzhj.top/署名底框.png") no-repeat;
        background-size: 100%;
        margin-top: 20px;
      }
    }
    .bottom {
      position: absolute;
      top: 312px;
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
<style lang="scss" >
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
    }
  }
}
</style>
