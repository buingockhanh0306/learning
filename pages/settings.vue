<template>
  <Settings />
</template>

<script>
import Settings from "~/components/user/settings";
export default {
  name: "SettingsPage",
  auth: false,
  components: {
    Settings,
  },
};
</script>

<style lang="scss" scoped></style>
