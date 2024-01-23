<template>
  <CreateUser />
</template>

<script>
import CreateUser from "~/components/admin/tenses/create.vue";
export default {
  name: "CreateUserPage",
  layout: "adminLayout",
  components: {
    CreateUser,
  },
};
</script>

<style lang="scss" scoped></style>
