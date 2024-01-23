<template>
  <span class="block mt-2 ml-2 text-sm text-red-400 min-h-8">
    <transition name="fade">
      <div v-if="isDisplayError" class="flex items-center gap-1">
        <span class="material-symbols-outlined text-xl"> error </span>
        {{ textError }}
      </div>
    </transition>
  </span>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    isDisplayError: {
      type: Boolean,
      default: false,
    },
    textError: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
