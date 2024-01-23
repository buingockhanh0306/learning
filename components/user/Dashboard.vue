<template>
  <div>
    <div>
      <img
        src="~/assets/images/thumbnail.png"
        class="laptop:h-[600px] mobile:object-cover laptop:object-fill w-full rounded-lg"
      />
    </div>
    <section class="w-full mt-16 text-center font-delaGothic">
      <h2
        class="font-semibold uppercase laptop:text-2xl mobile:text-xl laptop:mb-16 mobile:mb-12"
      >
        Bài viết nổi bật
      </h2>
      <SwiperCommon :data="listTenses" @handleClick="redirectDetailPage" />
    </section>
    <section class="w-full text-center laptop:mt-24 mobile:mt-16">
      <span
        class="font-semibold uppercase font-delaGothic laptop:text-2xl mobile:text-xl"
        >Bạn có thể truy cập</span
      >
    </section>
    <section class="laptop:mt-16 mobile:mt-8">
      <div class="grid laptop:grid-cols-2 mobile:grid-cols-1">
        <div class="flex flex-col justify-center laptop:pl-[300px]">
          <span class="font-semibold laptop:text-5xl mobile:text-xl"
            >Mọi lúc, mọi nơi</span
          >
          <span class="text-2xl font-thin mobile:hidden laptop:block"
            >Sử dụng mọi lúc mọi nơi, chỉ cần thiết bị có kết nối internet</span
          >
        </div>
        <div class="bg-gray-400">
          <img
            src="https://th.bing.com/th/id/OIG.qE0H25d.oH2Qu8HqrAgn?pid=ImgGn"
            alt=""
          />
        </div>
      </div>
    </section>
    <section>
      <div class="grid laptop:grid-cols-2 mobile:grid-cols-1">
        <div class="bg-gray-400 mobile:order-last laptop:order-none">
          <img
            src="https://i.pinimg.com/564x/31/5e/a9/315ea97166fe5cc6407294dbe3cbe681.jpg"
            alt=""
            class="w-full"
          />
        </div>
        <div
          class="flex flex-col justify-center laptop:pl-4 mobile:pl-0 laptop:mt-0 mobile:mt-8"
        >
          <span class="font-semibold laptop:text-5xl mobile:text-xl"
            >Trên mọi thiết bị</span
          >
          <span class="text-2xl font-thin mobile:hidden laptop:block"
            >Xem trên TV thông minh, laptop, điện thoại thông minh và nhiều
            thiết bị khác</span
          >
        </div>
      </div>
    </section>

    <section>
      <div
        class="grid laptop:grid-cols-2 mobile:grid-cols-1 laptop:mt-0 mobile:mt-8"
      >
        <div class="flex flex-col justify-center laptop:pl-[300px]">
          <span class="font-semibold laptop:text-5xl mobile:text-xl"
            >Tải xuống nội dung để xem ngoại tuyến</span
          >
          <span class="text-2xl font-thin mobile:hidden laptop:block"
            >Lưu lại những nội dung một cách dễ dàng và luôn có thứ để
            xem.</span
          >
        </div>
        <div class="bg-gray-400">
          <img
            src="https://th.bing.com/th/id/OIG.p12qgf5KN_srhby11NI1?pid=ImgGn"
            alt=""
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SwiperCommon from "~/components/common/Swiper.vue";
export default {
  name: "Dashboard",
  components: {
    SwiperCommon,
  },
  computed: {
    ...mapGetters("user", ["listTenses"]),
  },
  mounted() {
    this.getTenses();
  },
  methods: {
    ...mapActions("user", ["getTenses"]),
    redirectDetailPage(slug) {
      this.$router.push(`/posts${slug}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
