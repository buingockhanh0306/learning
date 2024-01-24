<template>
  <li class="hs-accordion" id="users-accordion">
    <button
      @click="toggleMenu"
      type="button"
      class="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-base text-slate-700 rounded-lg hover:bg-gray-100 justify-between"
    >
      <div
        class="flex items-center gap-3"
        :class="pathParent === getPaths[0] && 'text-textHover'"
      >
        <span class="text-xl font-light material-symbols-outlined">
          {{ iconName }}
        </span>
        {{ textParent }}
      </div>

      <span class="text-xl font-light material-symbols-outlined">
        {{ isOpenSubMenu ? "expand_less" : "expand_more" }}
      </span>
    </button>
    <transition name="fadeHeight" mode="out-in">
      <div
        v-if="isOpenSubMenu"
        id="users-accordion-child"
        class="w-full overflow-hidden hs-accordion-content"
      >
        <ul
          v-for="item in dataSubmenu"
          @click="redirectPage(item.slug)"
          :key="item.id"
          class="pt-2 hs-accordion-group ps-3"
          data-hs-accordion-always-open=""
        >
          <li class="hs-accordion" id="users-accordion-sub-1">
            <button
              type="button"
              :class="item.slug === `/${getPaths[1]}` && 'text-textHover'"
              class="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-base text-slate-700 rounded-lg hover:bg-gray-100"
            >
              {{ item.title }}
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </li>
</template>

<script>
export default {
  name: "SubMenuSidebar",
  data() {
    return {
      isOpenSubMenu: false,
      heightItemSubmenu: 48,
    };
  },
  props: {
    iconName: {
      type: String,
      default: "",
    },
    pathParent: {
      type: String,
      default: "",
    },
    textParent: {
      type: String,
      default: "",
    },
    dataSubmenu: {
      type: Array,
      default: [],
    },
  },
  computed: {
    getPaths() {
      const pathArr = this.$route.path?.split("/");
      pathArr.shift();
      return pathArr;
    },
  },
  mounted() {},
  watch: {
    "dataSubmenu.length": {
      handler(value) {
        const height = this.heightItemSubmenu * value;
        document
          .querySelector("body")
          .style.setProperty("--height-sidebar", `${height}px`);
      },
      immediate: true,
      deep: true,
    },
    getPaths: {
      handler(value) {
        this.isOpenSubMenu = this.pathParent === value[0];
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    toggleMenu() {
      this.isOpenSubMenu = !this.isOpenSubMenu;
    },
    redirectPage(slug) {
      this.$router.push(`/${this.pathParent}${slug}`);
    },
  },
};
</script>

<style scoped>
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.5s;
  height: var(--height-sidebar);
}
.fadeHeight-enter, .fadeHeight-leave-to /* .slide-leave-active in <2.1.8 */ {
  opacity: 0;
  height: 0px;
}
</style>
