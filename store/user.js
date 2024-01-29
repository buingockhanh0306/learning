import irregular_verbs from "~/constants/irregular_verbs.json";
import { cloneDeep } from "lodash";
export const state = () => ({
  isSearching: false,
  tenses: [],
  tenseDetail: null,
  irregularVerbs: [],
  irregularVerbsFull: _.cloneDeep(irregular_verbs),
  conditional: [],
  conditionalDetail: null,
  pagination: {
    itemPerPage: 10,
    totalPage: 6,
    currentPage: 1,
  },
});

export const getters = {
  isSearching(state) {
    return state.isSearching;
  },
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
  pagination(state) {
    return state.pagination;
  },
  listIrregularVerbs(state) {
    return state.irregularVerbs;
  },
  listIrregularVerbsFull(state) {
    return state.irregularVerbsFull;
  },
};

export const mutations = {
  SET_IS_SEARCHING(state, payload) {
    state.isSearching = payload;
  },
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
  SET_PAGINATION(state, payload) {
    state.pagination = payload;
  },
  SET_LIST_IRREGULAR_VERBS(state, payload) {
    state.irregularVerbs = payload;
  },
};

export const actions = {
  setIsSearching({ commit }, payload) {
    commit("SET_IS_SEARCHING", payload);
  },
  setPagination({ commit }, payload) {
    commit("SET_PAGINATION", payload);
  },
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
  async getIrregularVerbs({ state, commit }, payload) {
    // const collection = await this.$fire.firestore
    //   .collection("irregular_verbs")
    //   .get();
    // const data = collection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const data = _.cloneDeep(state.irregularVerbsFull);
    commit("SET_PAGINATION", {
      ...state.pagination,
      totalPage: Math.ceil(data.length / state.pagination.itemPerPage),
    });
    commit(
      "SET_LIST_IRREGULAR_VERBS",
      data.slice(
        (payload.currentPage - 1) * payload.itemPerPage,
        payload.currentPage * payload.itemPerPage
      )
    );
  },
};
