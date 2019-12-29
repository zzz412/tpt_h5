<template>
  <div id="app">
    <!-- <transition name="van-slide-down" mode="out-in"> -->
    <router-view />
    <!-- </transition> -->
  </div>
</template>

<style lang="scss">
@import url(../public/reset.css);
@font-face {
  font-family: "方正准圆简体";
  src: url("http://cdn.hwzhj.top/FZY3JW.TTF");
}
@font-face {
  src: url("http://cdn.hwzhj.top/FZZZHONGJW.TTF");
  font-family: "方正正中黑简体";
}
html {
  font-family: "方正正中黑简体", "方正准圆简体";
  height: 100%;
}
body,
#app {
  height: 100%;
  font-size: 37.5px;
  // background-image: url("./assets/loading/BG.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  overflow: hidden;
}
.txt-enter {
  opacity: 0;
  transform: translateX(50px);
}
.txt-enter-active {
  transition: all 0.7s;
}
</style>
