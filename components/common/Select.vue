<template>
  <div class="relative text-textPrimary">
    <button
      type="button"
      @click="toggleSelect"
      class="relative w-full py-1 pl-3 pr-10 text-left bg-white rounded-md shadow-sm cursor-pointer ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
    >
      <span class="flex items-center">
        <span class="block ml-3 truncate">{{ selected }}</span>
      </span>
      <span
        class="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none"
      >
        <span class="material-symbols-outlined">
          {{ isOpenSelect ? "expand_less" : "expand_more" }}
        </span>
      </span>
    </button>
    <ul
      v-if="isOpenSelect"
      class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
    >
      <li
        class="relative py-2 pl-3 cursor-pointer select-none pr-9 hover:bg-gray-100"
        v-for="item in dataSelect"
        @click="handleSelect(item)"
      >
        <div class="flex items-center">
          <span class="block ml-3 text-sm truncate">{{ item }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    dataSelect: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      selected: this.dataSelect[0],
      isOpenSelect: false,
    };
  },
  methods: {
    toggleSelect() {
      this.isOpenSelect = !this.isOpenSelect;
    },
    handleSelect(item) {
      this.selected = item;
      this.isOpenSelect = false;
      this.$emit("handleSelect", item);
    },
  },
};
</script>

<style lang="scss" scoped></style>
