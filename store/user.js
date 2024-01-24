export const state = () => ({
  tenses: [],
  tenseDetail: null,
  conditional: [],
  conditionalDetail: null,
});

export const getters = {
  listTenses(state) {
    return state.tenses;
  },
  tenseDetail(state) {
    return state.tenseDetail;
  },
  listConditional(state) {
    return state.conditional;
  },
  conditionalDetail(state) {
    return state.conditionalDetail;
  },
};

export const mutations = {
  SET_LIST_TENSES(state, payload) {
    state.tenses = payload;
  },
  SET_TENSE_DETAIL(state, payload) {
    state.tenseDetail = payload;
  },
  SET_LIST_CONDITIONAL(state, payload) {
    state.conditional = payload;
  },
  SET_CONDITIONAL_DETAIL(state, payload) {
    state.conditionalDetail = payload;
  },
};

export const actions = {
  async getTenses({ commit }) {
    const collection = await this.$fire.firestore.collection("tenses").get();
    const data = await collection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    commit("SET_LIST_TENSES", data);
  },
  async getTenseById({ commit }, slug) {
    const collection = await this.$fire.firestore
      .collection("tenses")
      .where("slug", "==", slug)
      .get();
    commit("SET_TENSE_DETAIL", collection.docs[0].data());
  },
  async getConditional({ commit }) {
    const collection = await this.$fire.firestore
      .collection("conditional-sentences")
      .get();
    const data = await collection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    commit("SET_LIST_CONDITIONAL", data);
  },
  async getConditionalById({ commit }, slug) {
    const collection = await this.$fire.firestore
      .collection("conditional-sentences")
      .where("slug", "==", slug)
      .get();
    commit("SET_CONDITIONAL_DETAIL", collection.docs[0].data());
  },
  async getImage(_, imageName) {
    const storageRef = this.$fire.storage.ref();
    const fileRef = storageRef.child(imageName);

    try {
      const imageUrl = await fileRef.getDownloadURL();
      return imageUrl;
    } catch (error) {
      return new Promise((resolve) => {
        resolve("");
      });
    }
  },
};
