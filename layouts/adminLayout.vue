<!-- components/Layout.vue -->
<template>
  <div>
    <div class="bg-secondary">
      <div
        class="fixed top-0 left-0 right-0 z-40 flex justify-between shadow-lg h-header leading-header bg-primary"
      >
        <div class="flex items-center gap-4 pl-8 laptop:w-sidebar">
          <span
            class="text-2xl laptop:hidden xs:block material-symbols-outlined"
            @click="toggleSidebar"
          >
            {{ !isSidebarOpen ? "menu" : "close" }}
          </span>
          <div
            class="flex justify-center col-span-2 text-4xl font-semibold laptop:block mobile:hidden text-textBold"
          >
            Foxstocks
          </div>
        </div>

        <div class="flex justify-between px-8 laptop:w-full">
          <div class="inline text-2xl laptop:block mobile:hidden text-textBold">
            Hello,
            {{
              inforUser.displayName ||
              inforUser.email?.substring(0, inforUser.email.indexOf("@"))
            }}
          </div>
          <div class="flex items-center laptop:gap-12 mobile:gap-4">
            <div class="relative mobile:hidden laptop:block">
              <span
                class="absolute px-4 py-2 text-2xl start-0 material-symbols-outlined"
                >search</span
              >

              <input
                type="text"
                placeholder="Search for stocks and more "
                class="block h-10 px-12 py-4 rounded-lg focus:border-gray-400 w-96 bg-inputSearch"
              />
            </div>
            <span class="text-3xl material-symbols-outlined"
              >notifications</span
            >

            <div
              @click="toggleMenuUser"
              v-click-outside="closeMenu"
              class="relative cursor-pointer"
            >
              <img
                :src="
                  inforUser.photoURL ||
                  require('~/assets/images/avatar_null.jpg')
                "
                class="w-12 h-12 border-4 rounded-full"
                :class="isDisplayMenuUser && 'border-slate-300'"
              />
              <transition name="fade">
                <div
                  @click.stop
                  v-if="isDisplayMenuUser"
                  class="absolute right-0 bg-white shadow-xl cursor-default w-60 rounded-xl"
                >
                  <div
                    class="flex items-end justify-center w-full bg-textHover h-1/4 rounded-t-xl"
                  >
                    <img
                      :src="
                        inforUser.photoURL ||
                        require('~/assets/images/avatar_null.jpg')
                      "
                      class="w-12 h-12 translate-y-6 border-2 rounded-full border-slate-300"
                    />
                  </div>
                  <div
                    class="flex flex-col items-center justify-center mt-8 leading-none"
                  >
                    <span class="font-semibold">{{
                      inforUser.displayName
                    }}</span>
                    <span class="mt-2 text-sm">{{ inforUser.email }}</span>
                  </div>
                  <div class="mt-4">
                    <div
                      class="flex items-center w-full gap-2 py-3 pl-4 leading-none cursor-pointer text-textPrimary hover:text-textHover"
                    >
                      <span class="material-symbols-outlined"
                        >account_circle</span
                      >
                      <span class="">Thông tin tài khoản</span>
                    </div>
                    <div
                      class="flex items-center w-full gap-2 py-3 pl-4 leading-none cursor-pointer text-textPrimary hover:text-textHover"
                    >
                      <span class="material-symbols-outlined"> encrypted </span>
                      <span class="">Đổi mật khẩu</span>
                    </div>
                    <div
                      @click.stop="openModalConfirm"
                      class="flex items-center w-full gap-2 py-4 pl-4 leading-none border-t-2 border-gray-200 cursor-pointer text-textPrimary hover:text-red-400"
                    >
                      <span class="material-symbols-outlined"> logout </span>
                      <span class="">Đăng xuất</span>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-12 m-header">
        <div
          :class="isSidebarOpen ? 'block' : 'hidden'"
          class="fixed z-50 self-start h-screen transition-transform transform shadow-2xl laptop:block top-header bg-primary animate-slideIn"
        >
          <aside class="flex flex-col justify-between w-full h-screen px-5">
            <!-- Sidebar content goes here -->
            <div>
              <h3 class="text-sm text-textPrimary my-7">Admin Panel</h3>
              <ul class="text-textPrimary">
                <li
                  v-for="item in dataNavbar"
                  :key="item.slug"
                  :class="slugCurrent === item.slug && 'is-active'"
                  @click="handleChooseItemNavbar(item)"
                  class="flex items-center w-full px-5 my-4 rounded-lg leading-14 itemSidebarActive"
                >
                  <span class="material-symbols-outlined">{{ item.icon }}</span>
                  <a class="px-5 py-4 leading-10">{{ item.text }}</a>
                </li>

                <!-- Add more links as needed -->
              </ul>
            </div>
          </aside>
        </div>

        <div
          class="w-full min-h-screen p-8 laptop:col-span-10 mobile:col-span-12 laptop:ml-72"
        >
          <div class="">
            <Nuxt />
          </div>
        </div>
      </div>
    </div>
    <Notify />
    <ModalText
      :isOpen="isDisplayModalLogout"
      title="Cảnh báo"
      content="Bạn có chắc chắn muốn đăng xuất?"
      btnClose="Hủy"
      btnSubmit="Đăng xuất"
      @handleSubmit="handleLogout"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import Notify from "~/components/common/Notify";
import { mapActions, mapGetters } from "vuex";
import generate from "~/mixins/generate";
export default {
  name: "adminLayout",
  components: {
    Notify,
  },
  mixins: [generate],
  data() {
    return {
      isDisplayModalLogout: false,
      isSidebarOpen: false,
      slugCurrent: "/admin/",
      isDisplayMenuUser: false,
      dataNavbar: [
        {
          text: "Dashboard",
          icon: "dashboard",
          slug: "/admin/",
        },
        {
          text: "Tenses manager",
          icon: "feed",
          slug: "/admin/tenses/",
        },
        {
          text: "Conditional manager",
          icon: "feed",
          slug: "/admin/conditional-sentences/",
        },
        {
          text: "Về trang người dùng",
          icon: "feed",
          slug: "/",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("admin", ["inforUser"]),
  },
  mounted() {
    this.slugCurrent = this.getCurrentPath(this.$route.path);
    const inforUser = JSON.parse(localStorage.getItem("inforUser"));
    this.setInforUser(inforUser);
  },
  methods: {
    ...mapActions("admin", ["setInforUser"]),
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    handleChooseItemNavbar(item) {
      this.slugCurrent = item.slug;
      this.$router.push(item.slug);
      this.isSidebarOpen = false;
    },
    handleClose() {
      this.isDisplayModalLogout = false;
    },
    openModalConfirm() {
      this.isDisplayMenuUser = false;
      this.isDisplayModalLogout = true;
    },
    handleLogout() {
      this.$auth.logout();
      localStorage.clear();
      this.setInforUser({ displayName: "", photoURL: "", email: "" });
      this.$router.push("/login");
    },
    toggleMenuUser() {
      this.isDisplayMenuUser = !this.isDisplayMenuUser;
    },
    closeMenu() {
      if (this.isDisplayMenuUser) this.isDisplayMenuUser = false;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
