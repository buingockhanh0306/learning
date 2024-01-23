<template>
  <div class="fixed top-0 right-0 z-50 min-w-80">
    <transition
      name="slide"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div
        v-if="isOpen"
        class="max-w-md p-4 mx-auto text-white rounded-md shadow-md notification"
        :class="{
          'bg-green-500': type === 'success',
          'bg-red-500': type === 'error',
        }"
      >
        <p class="font-bold">Thông báo</p>
        <p>{{ message }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {
    isOpen() {
      return this.$store.state.notify.isOpen;
    },
    message() {
      return this.$store.state.notify.text;
    },
    type() {
      return this.$store.state.notify.type;
    },
  },
  watch: {
    isOpen(value) {
      if (value) {
        setTimeout(() => {
          this.close();
        }, 3000);
      }
    },
  },
  methods: {
    ...mapActions(["setNotify"]),
    close() {
      this.setNotify({ isOpen: false });
    },
    leave() {},
    enter() {},
    beforeEnter() {},
  },
};
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
  transform: translateX(100%);
}
</style>
