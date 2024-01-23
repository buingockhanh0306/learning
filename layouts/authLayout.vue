<template>
  <div class="relative">
    <Nuxt />
    <Notify />
    <LoadingAdmin />
  </div>
</template>

<script>
import Notify from "~/components/common/Notify";
import LoadingAdmin from "~/components/common/LoadingAdmin";
export default {
  name: "authLayout",
  components: { Notify, LoadingAdmin },
};
</script>

<style lang="scss" scoped></style>
