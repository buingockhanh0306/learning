<template>
  <div class="laptop:px-60 mobile:px-4">
    <h1 class="text-3xl font-bold text-center uppercase font-magesta">
      {{ tenseDetail?.description }}
    </h1>
    <p class="text-justify" v-html="getContent"></p>
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
    ...mapGetters("user", ["tenseDetail", "listTenses"]),
    getContent() {
      let result = this.tenseDetail?.content;
      const dataLocal = JSON.parse(localStorage.getItem("nameMember")) || {
        husband: "họ và tên chồng",
        wife: "họ và tên vợ",
        sons: "họ và tên con trai",
        daughters: "họ và tên con gái",
        children: "họ và tên các con",
      };
      return result;
    },
  },
  async mounted() {
    this.setLoading(true);
    await this.getTenseById(`/${this.$route.params.id}`);
    this.setLoading(false);
  },
  methods: {
    ...mapActions("user", ["getTenseById"]),
    ...mapActions(["setLoading"]),
  },
};
</script>
