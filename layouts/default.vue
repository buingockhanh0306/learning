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
                    :placeholder="textPlaceholder"
                  />
                  <!-- <ul
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
                          item.base
                        }}</span>
                        <span class="text-textPrimary">{{ item.past }}</span>
                      </div>
                    </li>
                  </ul> -->
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
              >Học Tiếng Anh</a
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
              <li
                class="cursor-pointer"
                @click="$router.push('/irregular_verbs')"
              >
                <a
                  :class="
                    $route.path === '/irregular_verbs' &&
                    'text-textHover bg-gray-100'
                  "
                  class="flex items-center gap-x-3.5 py-2 px-2.5 text-base text-slate-700 rounded-lg hover:bg-gray-100"
                >
                  <span class="text-xl font-light material-symbols-outlined">
                    extension
                  </span>
                  Động từ BQT
                </a>
              </li>
              <SubMenuSidebar
                :dataSubmenu="listTenses"
                iconName="schedule"
                pathParent="tenses"
                textParent="Thì trong câu"
              />
              <SubMenuSidebar
                :dataSubmenu="listConditional"
                iconName="conditions"
                pathParent="conditional-sentences"
                textParent="Câu điều kiện"
              />
              <li class="cursor-pointer" @click="$router.push('/settings')">
                <a
                  :class="
                    $route.path === '/settings' && 'text-textHover bg-gray-100'
                  "
                  class="flex items-center gap-x-3.5 py-2 px-2.5 text-base text-slate-700 rounded-lg hover:bg-gray-100"
                >
                  <span class="text-xl font-light material-symbols-outlined">
                    settings
                  </span>
                  Cài đặt
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </transition>
      <!-- End Sidebar -->

      <!-- Content -->
      <div
        class="w-full min-h-screen px-4 pt-10 pb-20 sm:px-6 md:px-8 lg:ps-72"
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
import Notify from "~/components/common/Notify";
export default {
  name: "defaultLayout",
  components: { SubMenuSidebar, Loading, Notify },
  data() {
    return {
      isOpenSidebar: false,
      isOpenMenu: false,
      inputSearch: "",
      arrImage: [],
    };
  },
  computed: {
    ...mapGetters("user", [
      "tenseDetail",
      "listTenses",
      "listConditional",
      "listIrregularVerbsFull",
      "pagination",
      "isSearching",
    ]),
    textPlaceholder() {
      switch (this.$route.path) {
        case "/irregular_verbs":
          return "Tìm kiếm động từ bất quy tắc";
        default:
          return "Tìm kiếm";
      }
    },
  },
  watch: {
    "$route.path"() {
      this.inputSearch = "";
      this.SET_TENSE_DETAIL(null);
      this.closeSidebar();
    },
  },
  async mounted() {
    await this.getTenses();
    await this.getConditional();
  },
  methods: {
    ...mapActions("user", [
      "getTenses",
      "getImage",
      "getConditional",
      "setIsSearching",
      "getIrregularVerbs",
    ]),
    ...mapMutations("user", [
      "SET_TENSE_DETAIL",
      "SET_LIST_IRREGULAR_VERBS",
      "SET_PAGINATION",
    ]),
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
      switch (this.$route.path) {
        case "/irregular_verbs":
          if (this.inputSearch) {
            this.setIsSearching(true);
            let resultSearch = this.listIrregularVerbsFull.filter((item) =>
              item.base.toLowerCase().includes(this.inputSearch.toLowerCase())
            );
            this.SET_PAGINATION({
              ...this.pagination,
              totalPage: Math.ceil(
                resultSearch.length / this.pagination.itemPerPage
              ),
            });
            this.SET_LIST_IRREGULAR_VERBS(resultSearch);
          } else {
            this.setIsSearching(false);
            this.getIrregularVerbs(this.pagination);
          }
          break;
        default:
          return "Tìm kiếm";
      }
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
