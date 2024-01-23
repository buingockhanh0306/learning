<template>
  <PostDetail />
</template>

<script>
import PostDetail from "~/components/user/posts/PostDetail.vue";

export default {
  name: "PostDetailPage",
  auth: false,
  components: { PostDetail },
};
</script>
