import Vue from "vue";
const mixin = {
  data() {
    return {
      isMobileScreen: window.innerWidth <= 960,
      initEditor: {
        height: 500,
        menubar: false,
        plugins: "table",
        toolbar:
          "undo redo | fontselect | formatselect link image | bold italic underline | table | fontsizeselect  forecolor backcolor |\
                 alignleft aligncenter alignright alignjustify | \
                 bullist numlist outdent indent | removeformat | help",
      },
    };
  },
  computed: {
    nameMember() {
      return JSON.parse(localStorage.getItem("nameMember"));
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      if (window.innerWidth <= 960) {
        this.isMobileScreen = true;
      } else {
        this.isMobileScreen = false;
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};

Vue.mixin(mixin);
