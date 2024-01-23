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
            Quên mật khẩu
          </h2>
          <span class="w-3/4 mx-auto mt-2 text-sm text-center text-textPrimary"
            >Vui lòng nhập địa chỉ email của bạn, chúng tôi sẽ gửi một đường dẫn
            để thay đổi mật khẩu.</span
          >
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
          </div>

          <div class="flex justify-end w-full px-4 mb-8">
            <span class="text-link" @click.stop="redirectLogin">Đăng nhập</span>
          </div>
          <Button
            text="Tiếp tục"
            @handleClick="handleForgotPassword"
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
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import Notify from "../common/Notify.vue";
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
    };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  computed: {
    isEmailError() {
      return this.$v.email.$error;
    },

    isDisableButton() {
      return this.isEmailError || !this.email || !this.$v.email.$dirty;
    },
    errorMessageEmail() {
      if (!this.$v.email.required) {
        return "Vui lòng nhập email.";
      } else if (!this.$v.email.email) {
        return "Vui lòng nhập email hợp lệ.";
      } else return "";
    },
  },
  methods: {
    ...mapActions(["setNotify"]),
    ...mapActions("auth", ["forgotPassword"]),
    inputEmail() {
      this.$v.email.$reset();
    },
    blurEmail() {
      this.$v.email.$touch();
    },
    async handleForgotPassword() {
      await this.forgotPassword(this.email);
      this.setNotify({
        isOpen: true,
        text: "Chúng tôi đã gửi một liên kết tới địa chỉ email của bạn.",
        type: "success",
      });
    },
    redirectLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
