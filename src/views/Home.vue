<template>
  <div id="home">
    <!-- <span class="star"></span> -->
    <!-- <First /> -->
    <transition name="home">
      <component v-bind:is="router"></component>
    </transition>
  </div>
</template>

<script>
// 首屏
import First from "./First.vue";
// 过渡页 文字页
import TransForm from "./TransForm.vue";
// 用户选择信息页
import Info from "./Info.vue";
import Select from "./Select.vue";
import MyTransition from "./Transition.vue";
import Share from "./Share.vue";
import { mapState } from "vuex";
export default {
  name: "home",
  components: {
    First,
    TransForm,
    Info,
    Select,
    MyTransition,
    Share
  },
  computed: {
    ...mapState(["router"])
  }
};
</script>

<style lang="scss" scoped>
#home {
  height: 100%;
}
.home-enter,
.home-leave-to {
  opacity: 0;
}
.home-enter-active,
.home-leave-active {
  transition: all 0.5s cubic-bezier(1, 1, 1, 1);
}
.star {
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  top: 10px;
  border-radius: 50%;
  z-index: 99;
  left: 20px;
  box-shadow: 1px 1px 4px #fff, -1px -1px 4px #fff;
}
</style>