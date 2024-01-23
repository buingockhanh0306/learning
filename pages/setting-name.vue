<template>
  <SettingComponent />
</template>

<script>
import SettingComponent from "~/components/user/setting-name";
export default {
  name: "SettingsPage",
  auth: false,
  components: {
    SettingComponent,
  },
};
</script>
