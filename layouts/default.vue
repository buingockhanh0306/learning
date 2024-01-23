<template>
  <div>
    <body class="bg-gray-50">
      <!-- ========== HEADER ========== -->
      <header
        class="sticky top-0 left-0 right-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-base py-2.5 sm:py-4 lg:ps-64"
      >
        <nav
          class="flex items-center w-full px-4 mx-auto basis-full sm:px-6 md:px-8"
          aria-label="Global"
        >
          <div class="me-5 lg:me-0 laptop:hidden mobile:block">
            <button
              type="button"
              class="flex items-center text-gray-500 hover:text-gray-600"
              data-hs-overlay="#application-sidebar"
              aria-controls="application-sidebar"
              aria-label="Toggle navigation"
              @click="openSidebar"
            >
              <span class="text-3xl material-symbols-outlined"> menu </span>
            </button>
          </div>

          <div class="w-full ms-auto">
            <div class="laptop:w-1/2 laptop:mx-auto mobile:w-full">
              <label for="icon" class="sr-only">Search</label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 z-20 flex items-center pointer-events-none start-0 ps-4"
                >
                  <span class="material-symbols-outlined text-textPrimary">
                    search
                  </span>
                </div>
                <div class="relative">
                  <input
                    v-model.trim="inputSearch"
                    @input="handleSearch"
                    type="text"
                    id="icon"
                    name="icon"
                    class="block w-full px-4 py-2 text-base border border-gray-200 rounded-lg ps-11 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tìm kiếm bài viết"
                  />
                  <ul
                    v-if="inputSearch"
                    class="absolute left-0 right-0 w-full overflow-y-scroll bg-gray-100 border border-gray-200 no-scrollbar max-h-60 top-11"
                  >
                    <li
                      v-for="(item, index) in resultSearch"
                      @click="redirectPost(item.slug)"
                      :key="item.key"
                      class="flex gap-4 px-6 py-2 border-b-2 border-gray-200 cursor-pointer"
                    >
                      <img
                        :src="arrImage[index]"
                        alt=""
                        class="w-12 h-12 rounded-full"
                      />
                      <div class="flex flex-col">
                        <span class="font-semibold text-textPrimary">{{
                          item.title
                        }}</span>
                        <span class="text-textPrimary">{{
                          item.description
                        }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <transition name="slide">
        <div
          id="application-sidebar"
          v-if="isOpenSidebar || !isMobileScreen"
          class="fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&amp;::-webkit-scrollbar]:w-2 [&amp;::-webkit-scrollbar-thumb]:rounded-full [&amp;::-webkit-scrollbar-track]:bg-gray-100 [&amp;::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          <div class="px-6">
            <a
              class="flex-none text-xl font-semibold"
              href="#"
              aria-label="Brand"
              >Văn cúng</a
            >
          </div>

          <nav
            class="flex flex-col flex-wrap w-full p-6 hs-accordion-group"
            data-hs-accordion-always-open=""
          >
            <ul class="space-y-1.5">
              <li class="cursor-pointer" @click="$router.push('/')">
                <a
                  :class="$route.path === '/' && 'bg-gray-100'"
                  class="flex items-center gap-x-3.5 py-2 px-2.5 text-base text-slate-700 rounded-lg hover:bg-gray-100"
                >
                  <span class="text-xl font-light material-symbols-outlined">
                    dashboard
                  </span>
                  Trang chủ
                </a>
              </li>
              <SubMenuSidebar
                :dataSubmenu="listTenses"
                iconName="auto_stories"
                pathParent="posts"
                textParent="Văn cúng"
              />
              <li class="cursor-pointer" @click="$router.push('/setting-name')">
                <a
                  :class="$route.path === '/setting-name' && 'bg-gray-100'"
                  class="flex items-center gap-x-3.5 py-2 px-2.5 text-base text-slate-700 rounded-lg hover:bg-gray-100"
                >
                  <span class="text-xl font-light material-symbols-outlined">
                    group_add
                  </span>
                  Thiết lập họ tên
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </transition>
      <!-- End Sidebar -->

      <!-- Content -->
      <div
        class="w-full min-h-screen px-4 pt-10 pb-20 overflow-auto sm:px-6 md:px-8 lg:ps-72"
        :class="$route.path === '/lunar' && 'pt-0 pb-0 h-full'"
      >
        <Nuxt />
        <Notify />
      </div>
      <div
        v-if="isOpenSidebar"
        @click="closeSidebar"
        id="application-sidebar-backdrop"
        data-hs-overlay-backdrop-template=""
        style="z-index: 59"
        class="fixed inset-0 transition bg-gray-900 bg-opacity-50 duration hs-overlay-backdrop"
      ></div>
    </body>
    <Loading />
  </div>
</template>

<script>
import Loading from "~/components/common/Loading.vue";
import SubMenuSidebar from "~/components/common/SubMenuSidebar.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { PATH_TO_TEXT } from "~/constants";
import Notify from "~/components/common/Notify";
export default {
  name: "defaultLayout",
  components: { SubMenuSidebar, Loading, Notify },
  data() {
    return {
      isOpenSidebar: false,
      isOpenMenu: false,
      inputSearch: "",
      resultSearch: [],
      arrImage: [],
    };
  },
  computed: {
    ...mapGetters("user", ["tenseDetail", "listTenses"]),
    textBreadCrumb() {
      const pathArr = this.$route.path?.split("/");
      pathArr.shift();
      return PATH_TO_TEXT.find((item) => item.path === pathArr[0])?.text || "";
    },
  },
  watch: {
    "$route.path"() {
      this.SET_TENSE_DETAIL(null);
      this.closeSidebar();
    },
    "resultSearch.length": {
      handler() {
        this.arrImage = [];
        this.resultSearch.forEach(async (element) => {
          let imageItem = await this.getImage(element.image);
          this.arrImage.push(imageItem);
        });
      },
      immediate: true,
    },
  },
  async mounted() {
    await this.getTenses();
  },
  methods: {
    ...mapActions("user", ["getTenses", "getImage"]),
    ...mapMutations("user", ["SET_TENSE_DETAIL"]),
    openSidebar() {
      this.isOpenSidebar = true;
    },
    closeSidebar() {
      this.isOpenSidebar = false;
    },
    toggleMenu() {
      this.isOpenMenu = !this.isOpenMenu;
    },
    handleSearch() {
      this.resultSearch = this.listTenses.filter((item) =>
        item.title.toLowerCase().includes(this.inputSearch.toLowerCase())
      );
    },
    redirectPost(slug) {
      this.$router.push(`/posts${slug}`);
      this.inputSearch = "";
    },
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
  transform: translateX(-100%);
}
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
