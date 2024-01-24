<template>
  <div class="laptop:px-60 mobile:px-4">
    <h1 class="text-3xl font-bold text-center uppercase font-magesta">
      {{ conditionalDetail?.description }}
    </h1>
    <p class="text-justify" v-html="conditionalDetail?.content"></p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import generate from "~/mixins/generate";
export default {
  name: "ConditionalDetail",
  auth: false,
  mixins: [generate],
  computed: {
    ...mapGetters("user", ["conditionalDetail"]),
  },
  async mounted() {
    this.setLoading(true);
    await this.getConditionalById(`/${this.$route.params.id}`);
    this.setLoading(false);
  },
  methods: {
    ...mapActions("user", ["getConditionalById"]),
    ...mapActions(["setLoading"]),
  },
};
</script>
