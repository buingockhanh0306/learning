export const state = () => ({
  tenses: null,
  tenseDetail: null,
  conditional: null,
  conditionalDetail: null,
  imageUpload: "",
  initImage: null,
  user: {
    photoURL: "",
    email: "",
    displayName: "",
  },
  pagination: {
    itemPerPage: 10,
    totalPage: 6,
    currentPage: 1,
  },
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
  inforUser(state) {
    return state.user;
  },
  pagination(state) {
    return state.pagination;
  },
  imageUpload(state) {
    return state.imageUpload;
  },
  initImage(state) {
    return state.initImage;
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
  SET_INFOR_USER(state, payload) {
    state.user.email = payload?.email;
    state.user.photoURL = payload?.photoURL;
    state.user.displayName = payload?.displayName;
  },
  SET_PAGINATION(state, payload) {
    state.pagination = payload;
  },
  SET_IMAGE_UPLOAD(state, payload) {
    state.imageUpload = payload;
  },
  SET_INIT_IMAGE(state, payload) {
    state.initImage = payload;
  },
};

export const actions = {
  setInforUser({ commit }, payload) {
    commit("SET_INFOR_USER", payload);
  },
  setPagination({ commit }, payload) {
    commit("SET_PAGINATION", payload);
  },
  setImageUpload({ commit }, payload) {
    commit("SET_IMAGE_UPLOAD", payload);
  },
  setInitImage({ commit }, payload) {
    commit("SET_INIT_IMAGE", payload);
  },

  // Tense
  async getTenses({ commit, getters }, payload) {
    const collection = await this.$fire.firestore.collection("tenses").get();
    const data = collection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    commit(
      "SET_LIST_TENSES",
      data.slice((payload.currentPage - 1) * 10, payload.currentPage * 10)
    );
    commit("SET_PAGINATION", {
      ...getters.pagination,
      totalPage: Math.ceil(data.length / 10),
    });
  },
  async getTenseById({ commit }, id) {
    const collection = await this.$fire.firestore
      .collection("tenses")
      .doc(id)
      .get();
    commit("SET_TENSE_DETAIL", collection.data());
  },
  async updateTense(_, payload) {
    await this.$fire.firestore
      .collection("tenses")
      .doc(payload.id)
      .set(payload.data);
  },
  async deleteTense(_, id) {
    await this.$fire.firestore.collection("tenses").doc(id).delete();
  },

  // Conditional Sentences
  async getConditional({ commit, getters }, payload) {
    const collection = await this.$fire.firestore
      .collection("conditional-sentences")
      .get();
    const data = collection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    commit(
      "SET_LIST_CONDITIONAL",
      data.slice((payload.currentPage - 1) * 10, payload.currentPage * 10)
    );
    commit("SET_PAGINATION", {
      ...getters.pagination,
      totalPage: Math.ceil(data.length / 10),
    });
  },
  async getConditionalById({ commit }, id) {
    const collection = await this.$fire.firestore
      .collection("conditional-sentences")
      .doc(id)
      .get();
    commit("SET_CONDITIONAL_DETAIL", collection.data());
  },
  async updateConditional(_, payload) {
    await this.$fire.firestore
      .collection("conditional-sentences")
      .doc(payload.id)
      .set(payload.data);
  },
  async deleteConditional(_, id) {
    await this.$fire.firestore
      .collection("conditional-sentences")
      .doc(id)
      .delete();
  },

  async uploadImage(_, selectedFile) {
    if (!selectedFile) {
      return;
    }
    const storageRef = this.$fire.storage.ref();
    const fileRef = storageRef.child(selectedFile.name);
    await fileRef.put(selectedFile);
  },
  async getImage(_, imageName) {
    const storageRef = this.$fire.storage.ref();
    const fileRef = storageRef.child(imageName);

    try {
      const imageUrl = await fileRef.getDownloadURL();
      return imageUrl;
    } catch (error) {
      console.error("Error loading image:", error);
    }
  },
};
