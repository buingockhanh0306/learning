<template>
  <SignupForm />
</template>

<script>
import SignupForm from "~/components/SignupForm";
export default {
  name: "SignupPage",
  layout: "authLayout",
  auth: false,
  components: {
    SignupForm,
  },
};
</script>

<style lang="scss" scoped></style>
