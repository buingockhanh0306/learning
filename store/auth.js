export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async signup(_, payload) {
    const result = await this.$axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.apiKey}`,
      payload
    );
    return result.data;
  },
  async login(_, payload) {
    const result = await this.$axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.apiKey}`,
      payload
    );
    return result.data;
  },
  async forgotPassword(_, payload) {
    const result = await this.$axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.apiKey}`,
      { email: payload, requestType: "PASSWORD_RESET" }
    );
    return result.data;
  },
};
