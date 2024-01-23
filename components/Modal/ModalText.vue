<template>
  <ModalCommon
    :isOpen="isOpen"
    :btnClose="btnClose"
    :btnSubmit="btnSubmit"
    @handleClose="handleClose"
    @handleSubmit="handleSubmit"
  >
    <template #content>
      <p class="mb-4 text-2xl font-bold">{{ title }}</p>
      <span>{{ content }}</span>
    </template>
  </ModalCommon>
</template>

<script>
import ModalCommon from "~/components/common/ModalCommon.vue";
export default {
  name: "ModalText",
  components: { ModalCommon },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    btnClose: {
      type: String,
      required: true,
    },
    btnSubmit: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("handleSubmit");
    },
    handleClose() {
      this.$emit("handleClose");
    },
  },
};
</script>

<style lang="scss" scoped></style>
