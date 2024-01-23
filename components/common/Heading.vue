<template>
  <h1 class="text-2xl text-textBold">{{ text }}</h1>
</template>

<script>
export default {
  name: "Heading",
  props: {
    text: {
      type: String,
      default: "",
    },
  },
};
</script>
