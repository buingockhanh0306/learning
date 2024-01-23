<template>
  <div>
    <Heading text="Thêm bài viết mới" />
    <div class="flex flex-col gap-4 mt-8">
      <div
        class="flex laptop:flex-row laptop:gap-16 mobile:flex-col mobile:gap-4"
      >
        <div class="flex flex-col w-full">
          <TextField
            fieldName="Tiêu đề bài viết"
            placeholder="Vui lòng nhập tiêu đề..."
            @blur="handleBlur('title')"
            @input="handleInput('title')"
            v-model.trim="formValue.title"
            :className="errorField.title ? 'is-error' : 'bg-white'"
          />
          <ErrorMessage
            :isDisplayError="!!errorField.title"
            :textError="errorField.title"
          />
        </div>
        <div class="flex flex-col w-full">
          <TextField
            fieldName="Mô tả bài viết"
            placeholder="Vui lòng nhập mô tả..."
            @blur="handleBlur('description')"
            @input="handleInput('description')"
            v-model.trim="formValue.description"
            :className="errorField.description ? 'is-error' : 'bg-white'"
          />
          <ErrorMessage
            :isDisplayError="!!errorField.description"
            :textError="errorField.description"
          />
        </div>
      </div>
      <div
        class="flex laptop:flex-row laptop:gap-16 mobile:flex-col mobile:gap-4"
      >
        <TextField
          :isDisable="true"
          fieldName="Slug"
          className="bg-white"
          v-model="formValue.slug"
        />
      </div>
      <UploadImage />
      <div class="flex flex-col gap-2 mt-4">
        <span class="font-semibold text-textPrimary">Nội dung bài viết</span>
        <editor
          :api-key="tinyMCEKey"
          v-model="formValue.content"
          @onBlur="handleBlur('content')"
          @input="handleInput('content')"
          :init="initEditor"
        />
        <ErrorMessage
          :isDisplayError="!!errorField.content"
          :textError="errorField.content"
        />
      </div>
      <div class="flex justify-end w-full">
        <div class="flex gap-6 laptop:w-1/4 mobile:w-full">
          <Button
            :type="TYPE_BUTTON.RED"
            text="Quay lại"
            @handleClick="handleBack"
          />
          <Button
            text="Tạo bài viết"
            @handleClick="handleCreate"
            :className="isDisableButton ? 'is-disable' : ''"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from "~/components/common/Heading.vue";
import Button from "~/components/common/Button.vue";
import TextField from "~/components/common/TextField.vue";
import Editor from "@tinymce/tinymce-vue";
import { mapActions, mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";
import generate from "~/mixins/generate";
import ErrorMessage from "~/components/common/ErrorMessage.vue";
import { ERROR_MESSAGE, TYPE_BUTTON } from "~/constants/";
import UploadImage from "~/components/common/UploadImage.vue";

export default {
  name: "CreateUser",
  layout: "default",
  components: {
    Heading,
    TextField,
    editor: Editor,
    Button,
    ErrorMessage,
    UploadImage,
  },
  mixins: [generate],
  data() {
    return {
      TYPE_BUTTON,
      tinyMCEKey: process.env.tinyMCEKey,
      formValue: {
        title: "",
        slug: "/",
        description: "",
        image: "",
        content: "",
      },
      errorField: {
        title: "",
        slug: "",
        description: "",
        image: "",
        content: "",
      },
      initEditor: {
        height: 500,
        menubar: false,
        plugins: [],
        toolbar:
          "undo redo | fontselect | formatselect link image | bold italic underline | fontsizeselect  forecolor backcolor |\
                 alignleft aligncenter alignright alignjustify | \
                 bullist numlist outdent indent | removeformat | help",
      },
    };
  },
  watch: {
    "formValue.title"(value) {
      this.formValue.slug = this.convertToSlug(value);
    },
  },
  computed: {
    ...mapGetters("admin", ["imageUpload"]),
    isDisableButton: {
      get() {
        return !!(
          this.errorField.title ||
          this.errorField.description ||
          this.errorField.content ||
          !this.formValue.title ||
          !this.formValue.description ||
          !this.formValue.content
        );
      },
      set(value) {
        return value;
      },
    },
  },
  mounted() {
    this.setImageUpload("");
  },
  methods: {
    ...mapActions("admin", ["updateTense", "setImageUpload"]),
    ...mapActions(["setNotify"]),
    handleInput(field) {
      this.errorField[field] = "";
      this.isDisableButton = true;
    },
    handleBlur(field) {
      if (!this.formValue[field]) {
        this.errorField[field] = ERROR_MESSAGE.FIELD_REQUIRED;
      }
    },
    handleBack() {
      this.$router.push("/admin/tenses/");
    },
    async handleCreate() {
      try {
        await this.updateTense({
          data: { ...this.formValue, image: this.imageUpload },
          id: uuidv4(),
        });
        this.$router.push("/admin/tenses/");
        this.setNotify({
          isOpen: true,
          text: "Tạo bài viết thành công",
          type: "success",
        });
      } catch (error) {
        this.setNotify({
          isOpen: true,
          text: "Đã có lỗi xảy ra",
          type: "error",
        });
      }
    },
  },
};
</script>
