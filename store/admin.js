export const state = () => ({
  posts: null,
  tenseDetail: null,
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
    return state.posts;
  },
  tenseDetail(state) {
    return state.tenseDetail;
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
    state.posts = payload;
  },
  SET_TENSE_DETAIL(state, payload) {
    state.tenseDetail = payload;
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
  async uploadImage(_, selectedFile) {
    if (!selectedFile) {
      return;
    }
    const storageRef = this.$fire.storage.ref();
    const fileRef = storageRef.child(selectedFile.name);
    await fileRef.put(selectedFile);
  },
  async updateIrregularVerb(_, payload) {
    await this.$fire.firestore
      .collection("irregular_verbs")
      .doc(payload.id)
      .set(payload.data);
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
