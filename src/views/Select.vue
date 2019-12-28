<template>
  <div class="bg" v-touch:swipe.bottom="swipeHandler">
    <div class="loading">
      <div class="tab">
        <div
          class="tag tag-default"
          :class="[
		  	isFx(index)?'tag-fx2':'tag-fx1',
		  	{
			  'tag-check':da.check,
			  'tag-default':da.color === 0,
			  'tag-dark':da.color === 1,
			  'tag-light':da.color === 2
			}
		  ]"
          v-for="(da,index) in showData"
          :key="index"
          @click="tagChecked(index)"
        >{{da.txt}}</div>
        <!-- <div v-for="da in showData">
					<div>{{da}}</div>
        </div>-->
        <img class="toast-bg" src="@/assets/select/选择提示.png" alt />
      </div>
      <div class="button">
        <img src="@/assets/select/换一换.png" @click="changeDataHandler" class="change" alt />
        <img src="@/assets/select/确定按钮.png" class="sure" @click="swipeTopHandler" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import dataJson from "../utils/data.js";
export default {
  data() {
    return {
      data: dataJson,
      dataLength: 0,
      showData: []
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    originData() {
      return this.data[
        Object.keys(this.data).find(item =>
          item.includes(this.userInfo.userYear)
        )
      ];
    }
  },
  watch: {
    showData(val) {
      console.log(val);
    }
  },
  methods: {
    isFx(index) {
      if (index == 0) return true;
      if (index % 3 == 0) return true;
      return false;
    },
    // 选择标签
    tagChecked(index) {
      this.showData[index].check = !this.showData[index].check;
      console.log(this.showData[index].check);
    },
    swipeHandler() {
      this.$router.back();
    },
    swipeTopHandler() {
      this.$router.push("/transition");
    },
    changeDataHandler() {
      this.dataLength++;
      if (this.dataLength > this.originData.length - 1) {
        this.dataLength = 0;
      }
      this.creatData();
    },
    // 生成数据
    creatData() {
      this.showData = this.originData[this.dataLength].data.map(item => {
        return {
          check: false,
          txt: item,
          color: Math.floor(Math.random() * 3)
        };
      });
    }
  },
  mounted() {
    this.creatData();
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

  .loading {
    position: relative;
    margin: 0 auto;
    height: 100%;
    width: 90%;
    display: flex;
    justify-content: center;

    .tab {
      color: #fff;
      font-size: 12px;
      width: 100%;
      top: 80px;
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .toast-bg {
        position: absolute;
        width: 38px;
        right: 40px;
        bottom: -40px;
      }
      .tag {
        box-sizing: border-box;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 6px 8px;
        line-height: 1.5;
      }
      .tag-fx1 {
        width: 42%;
        margin: 8px 4px;
      }
      .tag-fx2 {
        width: 50%;
        margin: 8px 10%;
      }
      .tag-default {
        color: #ac6622;
        border: 1px solid #ac6622;
      }
      .tag-dark {
        color: #f1deaa;
        background: #ac6622;
        border: 1px solid #ac6622;
      }
      .tag-light {
        color: #fff;
        background: transparent;
        border: 1px solid #fff;
      }
      .tag-check {
        color: #ac6622;
        border: 1px solid #fff;
        background: #fff;
      }
    }

    .button {
      position: absolute;
      width: 100%;
      height: 160px;
      top: 560px;
      text-align: center;

      .change {
        position: absolute;
        width: 100px;
        left: 40px;
      }

      .sure {
        position: absolute;
        width: 100px;
        right: 40px;
      }
    }
  }
}
</style>
