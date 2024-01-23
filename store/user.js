export const state = () => ({
  posts: [],
  tenseDetail: null,
});

export const getters = {
  listTenses(state) {
    return state.posts;
  },
  tenseDetail(state) {
    return state.tenseDetail;
  },
};

export const mutations = {
  SET_LIST_TENSES(state, payload) {
    state.posts = payload;
  },
  SET_TENSE_DETAIL(state, payload) {
    state.tenseDetail = payload;
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
