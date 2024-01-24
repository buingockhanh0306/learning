<template>
  <div class="laptop:px-60 mobile:px-4">
    <h1 class="text-3xl font-bold text-center uppercase font-magesta">
      {{ tenseDetail?.description }}
    </h1>
    <p class="text-justify" v-html="tenseDetail?.content"></p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import generate from "~/mixins/generate";
export default {
  name: "PostDetail",
  auth: false,
  mixins: [generate],
  computed: {
    ...mapGetters("user", ["tenseDetail"]),
  },
  async mounted() {
    this.setLoading(true);
    await this.getTenseById(`/${this.$route.params.id}`);
    console.log(this.tenseDetail);
    this.setLoading(false);
  },
  methods: {
    ...mapActions("user", ["getTenseById"]),
    ...mapActions(["setLoading"]),
  },
};
</script>
