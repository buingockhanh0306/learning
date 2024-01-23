<template>
  <div class="flex">
    <div class="h-screen bg-white laptop:block laptop:w-1/2 mobile:hidden">
      <div class="flex flex-col items-center justify-center h-full gap-8 p-16">
        <img src="~/assets/images/loginImage.svg" alt="" />
      </div>
    </div>
    <div class="h-screen laptop:w-1/2 mobile:w-full">
      <div
        class="flex flex-col items-center justify-center h-full mx-auto laptop:w-1/2 mobile:px-8"
      >
        <img src="~/assets/images/logo.png" alt="" class="w-20 h-20" />
        <h2 class="mt-8 text-2xl font-semibold text-textHover">Đăng nhập</h2>
        <div class="flex justify-center w-full gap-8 px-4 mt-4">
          <div
            @click="loginWithFacebook"
            class="flex items-center justify-center w-full gap-2 px-2 py-2 font-semibold border border-gray-300 rounded-lg cursor-pointer hover:border-textHover text-textPrimary"
          >
            <img
              src="~/assets/images/Facebook_Logo.png"
              alt=""
              class="w-6 h-6"
            />
            <span>Facebook</span>
          </div>
          <div
            @click="loginWithGoogle"
            class="flex items-center justify-center w-full gap-2 px-2 py-2 font-semibold border border-gray-300 rounded-lg cursor-pointer hover:border-textHover text-textPrimary"
          >
            <img src="~/assets/images/Google_Logo.png" alt="" class="w-6 h-6" />
            <span>Google</span>
          </div>
        </div>
        <div class="w-full mt-16">
          <div class="w-full">
            <TextField
              placeholder="Email"
              v-model="email"
              @blur="blurEmail"
              @input="inputEmail"
              :className="isEmailError ? 'is-error' : ''"
            />
            <ErrorMessage
              :isDisplayError="$v.email.$error && !!errorMessageEmail"
              :textError="errorMessageEmail"
            />
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
            <ErrorMessage
              :isDisplayError="$v.password.$error && !!errorMessagePassword"
              :textError="errorMessagePassword"
            />
          </div>
        </div>

        <div class="flex justify-between w-full px-4 mb-8">
          <span class="text-link" @click.stop="redirectForgotPassword"
            >Quên mật khẩu</span
          >
          <span class="text-link" @click.stop="redirectSignup">Đăng ký</span>
        </div>
        <Button
          text="Đăng nhập"
          @handleClick="handleLogin"
          :className="isDisableButton ? 'is-disable' : ''"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/common/Button.vue";
import TextField from "~/components/common/TextField.vue";
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import ErrorMessage from "~/components/common/ErrorMessage.vue";
import { ERROR_MESSAGE } from "~/constants/";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
export default {
  name: "LoginForm",
  components: {
    TextField,
    Button,
    ErrorMessage,
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
      // minLength: minLength(6),
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
      } else return "";
    },
  },
  methods: {
    ...mapActions(["setNotify", "setLoadingAdmin"]),
    ...mapActions("auth", ["login"]),
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
    async handleLogin() {
      this.setLoadingAdmin(true);
      try {
        const payload = {
          email: this.email,
          password: this.password,
          returnSecureToken: true,
        };
        const response = await this.login(payload);
        await this.$auth.setUserToken(response.idToken);
        await this.$auth.setUser(response);
        localStorage.setItem("inforUser", JSON.stringify(response));
        this.$router.push("/admin/");
      } catch (error) {
        this.setNotify({
          isOpen: true,
          text: ERROR_MESSAGE[error.response.data.error.message],
          type: "error",
        });
      } finally {
        this.setLoadingAdmin(false);
      }
    },
    redirectSignup() {
      this.$router.push("/signup");
    },
    redirectForgotPassword() {
      this.$router.push("/forgot-password");
    },
    async loginWithGoogle() {
      alert("Tính năng này đang bị chặn");
      // try {
      //   const provider = new GoogleAuthProvider();
      //   provider.setCustomParameters({
      //     prompt: "select_account",
      //   });
      //   const auth = getAuth();

      //   const result = await signInWithPopup(auth, provider);
      //   const credential = GoogleAuthProvider.credentialFromResult(result);
      //   const token = credential.accessToken;
      //   const user = result.user;
      //   await this.$auth.setUserToken(token);
      //   localStorage.setItem("inforUser", JSON.stringify(user));

      //   this.$router.push("/admin");
      // } catch (error) {}
    },
    async loginWithFacebook() {
      alert("Tính năng này đang bị chặn");
      // try {
      //   const provider = new FacebookAuthProvider();
      //   const auth = getAuth();

      //   const result = await signInWithPopup(auth, provider);
      //   const user = result.user;
      //   const credential = FacebookAuthProvider.credentialFromResult(result);
      //   const accessToken = credential.accessToken;

      //   this.$auth.setUserToken(accessToken);
      //   localStorage.setItem("inforUser", JSON.stringify(user));

      //   this.$router.push("/admin");
      // } catch (error) {}
    },
  },
};
</script>
