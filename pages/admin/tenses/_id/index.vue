<template>
  <EditUser />
</template>

<script>
import EditUser from "~/components/admin/tenses/edit.vue";
export default {
  name: "EditUserPage",
  layout: "adminLayout",
  components: {
    EditUser,
  },
};
</script>

<style lang="scss" scoped></style>
