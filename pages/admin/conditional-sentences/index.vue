<template>
  <Conditional />
</template>

<script>
import Conditional from "~/components/admin/conditional-sentences/index.vue";
export default {
  name: "ConditionalPage",
  layout: "adminLayout",
  components: {
    Conditional,
  },
};
</script>
