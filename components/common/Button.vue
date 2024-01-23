<template>
  <div
    class="relative w-full text-primary hoverButton rounded-lg"
    :class="className"
    @click="handleClick"
  >
    <span
      v-if="iconName"
      class="absolute px-4 py-2 text-2xl start-0 material-symbols-outlined"
    >
      {{ iconName }}
    </span>

    <button
      class="w-full h-10 rounded-lg"
      :class="[type, iconName ? 'px-12' : 'px-4', className]"
    >
      {{ text }}
    </button>
  </div>
</template>

<script>
import { TYPE_BUTTON } from "~/constants";
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      default: "Button",
    },
    iconName: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: TYPE_BUTTON.DEFAULT,
    },
  },
  data() {
    return {
      TYPE_BUTTON,
    };
  },
  methods: {
    handleClick() {
      this.$emit("handleClick");
    },
  },
};
</script>

<style scoped>
.hoverButton:hover {
  --tw-bg-opacity: 0.9;
  cursor: pointer;
}
</style>
