<template>
  <div class="bg" v-touch:swipe.bottom="swipeHandler" v-touch:swipe.top="swipeTopHandler">
    <div class="loading">
      <div class="top">
        <div class="text">你的信件署名</div>
        <div class="input_bg">
          <input type="text" placeholder="署名..." maxlength="10" v-model="userName" />
        </div>
      </div>
      <div class="bottom">
        <div class="text">你生于哪个年代</div>
        <div class="year_bg" @click="show=true">
          <span>{{year[0]}}</span>
          <span>{{year[1]}}</span>
        </div>
      </div>
      <img src="@/assets/index/向上滑动.png" class="up" alt />
    </div>
    <Popup v-model="show" position="bottom">
      <!-- <div></div> -->
      <Picker :columns="columns" show-toolbar @cancel="show = false" @confirm="onConfirm" />
    </Popup>
  </div>
</template>

<script>
import { Picker, Popup, Toast } from "vant";
//导入vuex state mutations辅助方法
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    Picker,
    Popup
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
    swipeHandler() {
      this.$router.back();
    },
    swipeTopHandler() {
      if (!this.userName) {
        Toast("请填写信件署名");
        return;
      }
      // 页面离开时保存用户信息
      this.CHANGE_USERINFO({ userName: this.userName, userYear: this.year });
      this.$router.push("/select");
    },
    onConfirm(value) {
      console.log(value);
      this.year = value;
      this.show = false;
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
	  animation: mymove 2s linear infinite;
	  
	  @keyframes mymove {
	  	0% {
	  			bottom: 40px;
	  		/*开始为原始大小*/
	  	}
	  
	  	100% {
	  			bottom: 60px;
	  	}
	  
	  }
    }
  }
}
</style>
