<template>
  <div class="flex flex-col w-full gap-2">
    <span v-if="!!fieldName" class="font-semibold text-textPrimary">{{
      fieldName
    }}</span>
    <div class="relative">
      <span
        v-if="iconName"
        class="absolute px-4 py-3 text-base end-0 text-textPrimary material-symbols-outlined"
        :class="[
          positionIcon === 'left' && 'start-0',
          positionIcon === 'right' && 'end-0 cursor-pointer',
        ]"
        @click.stop="clickIcon"
      >
        {{ iconName }}
      </span>

      <input
        :type="type"
        :value="value"
        :disabled="isDisable"
        @input="handleInput($event.target.value)"
        @blur="handleBlur"
        :placeholder="placeholder"
        class="block w-full h-10 py-4 rounded-lg borderFocus bg-inputSearch"
        :class="[
          isDisable && 'bg-blue-100',
          iconName && positionIcon === 'left' ? 'px-12' : 'px-4',
          className,
        ]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    fieldName: {
      type: String,
      default: "",
    },
    iconName: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
    positionIcon: {
      type: String,
      default: "",
    },
    isDisable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    },
    handleBlur() {
      this.$emit("blur");
    },
    clickIcon() {
      this.$emit("clickIcon");
    },
  },
};
</script>

<style scoped>
.borderFocus:focus {
  border-color: #6425fe;
  outline: #6425fe;
}
</style>
