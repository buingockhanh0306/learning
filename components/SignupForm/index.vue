<template>
  <div>
    <div class="flex">
      <div class="h-screen bg-white laptop:block laptop:w-1/2 mobile:hidden">
        <div
          class="flex flex-col items-center justify-center h-full gap-8 p-16"
        >
          <img
            src="https://baymainweb.blob.core.windows.net/b2c/assets/images/Login%20Svg.svg"
            alt=""
            class
          />
        </div>
      </div>
      <div class="h-screen laptop:w-1/2 mobile:w-full">
        <div
          class="flex flex-col items-center justify-center h-full mx-auto laptop:w-1/2 mobile:px-8"
        >
          <img src="~/assets/images/logo.png" alt="" class="w-20 h-20" />
          <h2 class="mt-8 text-2xl font-semibold text-textHover">
            Đăng ký tài khoản
          </h2>
          <div class="w-full mt-8">
            <div class="w-full">
              <TextField
                placeholder="Email"
                v-model="email"
                @blur="blurEmail"
                @input="inputEmail"
                :className="isEmailError ? 'is-error' : ''"
              />
              <span class="block mt-2 ml-2 text-sm text-red-400 min-h-8">
                <div v-if="$v.email.$error && errorMessageEmail">
                  <span class="material-symbols-outlined"> error </span>
                  {{ errorMessageEmail }}
                </div>
              </span>
            </div>
            <div class="w-full">
              <TextField
                positionIcon="right"
                :iconName="isDisplayPassword ? 'visibility' : 'visibility_off'"
                :type="isDisplayPassword ? 'text' : 'password'"
                placeholder="Mật khẩu"
                v-model="password"
                @clickIcon="handleDisplayPassword"
                @blur="blurPassword"
                @input="inputPassword"
                :className="isPasswordError ? 'is-error' : ''"
              />
              <span class="block mt-2 ml-2 text-sm text-red-400 min-h-8">
                <div v-if="$v.password.$error && errorMessagePassword">
                  <span class="material-symbols-outlined"> error </span>
                  {{ errorMessagePassword }}
                </div>
              </span>
            </div>
          </div>

          <div class="flex justify-end w-full px-4 mb-8">
            <span class="text-link" @click.stop="redirectLogin">Đăng nhập</span>
          </div>
          <Button
            text="Đăng ký"
            @handleClick="handleSignup"
            :className="isDisableButton ? 'is-disable' : ''"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/common/Button.vue";
import TextField from "~/components/common/TextField.vue";
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import Notify from "~/components/common/Notify.vue";
import { ERROR_MESSAGE } from "~/constants/";
export default {
  name: "SignupForm",
  components: {
    TextField,
    Button,
    Notify,
  },
  data() {
    return {
      email: "",
      password: "",
      isDisplayPassword: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  computed: {
    isEmailError() {
      return this.$v.email.$error;
    },
    isPasswordError() {
      return this.$v.password.$error;
    },
    isDisableButton() {
      return (
        this.isEmailError ||
        this.isPasswordError ||
        !this.email ||
        !this.password ||
        !this.$v.email.$dirty ||
        !this.$v.password.$dirty
      );
    },
    errorMessageEmail() {
      if (!this.$v.email.required) {
        return ERROR_MESSAGE.EMAIL_REQUIRED;
      } else if (!this.$v.email.email) {
        return ERROR_MESSAGE.EMAIL_INVALID;
      } else return "";
    },
    errorMessagePassword() {
      if (!this.$v.password.required) {
        return ERROR_MESSAGE.PASSWORD_REQUIRED;
      } else if (!this.$v.password.minLength) {
        return ERROR_MESSAGE.PASSWORD_STRONG;
      } else return "";
    },
  },
  methods: {
    ...mapActions(["signup", "setNotify"]),
    ...mapActions("auth", ["signup"]),
    inputEmail() {
      this.$v.email.$reset();
    },
    blurEmail() {
      this.$v.email.$touch();
    },
    inputPassword() {
      this.$v.password.$reset();
    },
    blurPassword() {
      this.$v.password.$touch();
    },
    handleDisplayPassword() {
      this.isDisplayPassword = !this.isDisplayPassword;
    },
    async handleSignup() {
      // alert("Tính năng này đang bị chặn");
      try {
        const payload = {
          email: this.email,
          password: this.password,
          returnSecureToken: true,
        };
        const result = await this.signup(payload);
        if (result) {
          this.$router.push("/login");
          this.setNotify({
            isOpen: true,
            text: "Đăng ký tài khoản thành công!",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error.response);
        this.setNotify({
          isOpen: true,
          text: error.response.data.error.message,
          type: "error",
        });
      }
    },
    handleForgotPassword() {},
    redirectLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped></style>
