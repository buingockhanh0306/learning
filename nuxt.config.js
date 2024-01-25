export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Learning",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
      },
    ],
    script: [
      {
        src: "https://code.responsivevoice.org/responsivevoice.js?key=sZIrW26S",
      }, // load script in your static folder
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/main.scss"],

  purgeCSS: {
    whitelistPatterns: [/svg.*/, /fa.*/],
  },
  build: {
    extractCSS: true,
    postcss: {
      plugins: {
        tailwindcss: "./tailwind.config.js",
      },
    },
  },
  router: {
    middleware: ["auth"],
  },

  modules: ["@nuxtjs/auth-next", "@nuxtjs/axios", "@nuxtjs/firebase"],

  swiper: {
    modules: ["navigation"],
  },

  axios: {
    baseURL: process.env.BASE_URL,
    apiKey: process.env.FIREBASE_KEY,
  },

  firebase: {
    config: {
      apiKey: process.env.FIREBASE_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    },
    services: {
      auth: true, // Just as example. Can be any other service.
      firestore: true,
      functions: true,
      storage: true,
      database: true,
      messaging: true,
      performance: true,
      appCheck: true,
      analytics: true,
      remoteConfig: true,
    },
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: "token",
          global: true,
          required: true,
          type: "Bearer",
        },
        user: {
          property: "data",
          autoFetch: true,
        },
        endpoints: {
          login: false,
          logout: false,
          user: false,
        },
      },
    },
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vuelidate.js",
    "~/plugins/vue-click-outside.js",
    "~/plugins/swiper",
    "~/plugins/paginate.js",
    { src: "~/plugins/mixin.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // buildModules: [
  //   // https://go.nuxtjs.dev/tailwindcss
  //   '@nuxtjs/tailwindcss',
  // ],

  // Modules: https://go.nuxtjs.dev/config-modules
  buildModules: [],
  icons: {
    solid: true,
    regular: true,
    light: true,
    duotone: true,
    brands: true,
  },
  env: {
    tinyMCEKey: process.env.TINYMCE_KEY,
    apiKey: process.env.FIREBASE_KEY,
  },
};
