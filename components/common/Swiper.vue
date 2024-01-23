<template>
  <swiper :options="swiperOptions" class="max-h-[600px] w-full">
    <swiper-slide
      v-for="(item, index) in data"
      :key="index"
      class="h-48 overflow-hidden border rounded-xl"
    >
      <div class="relative cursor-pointer" @click="handleClick(item.slug)">
        <img
          :src="arrImage[index] || require('~/assets/images/imageDefault.jpg')"
          alt=""
          class="w-full filter blur-sm"
        />
        <h3
          class="absolute text-xl font-bold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        >
          {{ item.title }}
        </h3>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SwiperCommon",
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      arrImage: [],
    };
  },
  watch: {
    "data.length": {
      handler() {
        this.loadImages();
      },
      immediate: true,
    },
  },
  computed: {
    swiperOptions() {
      return {
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 4,
          },
        },
        spaceBetween: 30,
        navigation: true,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      };
    },
  },
  mounted() {},
  methods: {
    ...mapActions("user", ["getImage"]),
    handleClick(slug) {
      this.$emit("handleClick", slug);
    },
    async loadImages() {
      const imagePromises = this.data.map(async (element) => {
        return await this.getImage(element.image);
      });
      try {
        this.arrImage = await Promise.all(imagePromises);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    },
  },
};
</script>
