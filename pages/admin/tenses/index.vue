<template>
  <User />
</template>

<script>
import User from "~/components/admin/tenses/index.vue";
export default {
  name: "UserPage",
  layout: "adminLayout",
  components: {
    User,
  },
};
</script>
