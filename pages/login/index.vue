<template>
  <LoginForm />
</template>

<script>
import LoginForm from "~/components/LoginForm";
export default {
  name: "loginIndex",
  layout: "authLayout",
  components: {
    LoginForm,
  },
};
</script>
