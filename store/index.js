export const state = () => ({
  isLoading: false,
  isLoadingAdmin: false,
  notify: {
    isOpen: false,
    text: "",
    type: "",
  },
});

export const getters = {
  getNotify(state) {
    return state.notify;
  },
  isLoading(state) {
    return state.isLoading;
  },
  isLoadingAdmin(state) {
    return state.isLoadingAdmin;
  },
};

export const mutations = {
  SET_NOTIFY(state, payload) {
    state.notify = {
      isOpen: payload.isOpen,
      text: payload.text,
      type: payload.type,
    };
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SET_LOADING_ADMIN(state, payload) {
    state.isLoadingAdmin = payload;
  },
};

export const actions = {
  // async signup(_, payload) {
  //   const result = await this.$axios.post(
  //     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYlY6INJn-aGXwQ22MT-lt1hPCgvGcp9g`,
  //     payload
  //   );
  //   return result.data;
  // },
  // async login(_, payload) {
  //   const result = await this.$axios.post(
  //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYlY6INJn-aGXwQ22MT-lt1hPCgvGcp9g",
  //     payload
  //   );
  //   return result.data;
  // },
  setNotify({ commit }, payload) {
    commit("SET_NOTIFY", payload);
  },
  setLoading({ commit }, payload) {
    commit("SET_LOADING", payload);
  },
  setLoadingAdmin({ commit }, payload) {
    commit("SET_LOADING_ADMIN", payload);
  },
};
