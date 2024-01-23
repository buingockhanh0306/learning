<template>
  <ForgotPassword />
</template>

<script>
import ForgotPassword from "~/components/ForgotPassword";
export default {
  name: "ForgotPasswordPage",
  auth: false,
  layout: "authLayout",
  components: {
    ForgotPassword,
  },
};
</script>
