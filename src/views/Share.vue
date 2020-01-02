<template>
  <!-- <div class="bg" id="bg" v-touch:swipe.bottom="swipeHandler" v-touch:longtap="longtapHandler"> -->
  <div class="bg" id="bg" v-touch:swipe.bottom="swipeHandler">
    <div class="loading">
      <div class="rain one" style="left: 2%;"></div>
      <div class="rain three" style="left: 10%;"></div>
      <div class="rain two" style="left: 25%;"></div>
      <div class="rain five" style="left: 45%;"></div>
      <div class="rain three" style="left: 58%;"></div>
      <div class="rain four" style="left: 72%;"></div>
      <div class="rain two" style="left: 88%;"></div>
      <div class="rain five" style="left: 96%;"></div>
      <img src="http://cdn.hwzhj.top/Logo.png" class="logo" alt />
      <img src="http://cdn.hwzhj.top/主标题.png" class="ten-years" alt />
      <div :class="showBg">
        <div class="secret-text">
          <span>{{userInfo.userName}}：</span>
          <ol>
            <li v-for="(da,index) in selectedData" :key="index">{{da}}</li>
          </ol>
        </div>
      </div>
      <div class="bottom-share">
        <template v-if="isWX">
          <div class="downApp" @click="goDown">
            <div class="share-txt2">赢新春好礼</div>
          </div>
          <div class="share" @click="longtapHandler">
            <div class="share-txt">分享十年目标</div>
          </div>
        </template>
        <template v-else>
          <div class="inviteBtn" @click="showWxImage"></div>
          <div class="qrBtn">
            <div class="qr-txt1">截图分享</div>
            <div class="qr-txt2">未来十年的目标</div>
          </div>
        </template>
      </div>
    </div>
    <div class="shareWx" @click="hiddenImage" v-show="wxImageShow">
      <img class="wxImage" src="http://cdn.hwzhj.top/微信内-分享提示.png" />
    </div>

    <div class="bg-img" ref="imageWrapper" style>
      <div class="loading">
        <img src="http://cdn.hwzhj.top/Logo.png" class="logo" alt />
        <img src="http://cdn.hwzhj.top/主标题.png" class="ten-years" alt />
        <div :class="showBg">
          <div class="secret-text">
            <span>{{userInfo.userName}}：</span>
            <ol>
              <li v-for="(da,index) in selectedData" :key="index">{{da}}</li>
            </ol>
          </div>
        </div>
        <img src="http://cdn.hwzhj.top/qr2.png" class="qrCode" alt />
      </div>
    </div>
    <Popup v-model="show" style="width: 80%;">
      <div class="txt">长按保存图片</div>
      <div style="text-align: center;font-size:22px;margin: 10px 0px;">
        <img :src="imgUrl" style="width: 90%;" />
      </div>
    </Popup>
  </div>
</template>

<script>
import { Popup, Toast } from "vant";
import html2canvas from "html2canvas";
import * as TPTJS from "tpt-js-sdk";
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    Popup
  },
  data() {
    return {
      show: false,
      bg: [
        {
          name: "60",
          path: "60保密.png",
          class: "six"
        },
        {
          name: "70",
          path: "保密70.png",
          class: "seven"
        },
        {
          name: "80",
          path: "80保密.png",
          class: "eight"
        },
        {
          name: "90",
          path: "90保密.png",
          class: "nine"
        },
        {
          name: "00",
          path: "00保密.png",
          class: "zero"
        }
      ],
      dataLength: 0,
      showBg: "secret six",
      showQrCode: false,
      imgUrl: "",
      wxImageShow: false
    };
  },
  computed: {
    ...mapState(["userInfo", "selectedData"]),
    isWX() {
      var ua = window.navigator.userAgent.toLowerCase();
      return ua.match(/MicroMessenger/i) == "micromessenger";
    }
  },
  mounted() {
    const bg = this.bg.find(item => {
      return item.name == this.userInfo.userYear;
    }) || {
      class: ""
    };
    this.showBg = "secret " + bg.class || "secret";
  },
  methods: {
    // 显示分享
    showWxImage() {
      if (this.isWX) {
        // this.wxImageShow = true;
      } else {
        let title = [
          "给未来十年的自己|我想对你说…",
          "十年一刻，你想对自己说点什么？",
          "再见旧时光，你好新十年！"
        ];
        const shareInfo = {
          title: title[Math.floor(Math.random() * 3)],
          imgUrl: "https://www.hwzhj.top/static/shareLogo.jpg",
          url: "https://ecustomer.cntaiping.com/static/tpth5/",
          content: "在吗？我是十年后的你，你有什么想对我说？"
        };
        TPTJS.tpAppShare(shareInfo);
        TPTJS.tpH5Share(shareInfo);
      }
    },
    // 隐藏分享图标
    hiddenImage() {
      this.wxImageShow = false;
    },
    swipeHandler() {
      // this.$router.back();
    },
    longtapHandler() {
      html2canvas(this.$refs.imageWrapper, {
        useCORS: true
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        this.imgUrl = dataURL;
        if (this.imgUrl !== "") {
          //通过正则表达式匹配ua中是否含有MicroMessenger字符串
          if (this.isWX) {
            this.show = true;
          } else {
            this.saveFile(this.imgUrl, "share.jpg");
          }
        }
      });
    },
    saveFile(data, filename) {
      let save_link = document.createElement("a");
      save_link.href = data;
      save_link.download = filename;

      let event = document.createEvent("MouseEvents");
      event.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      save_link.dispatchEvent(event);
    },
    goDown() {
      window.open(
        "https://ecustomer.cntaiping.com/static/download/#xiaZaiAPP?source=1"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
#bg {
  .six {
    background-image: url("http://cdn.hwzhj.top/60保密filter.png");
  }

  .seven {
    background-image: url("http://cdn.hwzhj.top/70保密filter.png");
  }

  .eight {
    background-image: url("http://cdn.hwzhj.top/80保密filter.png");
  }
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

  .nine {
    background-image: url("http://cdn.hwzhj.top/90保密filter.png");
  }

  .zero {
    background-image: url("http://cdn.hwzhj.top/00保密filter.png");
  }
}
.bg {
  height: 100%;
  background-image: url("http://cdn.hwzhj.top/BG.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  user-select: none;
  .shareWx {
    position: absolute;
    margin: 0 auto;
    height: 100%;
    width: 100%;
    top: 0px;
    display: flex;
    justify-content: center;
    z-index: 999;

    .wxImage {
      width: 100%;
    }
  }

  .loading {
    position: relative;
    margin: 0 auto;
    height: 100%;
    width: 90%;
    display: flex;
    justify-content: center;

    .logo {
      position: absolute;
      width: 80px;
      top: 10px;
      left: 0rem;
    }

    .ten-years {
      position: absolute;
      width: 180px;
      top: 40px;
    }

    .secret {
      position: absolute;
      width: 92%;
      height: 370px;
      top: 110px;
      background-image: url("http://cdn.hwzhj.top/60保密filter.png");
      background-repeat: no-repeat;
      background-size: cover;
      user-select: none;
      .secret-text {
        position: absolute;
        width: 90%;
        top: 30px;
        left: 35px;
        font-size: 18px;
        font-weight: 200;
        color: #2b5259;
        user-select: none;

        ol {
          position: absolute;
          font-size: 16px;
          width: 100%;
          top: 30px;
          left: 20px;
          list-style: decimal;
          user-select: none;

          li {
            line-height: 26px;
            user-select: none;
          }
        }
      }
    }

    .bottom-share {
      width: 100%;
      position: absolute;
      height: 30px;
      display: flex;
      justify-content: space-around;
      // bottom: 55px;
      top: 485px;
    }
    .downApp {
      width: 128px;
      background-image: url("http://cdn.hwzhj.top/tptBtn.png");
      background-size: contain;
      height: 58px;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
    }
    .share {
      width: 128px;
      // background-image: url("http://cdn.hwzhj.top/share.png");
      background-image: url("http://cdn.hwzhj.top/saveImg.png");
      background-size: contain;
      height: 58px;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
    }
    .inviteBtn {
      width: 150px;
      background-image: url("http://cdn.hwzhj.top/sharebtn.png");
      background-size: contain;
      height: 58px;
      background-repeat: no-repeat;
      position: absolute;
      left: 65px;
      top: 10px;
    }
    .qrBtn {
      width: 70px;
      background-image: url("http://cdn.hwzhj.top/qr3.png");
      background-size: contain;
      height: 70px;
      background-repeat: no-repeat;
      position: absolute;
      right: 30px;
      top: 5px;
    }
    .qr-txt1 {
      font-size: 14px;
      width: 20px;
      position: absolute;
      right: -25px;
      color: #b45c16;
    }
    .qr-txt2 {
      font-size: 14px;
      width: 20px;
      position: absolute;
      right: -45px;
      top: -20px;
      color: #b45c16;
    }
    .share-txt {
      position: absolute;
      font-size: 12px;
      color: #b45c16;
      // width: 100%;
      bottom: -20px;
      // text-align: center;
      user-select: none;
    }

    .share-txt2 {
      position: absolute;
      font-size: 12px;
      color: #b45c16;
      // width: 100%;
      bottom: -20px;
      // text-align: center;
      user-select: none;
    }
  }

  .van-popup {
    background: transparent;
    .txt {
      text-align: center;
      font-size: 22px;
      margin: 10px 0px;
      color: #fff;
      user-select: none;
    }
  }
}
.bg-img {
  height: 100%;
  background-image: url("http://cdn.hwzhj.top/BG.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  user-select: none;
  .loading {
    position: relative;
    margin: 0 auto;
    height: 100%;
    width: 90%;
    display: flex;
    justify-content: center;
    .logo {
      position: absolute;
      width: 80px;
      top: 30px;
      left: 0rem;
    }

    .ten-years {
      position: absolute;
      width: 180px;
      top: 65px;
    }
    .secret {
      position: absolute;
      width: 92%;
      height: 370px;
      top: 135px;
      background-image: url("http://cdn.hwzhj.top/60保密filter.png");
      background-repeat: no-repeat;
      background-size: cover;
      user-select: none;
      .secret-text {
        position: absolute;
        width: 90%;
        top: 30px;
        left: 35px;
        font-size: 18px;
        font-weight: 200;
        color: #2b5259;
        user-select: none;

        ol {
          position: absolute;
          font-size: 16px;
          width: 100%;
          top: 30px;
          left: 20px;
          list-style: decimal;
          user-select: none;

          li {
            line-height: 26px;
            user-select: none;
          }
        }
      }
    }
    .qrCode {
      position: absolute;
      width: 230px;
      top: 520px;
      left: 27px;
    }
  }
}
</style>
